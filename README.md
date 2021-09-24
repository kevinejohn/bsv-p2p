# bsv-p2p

[![NPM Package](https://img.shields.io/npm/v/bsv-p2p.svg?style=flat-square)](https://www.npmjs.org/package/bsv-p2p)

Communicate on the Bitcoin P2P network with minimal overhead or dependencies

Built to follow the protocol definition here: <https://en.bitcoin.it/wiki/Protocol_documentation>

### Use

`npm install --save bsv-p2p`

```
const BitcoinP2P = require('bsv-p2p')

const nodes = [`seed.bitcoinsv.io`, `seed.cascharia.com`, `seed.satoshisvision.network`]
const stream = true // Parse txs while block is downloading. No block size memory constraints
const validate = true // Perform merkle root validation. Disable to save processing time
const autoReconnect = true // Attempt reconnect after disconnects
const DEBUG_LOG = false // console.log detailed messages on what is happening
const peer = new BitcoinP2P({ nodes, stream, validate, autoReconnect, DEBUG_LOG })

peer.on('addr', ({ node, addr }) => {
    // List of connected peers
})
peer.on('block_hashes', ({ node, blocks }) => {
    // New block hashes announced
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

### Tests

`TODO`
