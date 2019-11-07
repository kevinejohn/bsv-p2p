# bsv-p2p

[![NPM Package](https://img.shields.io/npm/v/bsv-p2p.svg?style=flat-square)](https://www.npmjs.org/package/bsv-p2p)

Communicate on the Bitcoin P2P network

### Use

`npm install --save bsv-p2p`

```
const BitcoinP2P = require('bsv-p2p')

const nodes = [ '47.90.246.229:8333', '47.254.173.235:8333' ]
const peer = new BitcoinP2P({ nodes, stream: true, validate: true })

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
