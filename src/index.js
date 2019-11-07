const EventEmitter = require('events')
const Net = require('net')
const { Block, Transaction } = require('bsv-minimal')
const {
  Message,
  Headers,
  Inv,
  Version,
  GetData,
  Reject,
  Address
} = require('./messages')

const MAGIC_NUMS = {
  BSV: 'e3e1f3e8',
  BCH: 'e3e1f3e8',
  BTC: 'f9beb4d9',
  'BSV-STN': 'fbcec4f9'
}

class Peer extends EventEmitter {
  constructor ({
    nodes,
    ticker = 'BSV',
    stream = true,
    validate = true,
    DEBUG_LOG = false
  }) {
    super()
    if (!MAGIC_NUMS[ticker]) {
      throw new Error(`P2P: Invalid network ${ticker}`)
    } else {
      this.magic = Buffer.from(MAGIC_NUMS[ticker], 'hex')
    }

    this.nodes = nodes
    this.ticker = ticker
    this.stream = stream
    this.validate = validate
    this.promises = { block: {}, txs: {} }
    this.connected = false
    this.listenTxs = false
    this.listenBlocks = false
    this.DEBUG_LOG = DEBUG_LOG
    this.buffers = {
      data: [],
      needed: 0,
      length: 0,
      block: null
    }
  }

  sendMessage (command, payload) {
    const { magic } = this
    const serialized = Message.write({ command, payload, magic })
    this.socket.write(serialized)
    this.DEBUG_LOG &&
      console.log(`Sent message`, command, payload && payload.length)
  }

  streamBlock (chunk, start) {
    const { buffers, promises, ticker, validate } = this
    let stream
    if (start) {
      const block = new Block({ validate })
      stream = block.addBufferChunk(chunk)
      if (!stream.header) return
      buffers.block = block
      buffers.chunkNum = 0
    } else {
      stream = buffers.block.addBufferChunk(chunk)
    }
    const { finished, started, remaining, header } = stream
    if (this.listenerCount('block_chunk') > 0) {
      const blockHash = header.getHash()
      this.emit('block_chunk', {
        num: buffers.chunkNum++,
        started,
        finished,
        ticker,
        chunk: finished
          ? chunk.slice(0, chunk.length - remaining.length)
          : chunk,
        blockHash
      })
    }
    this.emit('transactions', {
      ...stream,
      ticker
    })
    if (finished) {
      buffers.block = null
      buffers.data = [remaining]
      buffers.length = remaining.length
      buffers.needed = 0

      const hash = header.getHash().toString('hex')
      if (promises.block[hash]) {
        promises.block[hash].resolve()
        delete promises.block[hash]
      }
    }
  }

  async readMessage (buffer) {
    try {
      const {
        magic,
        promises,
        buffers,
        ticker,
        stream,
        validate,
        listenTxs,
        listenBlocks
      } = this
      const message = Message.read({ buffer, magic })
      const { command, payload, end, needed } = message
      buffers.needed = needed

      if (stream && command === 'block') {
        this.streamBlock(payload, true)
      }
      if (needed) return
      const remainingBuffer = buffer.slice(end)
      buffers.data = [remainingBuffer]
      buffers.length = remainingBuffer.length
      buffers.needed = 0

      this.DEBUG_LOG &&
        console.log(`Received message`, command, payload && payload.length)
      if (command === 'ping') {
        this.sendMessage('pong', payload)
      } else if (command === 'headers') {
        const headers = Headers.parseHeaders(payload)
        this.DEBUG_LOG && console.log(`Received headers`, headers.length)
        if (promises.headers) {
          promises.headers.resolve(headers)
          promises.headers = null
        }
      } else if (command === 'version') {
        this.sendMessage('verack')
        const version = Version.read(payload)
        console.log(`Connected to peer`, version)
      } else if (command === 'inv') {
        const { blocks, txs } = Inv.read(payload)
        // this.DEBUG_LOG && console.log(inv)
        if (this.listenerCount('transactions') > 0) {
          if (listenTxs && txs.length > 0) {
            if (typeof listenTxs === 'function') {
              this.getTxs(listenTxs(txs))
            } else {
              this.getTxs(txs)
            }
          }
          if (listenBlocks && blocks.length > 0) {
            this.getBlocks(blocks)
          }
        }
        if (blocks.length > 0) {
          this.emit('block_hashes', { ticker, blocks })
        }
      } else if (!stream && command === 'block') {
        const block = Block.fromBuffer(payload)
        block.options = { validate }
        this.DEBUG_LOG &&
          console.log(
            `Received block`,
            promises.block[hash],
            block.getHash().toString('hex')
          )
        if (this.listenerCount('transactions') > 0) {
          await block.getTransactionsAsync(params => {
            this.emit('transactions', { ...params, ticker })
          })
        }
        this.emit('block', { block, ticker })
        const hash = block.getHash().toString('hex')
        if (promises.block[hash]) {
          promises.block[hash].resolve(block)
          delete promises.block[hash]
        }
      } else if (command === 'tx') {
        const transaction = Transaction.fromBuffer(payload)
        this.DEBUG_LOG && console.log(`Received transaction`, transaction)
        this.emit('transactions', {
          ticker,
          finished: true,
          transactions: [[0, transaction]]
        })
      } else if (command === 'notfound') {
        const notfound = Inv.read(payload)
        console.log('notfound', notfound)
        for (let hash of notfound.blocks) {
          // TODO: Doesn't seem to be working
          hash = hash.toString('hex')
          if (promises.block[hash]) {
            promises.block[hash].reject(new Error(`Block ${hash} not found`))
            delete promises.block[hash]
          }
        }
      } else if (command === 'verack') {
        if (promises.connect) {
          promises.connect.resolve()
          promises.connect = null
        }
        this.connected = true
      } else if (command === 'alert') {
        // console.log(`P2P: Alert ${payload.toString()}`)
      } else if (command === 'getdata') {
        const { txs } = GetData.read(payload)
        for (const hash of txs) {
          const promise = promises.txs[hash.toString('hex')]
          if (promise) {
            const { transaction } = promise
            this.sendMessage('tx', transaction.toBuffer())
            promise.resolve({ txid: hash.toString('hex') })
            delete promises.txs[hash.toString('hex')]
            // TODO: Make sure transaction is valid first
            this.emit('transactions', {
              ticker,
              finished: true,
              transactions: [[0, transaction]]
            })
          }
        }
      } else if (command === 'reject') {
        const msg = Reject.read(payload)
        console.log(`P2P: Reject`, msg)
      } else if (command === 'addr') {
        const msg = Address.readAddr(payload)
        console.log(`P2P: Addr`, msg)
      } else if (command === 'getheaders') {
        // console.log(`P2P: getheaders`)
      } else {
        console.log(`P2P: Unknown command ${command}, ${payload.length} bytes`)
      }

      if (remainingBuffer.length > 0) {
        return this.readMessage(remainingBuffer)
      }
    } catch (err) {
      console.log(err)
      this.disconnect() // TODO: Recover!
    }
  }

