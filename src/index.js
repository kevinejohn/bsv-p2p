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
const { MAGIC_NUMS, MAX_PER_MSG } = require('./config')
const crypto = require('crypto')

class Peer extends EventEmitter {
  constructor ({
    node,
    ticker = 'BSV',
    stream = true,
    validate = true,
    autoReconnect = true,
    disableExtmsg = false,
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
    this.disableExtmsg = disableExtmsg
    this.promises = { block: {}, txs: {}, ping: {} }
    this.connected = false
    this.listenTxs = false
    this.listenBlocks = false
    this.extmsg = false
    this.disconnects = 0
    this.DEBUG_LOG = DEBUG_LOG
    this.broadcast = { size: 0 }
    this.buffers = {
      data: [],
      needed: 0,
      length: 0,
      block: null
    }
  }

  sendMessage (command, payload, force = false) {
    if (!this.connected && !force) throw new Error(`Not connected`)
    const { magic, extmsg } = this
    const serialized = Message.write({ command, payload, magic, extmsg })
    this.socket.write(serialized)
    this.DEBUG_LOG &&
      console.log(
        `bsv-p2p: Sent message ${command} ${
          payload ? payload.length : '0'
        } bytes`
      )
  }

  streamBlock (chunk, start) {
    const { buffers, promises, ticker, validate, node } = this
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
    const {
      finished,
      started,
      transactions,
      bytesRemaining,
      header,
      height,
      size
    } = stream
    stream.ticker = ticker
    this.emit('transactions', { ...stream, node })
    const blockHash = header.getHash()
    this.emit('block_chunk', {
      node,
      num: buffers.chunkNum++,
      started,
      finished,
      transactions,
      header,
      ticker,
      chunk: finished ? chunk.slice(0, chunk.length - bytesRemaining) : chunk,
      blockHash,
      height,
      size
    })
    if (finished) {
      if (bytesRemaining > 0) {
        const remaining = buffers.block.br.readAll()
        buffers.data = [remaining]
        buffers.length = remaining.length
      } else {
        buffers.data = []
        buffers.length = 0
      }
      buffers.block = null
      buffers.needed = 0

      const hash = header.getHash().toString('hex')
      if (promises.block[hash]) {
        promises.block[hash].resolve()
        delete promises.block[hash]
      }
    }
  }

  async readMessage (buffer) {
    const {
      node,
      magic,
      promises,
      buffers,
      ticker,
      stream,
      validate,
      listenTxs,
      listenBlocks,
      extmsg
    } = this
    try {
      const message = Message.read({ buffer, magic, extmsg })
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
        if (!this.disableExtmsg) this.extmsg = version.version >= 70016 // Enable/disable extension messages based on version
        this.DEBUG_LOG && console.log(`bsv-p2p: version`, version)
        if (promises.resolveConnect) {
          promises.resolveConnect.version = version
          const { verack, resolve } = promises.resolveConnect
          if (verack) {
            this.DEBUG_LOG && console.log(`bsv-p2p: Connected to peer`, version)
            resolve(version)
            delete promises.resolveConnect
            this.emit('version', { node, version })
          }
        }
      } else if (command === 'verack') {
        this.DEBUG_LOG && console.log(`bsv-p2p: verack`)
        this.connected = true
        if (promises.resolveConnect) {
          promises.resolveConnect.verack = true
          const { version, resolve } = promises.resolveConnect
          if (version) {
            this.DEBUG_LOG && console.log(`bsv-p2p: Connected to peer`, version)
            resolve(version)
            delete promises.resolveConnect
            this.emit('version', { node, version })
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
              this.getTxs(await listenTxs(txs))
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
        this.DEBUG_LOG && console.log('bsv-p2p: notfound', notfound)
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
        for (const hashBuf of txs) {
          const hash = hashBuf.toString('hex')
          const promise = promises.txs[hash]
          if (promise) {
            const { transaction } = promise
            this.sendMessage('tx', transaction.toBuffer())
            promise.resolve({ txid: hash })
            delete promises.txs[hash]
            // TODO: Make sure transaction is valid first
            this.emit('transactions', {
              ticker,
              finished: true,
              transactions: [[0, transaction]]
            })
          }
          const buf = this.broadcast[hash]
          if (buf) {
            !promise && this.sendMessage('tx', buf)
            delete this.broadcast[hash]
            this.broadcast.size--
            if (this.promises.broadcast && this.broadcast.size === 0) {
              this.promises.broadcast.resolve()
              delete this.promises.broadcast
            }
          }
        }
      } else if (command === 'reject') {
        const msg = Reject.read(payload)
        this.DEBUG_LOG && console.log(`bsv-p2p: reject`, msg)
        // TODO?
      } else if (command === 'addr') {
        const addr = Address.readAddr(payload)
        this.emit('addr', { ticker, addr, addrs: addr })
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
        this.DEBUG_LOG &&
          console.log(
            `bsv-p2p: Unknown command ${command}, ${payload.toString('hex')} ${
              payload.length
            } bytes`
          )
      }
      this.emit('message', { node, command, payload })

      if (remainingBuffer.length > 0) {
        return this.readMessage(remainingBuffer)
      }
    } catch (error) {
      this.DEBUG_LOG && console.log(`bsv-p2p: ERROR`, error)
      this.emit('error_message', { node, error })
      this.disconnect(this.autoReconnect) // TODO: Recover!
    }
  }

  connect (options = this.connectOptions) {
    if (!this.promises.connect) {
      this.promises.connect = new Promise((resolve, reject) => {
        this.promises.resolveConnect = { resolve, reject }
        this.connectOptions = options
        this.socket = new Net.Socket()
        const { socket, buffers, ticker, node } = this
        const host = node.split(':')[0]
        const port = node.split(':')[1] || 8333
        this.DEBUG_LOG && console.log(`bsv-p2p: Connecting to ${host}:${port}`)
        socket.on('connect', () => {
          this.DEBUG_LOG && console.log(`bsv-p2p: Connected to ${host}:${port}`)
          const payload = Version.write({ ticker, options })
          this.sendMessage('version', payload, true)
          this.emit('connected', { node })
        })
        socket.on('error', error => {
          this.DEBUG_LOG && console.log(`bsv-p2p: Socket error`, error)
          this.emit('error_socket', { node, error })
          this.disconnect(this.autoReconnect)
        })
        socket.on('end', () => {
          this.DEBUG_LOG && console.log(`bsv-p2p: Socket disconnected ${node}`)
          this.disconnect(this.autoReconnect)
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
    return this.promises.connect
  }
  disconnect (autoReconnect = false) {
    this.autoReconnect = autoReconnect
    if (this.socket) {
      this.DEBUG_LOG && console.log(`bsv-p2p: Disconnected from ${this.node}`)
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
            } else {
              resetPromises(obj[key])
            }
          } catch (err) {
            this.DEBUG_LOG &&
              console.log(`bsv-p2p: resetPromises error`, key, obj, err)
          }
        })
      }
      resetPromises(this.promises)
      this.promises = { block: {}, txs: {}, ping: {} }
      this.emit('disconnected', {
        node: this.node,
        disconnects: this.disconnects
      })

      if (autoReconnect) {
        setTimeout(() => this.connect(), 2000) // Wait 2 seconds before reconnecting
      }
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
      return this.promises.block[hex].promise
    }
    const promise = new Promise(async (resolve, reject) => {
      this.promises.block[hex] = { resolve, reject }
      this.getBlocks([blockHash])
    })
    this.promises.block[hex].promise = promise
    return promise
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
            node: this.node,
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
  broadcastTxs (txs) {
    return new Promise(async (resolve, reject) => {
      try {
        if (txs.length > MAX_PER_MSG) {
          return reject(new Error(`Too many transactions (${MAX_PER_MSG} max)`))
        }
        const transactions = []
        for (const buf of txs) {
          const transaction = Transaction.fromBuffer(buf)
          transactions.push(transaction.getHash())
          this.broadcast[transaction.getHash().toString('hex')] = buf
        }
        this.broadcast.size += txs.length
        if (this.promises.broadcast) {
          this.promises.broadcast.reject(`Timed out`)
        }
        this.promises.broadcast = { resolve, reject }
        const payload = Inv.write({ transactions })
        try {
          await this.connect()
          this.sendMessage('inv', payload)
        } catch (err) {
          return reject(err)
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
