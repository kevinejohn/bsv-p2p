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
const peer = new BitcoinP2P({ nodes, stream, validate })

peer.on('block_hashes', ({ blocks }) => {
    // New block hash announced
})
peer.on('block_chunk', ({ chunk, blockHash, finished, started, num }) => {
    // Only needed if you want to save the block chunks
})
peer.on('block', ({ block }) => {
    // Only called if `stream = false`
})
peer.on('transactions', ({ header, finished, transactions }) => {
    // `header` if transaction is confirmed in a block. Otherwise it is a mempool tx
    // `finished` if these are the last transactions in a block
    for (const [index, transaction] of transactions) {
        // Filter and store transaction information here
    }
})

peer.connect()
peer.getHeaders([<hashes>...], <stop hash>)
peer.isConnected()
peer.getMempool()
peer.getAddr()
peer.getBlock(<block hash>)
peer.broadcastTx(<tx buffer>)
peer.getTxs([<txid>...])
peer.getBlocks([<block hash>...])
peer.listenForTxs()
peer.listenForBlocks()
peer.disconnect()
```

### Tests

`TODO`
