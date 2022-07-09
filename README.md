# bsv-p2p

[![NPM Package](https://img.shields.io/npm/v/bsv-p2p.svg?style=flat-square)](https://www.npmjs.org/package/bsv-p2p)

Communicate on the Bitcoin P2P network with minimal overhead or dependencies

Built to follow the protocol definition here: <https://en.bitcoin.it/wiki/Protocol_documentation>

### Methods

`npm install --save bsv-p2p`

```
const BitcoinP2P = require('bsv-p2p')

const node = `seed.bitcoinsv.io`
const stream = true // Parse txs while block is downloading. No block size memory constraints
const validate = true // Perform merkle root validation. Disable to save processing time
const autoReconnect = true // Attempt reconnect after disconnects
const DEBUG_LOG = false // console.log detailed messages on what is happening
const peer = new BitcoinP2P({ node, stream, validate, autoReconnect, DEBUG_LOG })

peer.on('addr', ({ node, addrs }) => {
    // List of connected peers
    for (const addr of addrs) {
        console.log(addr)
    }
})
peer.on('block_hashes', ({ node, hashes }) => {
    // New block hashes announced

    for (const hash of hashes) {
        console.log(`New block ${hash.toString('hex)} from ${node}`)
    }
})
peer.on('block_chunk', ({ node, chunk, blockHash, finished, started, num }) => {
    // Only needed if you want to save the block chunks
})
peer.on('block', ({ node, block }) => {
    // Only called if `stream = false`
})
peer.on('transactions', ({ node, header, finished, transactions }) => {
    // `header` if transaction is confirmed in a block. Otherwise it is a mempool tx
    // `finished` if these are the last transactions in a block
    for (const [index, transaction] of transactions) {
        // Filter and store transaction information here
    }
})
peer.on('disconnected', ({ node, disconnects }) => {
    // Disconnected from peer
})
peer.on('connected', ({ node }) => {
    // Connected to peer
})
peer.on('version', ({ node, version }) => {
    // Both nodes sent and acknowledged version messages
})
peer.on('message', ({ node, command, payload }) => {
    // Received a message
})
peer.on('error_message', ({ node, error }) => {
    // Error processing message
})
peer.on('error_socket', ({ node, error }) => {
    // Socket error
})

await peer.connect()
await peer.getHeaders({ from: [<hashes>...], to: <stop hash> })
peer.isConnected()
peer.getMempool()
await peer.ping()
peer.getAddr()
await peer.getBlock(<block hash>)
await peer.broadcastTx(<tx buffer>)
peer.getTxs([<txid>...])
peer.getBlocks([<block hash>...])
peer.listenForTxs()
peer.listenForBlocks()
peer.disconnect()
```

### Basic use

```
const BitcoinP2P = require('bsv-p2p')

const node = `seed.bitcoinsv.io`
const stream = true // Parse txs while block is downloading. No block size memory constraints
const validate = true // Perform merkle root validation. Disable to save processing time
const autoReconnect = true // Attempt reconnect after disconnects
const DEBUG_LOG = false // console.log detailed messages on what is happening
const peer = new BitcoinP2P({ node, stream, validate, autoReconnect, DEBUG_LOG })

const fs = require('fs')
const path = require('path')
let writeStream

peer.on('block_chunk', ({ node, chunk, blockHash, finished, started, num }) => {
    // Save blocks to disk
    if (started) {
        writeStream = fs.createWriteStream(`${blockHash.toString('hex')}-tmp`)
    }

    writeStream.write(chunk)

    if (finished) {
        writeStream.end()
        writeStream = null
        fs.renameSync(`${blockHash.toString('hex')}-tmp`, `${blockHash.toString('hex')}`)
    }
})

peer.on('transactions', ({ node, header, finished, transactions }) => {
    // `header` if transaction is confirmed in a block. Otherwise it is a mempool tx
    // `finished` is true if these are the last transactions in a block
    for (const [index, transaction] of transactions) {
        // index: is the transaction index number in the block if header exists
        // transaction: is a bsv-minimal lib object
    }
})

await peer.connect()
peer.listenForTxs() // Will automatically download transaction as they are seen
peer.listenForBlocks() // Will automatically download blocks as they are seen
```

### Tests

`TODO`
