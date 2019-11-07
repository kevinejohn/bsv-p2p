# bsv-p2p

[![NPM Package](https://img.shields.io/npm/v/bsv-p2p.svg?style=flat-square)](https://www.npmjs.org/package/bsv-p2p)

Communicate on the Bitcoin P2P network

### Use

`npm install --save bsv-p2p`

```
const BitcoinP2P = require('bsv-p2p')

const nodes = [ '47.90.246.229:8333', '47.254.173.235:8333' ]
const peer = new BitcoinP2P({ nodes })

peer.on('block_hashes', async ({ blocks }) => {})
peer.on('block_chunk', async ({ chunk, blockHash, finished, started, num }) => {})
peer.on('block', async ({ block }) => {})
peer.on('transactions', async ({ header, finished, transactions }) => {})

peer.connect()
peer.disconnect()
peer.getHeaders(<last hash>)
peer.isConnected()
peer.getMempool()
peer.getBlock(<block hash>)
peer.broadcastTx(<tx buffer>)
peer.getTxs([<txid>...])
peer.getBlocks([<block hash>...])
peer.listenForTxs(hashes => hashes.filter(hash => true))
peer.listenForBlocks()
```

### Tests

`TODO`
