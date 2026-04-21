import BitcoinP2P, { PeerOptions } from "../src";
import { NetAddress } from "../src/messages/address";
import Message from "../src/messages/message";

(async () => {
  const options: PeerOptions = {
    ticker: "BTC",
    segwit: true,
    node: `94.130.79.4:8333`,
    DEBUG_LOG: true,
    mempoolTxs: true,
  };
  const peer = new BitcoinP2P(options);
  peer.once("connected", () => {
    console.log(`Connected event!`);
  });

  peer.on("tx_mempool", ({ tx }) => {
    console.log(`Received mempool tx ${tx.getHash().toString("hex")}`);
  });
  peer.on("tx_block", ({ txs, started, finished }) => {
    console.log(
      `Received ${txs.length} block txs ${
        started ? `started` : finished ? "finished" : ""
      }`
    );
  });
  peer.on("error_message", ({ error, buffer, magic, extmsg }) => {
    try {
      const message = Message.read({ buffer, magic, extmsg });
      // const { command, payload, end, needed } = message;
      console.error(`ERROR MESSAGE`, message, error);
    } catch (err) {
      console.error(`ERROR MESSAGE: Message parse error`, error, err);
    }
  });
  peer.on("block_chunk", ({ blockHash, chunk, started, finished, blockSize }) => {
    console.log(
      `Received block chunk ${chunk.length}/${blockSize} bytes ${blockHash.toString(
        "hex"
      )} ${started ? "started" : finished ? "finished" : ""}`
    );
  });
  peer.on("headers", (obj) => {
    // console.log(`Received headers`, obj);
  });
  peer.on("addr", ({ addrs }: { addrs: NetAddress[] }) => {
    addrs.map((addr) => console.log(addr));
  });
  peer.on("disconnected", ({ disconnects }) => {
    console.log(`Disconnected to peer`);
  });
  try {
    await peer.connect();
    console.log(`Connected`);
    //   const delay = await peer.ping();
    //   console.log(`Peer responded in ${delay} ms`);

    //   await new Promise((r) => setTimeout(r, 1000 * 3));
    //   // console.log(`Getting peers of peers`);
    //   let addrs = await peer.getAddr();
    //   // console.log(addrs);

    //   const headers = await peer.getHeaders({});
    //   console.log(`Headers`, headers);

    peer.fetchMempoolTxs((txids) => txids); // Return filtered txids to download mempool txs
    //   // peer.fetchNewBlocks((hashes) => hashes); // Return filtered block hashes to download new blocks

    //   // await new Promise((r) => setTimeout(r, 1000 * 3));
    console.log(`Getting block...`);
    const blockInfo = await peer.getBlock(
      "000000000000000000026ea74cd2b8fadebf4d5d4ee65186902490455d7bf706"
    );
    console.log({
      blockHash: blockInfo.blockHash.toString("hex"),
      blockSize: blockInfo.blockSize,
      height: blockInfo.height,
      ticker: blockInfo.ticker,
    });
  } finally {
    peer.disconnect(false);
  }
})();
