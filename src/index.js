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
const { MAGIC_NUMS } = require('./config')
const crypto = require('crypto')

class Peer extends EventEmitter {
  constructor ({
    node,
    ticker = 'BSV',
    stream = true,
    validate = true,
    autoReconnect = true,
    DEBUG_LOG = false
  }) {
    super()
    if (!MAGIC_NUMS[ticker]) {
      throw new Error(`bsv-p2p: Invalid network ${ticker}`)
    } else {
      this.magic = Buffer.from(MAGIC_NUMS[ticker], 'hex')
    }
    if (typeof node !== 'string') {
      throw new Error(`Missing node address`)
    }

    this.node = node
    this.ticker = ticker
    this.stream = stream
    this.validate = validate
    this.autoReconnect = autoReconnect
    this.promises = { block: {}, txs: {}, ping: {} }
    this.connected = false
    this.listenTxs = false
    this.listenBlocks = false
    this.disconnects = 0
    this.DEBUG_LOG = DEBUG_LOG
    this.buffers = {
      data: [],
      needed: 0,
      length: 0,
      block: null
    }
  }

  sendMessage (command, payload, force = false) {
    if (!this.connected && !force) throw new Error(`Not connected`)
    const { magic } = this
    const serialized = Message.write({ command, payload, magic })
    this.socket.write(serialized)
    this.DEBUG_LOG &&
      console.log(
        `bsv-p2p: Sent message ${command} ${
          payload ? payload.length : '0'
        } bytes`
      )
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
    const { finished, started, remaining, header, transactions } = stream
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
    if (transactions.lenth > 0 || started || finished) {
      this.emit('transactions', {
        ...stream,
        ticker
      })
    }
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
        command !== 'inv' &&
        console.log(
          `bsv-p2p: Received message`,
          command,
          payload && `${payload.length} bytes`
        )
      if (command === 'ping') {
        this.sendMessage('pong', payload)
      } else if (command === 'pong') {
        const nonce = payload.toString('hex')
        if (promises.ping[nonce]) {
          const { date, resolve } = promises.ping[nonce]
          resolve(+new Date() - date)
          delete promises.ping[nonce]
        }
      } else if (command === 'headers') {
        const headers = Headers.parseHeaders(payload)
        this.DEBUG_LOG &&
          console.log(`bsv-p2p: Received headers`, headers.length)
        if (promises.headers) {
          promises.headers.resolve(headers)
          delete promises.headers
        }
      } else if (command === 'version') {
        this.sendMessage('verack', null, true)
        const version = Version.read(payload)
        this.DEBUG_LOG && console.log(`bsv-p2p: version`, version)
        if (promises.connect) {
          promises.connect.version = version
          const { verack, resolve } = promises.connect
          if (verack) {
            console.log(`bsv-p2p: Connected to peer`, version)
            resolve(version)
            delete promises.connect
          }
        }
      } else if (command === 'verack') {
        this.DEBUG_LOG && console.log(`bsv-p2p: verack`)
        this.connected = true
        if (promises.connect) {
          promises.connect.verack = true
          const { version, resolve } = promises.connect
          if (version) {
            console.log(`bsv-p2p: Connected to peer`, version)
            resolve(version)
            delete promises.connect
          }
        }
      } else if (command === 'inv') {
        const msg = Inv.read(payload)
        const { blocks, txs } = msg
        // this.DEBUG_LOG && console.log(`bsv-p2p: inv`, inv)
        this.DEBUG_LOG &&
          console.log(
            `bsv-p2p: inv`,
            Object.keys(msg)
              .filter(key => msg[key].length > 0)
              .map(key => `${key}: ${msg[key].length}`)
              .join(', ')
          )
        if (blocks.length > 0) {
          this.emit('block_hashes', { ticker, hashes: blocks })
        }
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
      } else if (command === 'block') {
        if (!stream) {
          const block = Block.fromBuffer(payload)
          block.options = { validate }
          this.DEBUG_LOG &&
            console.log(
              `bsv-p2p: block`,
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
        }
      } else if (command === 'tx') {
        const transaction = Transaction.fromBuffer(payload)
        this.DEBUG_LOG && console.log(`bsv-p2p: tx`, transaction)
        this.emit('transactions', {
          ticker,
          finished: true,
          transactions: [[0, transaction]]
        })
      } else if (command === 'notfound') {
        const notfound = Inv.read(payload)
        console.log('bsv-p2p: notfound', notfound)
        for (let hash of notfound.blocks) {
          // TODO: Doesn't seem to be working
          hash = hash.toString('hex')
          if (promises.block[hash]) {
            promises.block[hash].reject(new Error(`Block ${hash} not found`))
            delete promises.block[hash]
          }
        }
      } else if (command === 'alert') {
        // console.log(`bsv-p2p: alert ${payload.toString()}`)
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
        this.DEBUG_LOG && console.log(`bsv-p2p: reject`, msg)
        // TODO?
      } else if (command === 'addr') {
        const addr = Address.readAddr(payload)
        this.emit('addr', { ticker, addr })
        this.DEBUG_LOG && console.log(`bsv-p2p: addr`, addr)
      } else if (command === 'getheaders') {
        this.DEBUG_LOG && console.log(`bsv-p2p: getheaders`)
        // console.log(`bsv-p2p: getheaders`, payload.toString('hex'))
        // TODO?
      } else if (command === 'sendcmpct') {
        this.DEBUG_LOG &&
          console.log(`bsv-p2p: sendcmpct ${payload.toString('hex')}`)
        // TODO?
      } else if (command === 'sendheaders') {
        this.DEBUG_LOG && console.log(`bsv-p2p: sendheaders`)
        // TODO?
      } else {
        console.log(
          `bsv-p2p: Unknown command ${command}, ${payload.toString('hex')} ${
            payload.length
          } bytes`
        )
      }

      if (remainingBuffer.length > 0) {
        return this.readMessage(remainingBuffer)
      }
    } catch (err) {
      console.log(`bsv-p2p: ERROR`, err)
      this.disconnect() // TODO: Recover!
    }
  }

