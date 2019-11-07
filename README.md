# bsv-p2p

[![NPM Package](https://img.shields.io/npm/v/bsv-p2p.svg?style=flat-square)](https://www.npmjs.org/package/bsv-p2p)

Communicate on the Bitcoin P2P network

Built to follow the protocol definition here: <https://en.bitcoin.it/wiki/Protocol_documentation>

### Use

`npm install --save bsv-p2p`

```
const BitcoinP2P = require('bsv-p2p')

const nodes = [ '47.90.246.229:8333', '47.254.173.235:8333' ]
const stream = true // Process txs as it is downloading the block. No block size memory constraints
const validate = true // Does merkle root validation on txs in a block. Disable to save some processing time
const peer = new BitcoinP2P({ nodes, stream, validate })

peer.on('block_hashes', ({ blocks }) => {
    // New block header announced
})
peer.on('block_chunk', ({ chunk, blockHash, finished, started, num }) => {
    // Only needed if you want to save the block chunks
})
peer.on('block', ({ block }) => {
    // Only called if `stream: false`
})
peer.on('transactions', ({ header, finished, transactions }) => {
    // `header` if transaction is confirmed in a block. Otherwise it is a mempool tx
    // `finished` if these are the last transactions in a block
    for (const [index, transaction] of transactions) {
        // Filter and store transaction information here
    }
})

peer.connect()
peer.getHeaders(<last hash>)
peer.isConnected()
peer.getMempool()
peer.getAddr()
peer.getBlock(<block hash>)
peer.broadcastTx(<tx buffer>)
peer.getTxs([<txid>...])
peer.getBlocks([<block hash>...])
peer.listenForTxs(hashes => hashes.filter(hash => {
    // return true if you want to fetch the full tx. false otherwise
    return true
}))
peer.listenForBlocks()
peer.disconnect()
```

### Tests

`TODO`
