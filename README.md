# bsv-p2p

[![NPM Package](https://img.shields.io/npm/v/bsv-p2p.svg?style=flat-square)](https://www.npmjs.org/package/bsv-p2p)

Communicate on the Bitcoin P2P network with minimal overhead or dependencies

Built to follow the protocol definition here: <https://en.bitcoin.it/wiki/Protocol_documentation>

### Methods

`npm i bsv-p2p`

```js
const BitcoinP2P = require('bsv-p2p')

const node = `seed.bitcoinsv.io`
const ticker = 'BSV' // Also works with BTC, BCH, XEC and other bitcoin network protocols
const stream = true // Parse txs while block is downloading. No block size memory constraints
const validate = true // Perform merkle root validation. Disable to save processing time
const autoReconnect = true // Attempt reconnect after disconnects
const disableExtmsg = false // Disable extension messages (> 4GB payloads). Set to true if ticker is not BSV
const DEBUG_LOG = false // console.log detailed messages on what is happening
const peer = new BitcoinP2P({ node, ticker, stream, validate, autoReconnect, disableExtmsg, DEBUG_LOG })

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
await peer.getHeaders({ from: ['<hex header>'], to: '<stop hash>' })
peer.isConnected()
peer.getMempool()
await peer.ping()
peer.getAddr()
await peer.getBlock('<block hash>')
await peer.broadcastTx('<tx buffer>')
peer.getTxs(['<txid>...'])
peer.getBlocks(['<block hash>...'])
peer.listenForTxs()
peer.listenForBlocks()
peer.disconnect()
```

### Basic use

```js
const BitcoinP2P = require("bsv-p2p");

const node = `seed.bitcoinsv.io`;
const ticker = "BSV"; // Also works with BTC, BCH, XEC and other bitcoin network protocols
const peer = new BitcoinP2P({ node, ticker });

const fs = require("fs");
const path = require("path");
let writeStream;
let writeDir;

peer.on("block_chunk", ({ node, chunk, blockHash, finished, started, num }) => {
  // Save blocks to disk
  if (started) {
    writeDir = path.join(__dirname, `${blockHash.toString("hex")}.bin`); // Path of final block file
    writeStream = fs.createWriteStream(`${writeDir}.tmp`);
  }

  writeStream.write(chunk);

  if (finished) {
    writeStream.end();
    writeStream = null;
    fs.renameSync(`${writeDir}.tmp`, writeDir);
  }
});

peer.on("transactions", ({ node, header, finished, transactions }) => {
  // `header` if transaction is confirmed in a block. Otherwise it is a mempool tx
  // `finished` is true if these are the last transactions in a block
  for (const [index, transaction] of transactions) {
    // index: is the transaction index number in the block if header exists
    // transaction: is a bsv-minimal lib object
    if (header) {
      console.log(
        `tx ${transaction
          .getHash()
          .toString("hex")} in index ${index} of block ${header
          .getHash()
          .toString("hex")}`
      );
    } else {
      console.log(
        `tx ${transaction.getHash().toString("hex")} seen in mempool`
      );
    }
  }
});

await peer.connect();
await peer.getBlock("<block hash>");
peer.listenForTxs(); // Will automatically download transactions in the mempool
peer.listenForBlocks(); // Will automatically download blocks as they are seen
```

### Tests

`TODO`
