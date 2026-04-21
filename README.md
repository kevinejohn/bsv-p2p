# bsv-p2p

[![NPM Package](https://img.shields.io/npm/v/bsv-p2p.svg?style=flat-square)](https://www.npmjs.org/package/bsv-p2p)

Communicate on the Bitcoin P2P network with minimal overhead or dependencies

Built to follow the protocol definition here: <https://en.bitcoin.it/wiki/Protocol_documentation>

### Methods

`npm i bsv-p2p`

### Docs

- [View TypeScript documentation here](docs/README.md)

### Basic use

```js
const BitcoinP2P = require("bsv-p2p").default;

const node = "95.217.42.32"; // ipv4 or ipv6 address
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

peer.on("tx_mempool", ({ tx }) => {
  console.log(`tx ${tx.getHash().toString("hex")} seen in mempool`);
});

peer.on("tx_block", ({ header, txs, finished }) => {
  for (const { index, tx } of txs) {
    console.log(
      `tx ${tx.getHash().toString("hex")} in index ${index} of block ${header
        .getHash()
        .toString("hex")}`
    );
  }
  if (finished) console.log(`Finished block ${header.getHash().toString("hex")}`);
});

await peer.connect();
await peer.getBlock("<block hash>");
peer.fetchMempoolTxs((txids) => txids); // Return filtered txids to download mempool txs
peer.fetchNewBlocks((hashes) => hashes); // Return filtered block hashes to download new blocks
```

### Other methods

```js
const BitcoinP2P = require("bsv-p2p").default;

const node = "95.217.42.32"; // ipv4 or ipv6 address
const port = 8333;
const ticker = "BSV"; // Also works with BTC, BCH, XEC and other bitcoin network protocols
const segwit = false; // Set to true for BTC and other segwit coins
const validate = true; // Perform merkle root validation
const autoReconnect = true; // Attempt reconnect after disconnects
const disableExtmsg = false; // Disable extension messages (> 4GB payloads). Set to true if ticker is not BSV
const mempoolTxs = true; // Receiving mempool tx announcements
const DEBUG_LOG = false; // console.log detailed messages on what is happening
const peer = new BitcoinP2P({
  node,
  port,
  ticker,
  segwit,
  validate,
  autoReconnect,
  disableExtmsg,
  mempoolTxs,
  DEBUG_LOG,
});

peer.on("addr", ({ addrs }) => {
  // List of connected peers
  for (const addr of addrs) {
    console.log(addr);
  }
});
peer.on("block_hashes", ({ hashes }) => {
  // New block hashes announced
  for (const hash of hashes) {
    console.log(`New block ${hash.toString("hex")} from ${node}`);
  }
});
peer.on("block_chunk", ({ chunk, blockHash, finished, started, num }) => {
  // Only needed if you want to save the block chunks
});
peer.on("block", ({ blockHash }) => {
  // Block completed downloading
});
peer.on("tx_mempool", ({ tx }) => {
  // bsv-minimal tx object
});
peer.on(
  "tx_block",
  ({
    blockHash,
    header,
    started,
    finished,
    height,
    blockSize,
    txCount,
    txs,
  }) => {
    // txs array
  }
);
peer.on("disconnected", ({ disconnects }) => {
  // Disconnected from peer
});
peer.on("connected", () => {
  // Connected to peer
});
peer.on("version", ({ version }) => {
  // Received version message
});
peer.on("message", ({ command, payload }) => {
  // Received a message
});
peer.on("error_message", ({ error }) => {
  // Error processing message
});
peer.on("error_socket", ({ error }) => {
  // Socket error
});

await peer.connect(); // Resolves when connected
await peer.getHeaders({ from: ["<hex header>"], to: "<stop hash>" }); // Returns array of Headers
peer.getMempool(); // Request node for all mempool txs. Recommend not using. Nodes usually disconnect you.
await peer.ping(); // Returns Number. Te response time in milliseconds
await peer.getAddr(); // Request nodes connected peers list
await peer.getBlock("<block hash>"); // Hex string or 32 byte Buffer
await peer.broadcastTx(transaction); // bsv-minimal Transaction object
peer.getTxs([Buffer.from("<txid>", "hex")]); // Array of txid 32 byte Buffers
peer.fetchMempoolTxs((txids) => txids); // Return filtered txids to download mempool txs
peer.fetchNewBlocks((hashes) => hashes); // Return filtered block hashes to download new blocks
peer.disconnect();
```

### Tests

`npm run test`