  connect (options) {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        if (this.promises.connect) {
          return this.promises.connect
        } else {
          return resolve()
        }
      }
      this.promises.connect = { resolve, reject }
      this.socket = new Net.Socket()
      const { socket, buffers, ticker, node } = this
      const host = node.split(':')[0]
      const port = node.split(':')[1] || 8333
      console.log(`bsv-p2p: Connecting to ${host}:${port}`)
      socket.on('connect', () => {
        console.log(`bsv-p2p: Connected to ${host}:${port}`)
        const payload = Version.write({ ticker, options })
        this.sendMessage('version', payload, true)
      })
      socket.on('error', err => {
        this.DEBUG_LOG && console.log(`bsv-p2p: Socket error`, err)
        this.disconnect()
        if (this.autoReconnect) this.connect()
      })
      socket.on('end', () => {
        console.log(`bsv-p2p: Socket disconnected ${node}`)
        this.disconnect()
        if (this.autoReconnect) this.connect()
      })
      socket.on('data', data => {
        // this.DEBUG_LOG && console.log(`bsv-p2p: data`, data.toString('hex'))
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
      console.log(`bsv-p2p: Disconnected from ${this.node}`)
      this.DEBUG_LOG && console.log(`bsv-p2p: Disconnecting...`)
      this.socket.destroy()
      this.socket = null
      this.connected = false
      this.disconnects++
      this.buffers = {
        data: [],
        needed: 0,
        length: 0,
        block: null
      }

      function resetPromises (obj) {
        Object.keys(obj).map(key => {
          try {
            if (obj[key].reject) {
              obj[key].reject(new Error(`Disconnected. ${key}`))
              delete obj[key]
            } else {
              resetPromises(obj[key])
            }
          } catch (err) {
            console.log(`bsv-p2p: resetPromises error`, key, obj, err)
          }
        })
      }
      resetPromises(this.promises)
      this.emit('disconnected', { disconnects: this.disconnects })
    }
  }
  getHeaders ({ from, to }) {
    return new Promise((resolve, reject) => {
      const { promises, ticker } = this
      if (promises.headers) {
        promises.headers.reject(new Error(`Headers timed out`))
      }
      try {
        const payload = Headers.getheaders({ from, to, ticker })
        this.sendMessage('getheaders', payload)
        this.promises.headers = { resolve, reject }
      } catch (err) {
        reject(err)
      }
    })
  }
  getMempool () {
    this.sendMessage('mempool')
  }
  getBlock (blockHash) {
    const hex = blockHash.toString('hex')
    if (this.promises.block[hex]) {
      return this.promises.block[hex]
    }
    return new Promise(async (resolve, reject) => {
      this.promises.block[hex] = { resolve, reject }
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
        try {
          this.sendMessage('inv', payload)
          this.promises.txs[transaction.getHash().toString('hex')] = {
            resolve,
            reject,
            transaction
          }
        } catch (err) {
          return reject(err)
        }
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
  ping () {
    return new Promise((resolve, reject) => {
      try {
        const nonce = crypto.randomBytes(8)
        this.sendMessage('ping', nonce)
        this.promises.ping[nonce.toString('hex')] = {
          resolve,
          reject,
          date: +new Date()
        }
      } catch (err) {
        reject(err)
      }
    })
  }
  listenForTxs (listenTxs = true) {
    this.listenTxs = listenTxs
  }
  listenForBlocks () {
    this.listenBlocks = true
  }
}

module.exports = Peer