  connect () {
    return new Promise((resolve, reject) => {
      if (this.socket) return resolve()
      this.promises.connect = { resolve, reject }
      this.socket = new Net.Socket()
      const { socket, buffers, ticker, nodes } = this
      const node = nodes.shift()
      const host = node.split(':')[0]
      const port = node.split(':')[1] || 8333
      nodes.push(node)
      socket.on('connect', () => {
        console.log(`P2P: Connected to ${host}:${port}`)
        const payload = Version.write(ticker)
        this.sendMessage('version', payload)
      })
      socket.on('error', err => {
        console.log(`P2P: error`, err)
        this.disconnect()
        this.connect()
      })
      socket.on('end', () => {
        console.log(`P2P: end disconnected`)
        this.disconnect()
        this.connect()
      })
      socket.on('data', data => {
        // this.DEBUG_LOG && console.log(`P2P: data`, data.toString('hex'))
        buffers.length += data.length
        if (buffers.block) {
          this.streamBlock(data)
        } else {
          buffers.data.push(data)
        }

        if (buffers.length >= buffers.needed) {
          return this.readMessage(Buffer.concat(buffers.data))
        }
      })
      socket.connect(port, host)
    })
  }

  disconnect () {
    if (this.socket) {
      this.socket.destroy()
      this.socket = null
      this.connected = false
      this.buffers = {
        data: [],
        needed: 0,
        length: 0,
        block: null
      }
    }
  }

  isConnected () {
    return this.connected
  }

  getHeaders (from) {
    return new Promise(async (resolve, reject) => {
      await this.connect()
      if (this.promises.headers) {
        this.promises.headers.reject(new Error(`Headers timed out`))
        // throw new Error(`Already getting headers!!`)
      }
      this.promises.headers = { resolve, reject }
      const payload = Headers.getheaders({ version: Version.version, from })
      this.sendMessage('getheaders', payload)
    })
  }

  getMempool () {
    this.sendMessage('mempool')
  }
  getBlock (blockHash) {
    return new Promise(async (resolve, reject) => {
      await this.connect()
      this.promises.block[blockHash.toString('hex')] = {
        resolve,
        reject
      }
      this.getBlocks([blockHash])
    })
  }

  broadcastTx (buf, isValid = false) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf, 'hex')
        await this.connect()
        const transaction = Transaction.fromBuffer(buf)
        const payload = Inv.write({ transactions: [transaction] })
        this.promises.txs[transaction.getHash().toString('hex')] = {
          resolve,
          reject,
          transaction
        }
        this.sendMessage('inv', payload)
        if (isValid) {
          this.emit('transactions', {
            ticker: this.ticker,
            finished: true,
            transactions: [[0, transaction]]
          })
        }
      } catch (err) {
        return reject(err)
      }
    })
  }
  getTxs (txs) {
    if (txs.length === 0) return
    const payload = GetData.write(txs, 1)
    this.sendMessage('getdata', payload)
  }
  getBlocks (blocks) {
    const payload = GetData.write(blocks, 2)
    this.sendMessage('getdata', payload)
  }
  getAddr () {
    this.sendMessage('getaddr')
  }
  listenForTxs (listenTxs = true) {
    this.listenTxs = listenTxs
  }
  listenForBlocks () {
    this.listenBlocks = true
  }
}

module.exports = Peer
