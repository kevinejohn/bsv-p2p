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

peer.on('addr', ({ addrs }) => {
    // List of connected peers
    for (const addr of addrs) {
        console.log(addr)
    }
})
peer.on('block_hashes', ({ hashes }) => {
    // New block hashes announced

    for (const hash of hashes) {
        console.log(`New block ${hash.toString('hex)} from ${node}`)
    }
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
peer.on('disconnected', ({ disconnects }) => {
    // Disconnected from peer
})
peer.on('connected', () => {
    // Connected to peer
})
peer.on('version', ({ version }) => {
    // Received version message
})
peer.on('message', ({ command, payload }) => {
    // Received a message
})
peer.on('error_message', ({ error }) => {
    // Error processing message
})
peer.on('error_socket', ({ error }) => {
    // Socket error
})

await peer.connect() // Resolves when connected
await peer.getHeaders({ from: ['<hex header>'], to: '<stop hash>' }) // Returns array of Headers
peer.getMempool() // Request node for mempool txs
await peer.ping() // Returns Number. Te response time in milliseconds
peer.getAddr() // Request nodes connected peers list
await peer.getBlock('<block hash>') // Hex string or 32 byte Buffer. If stream = true transactions will come through on peer.on('transactions'...
await peer.broadcastTx('<tx buffer>') // Tx Buffer
peer.getTxs(['<txid>...']) // Array of txid 32 byte Buffers
peer.listenForTxs() // Automatically download annouced txs from mempool
peer.listenForBlocks() // Automatically download announced blocks
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
