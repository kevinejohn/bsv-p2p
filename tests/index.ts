import BitcoinP2P, { PeerOptions } from "../src";
import { NetAddress } from "../src/messages/address";
import Message from "../src/messages/message";

(async () => {
  const options: PeerOptions = {
    ticker: "BSV",
    // node: "[2401:d002:3902:0700:d28e:56b6:a15b:8f41]:8333",
    // node: "2401:d002:3902:0700:d28e:56b6:a15b:8f41",
    // node: `95.217.42.32:8333`,
    node: "65.108.105.253:8333",
    DEBUG_LOG: true,
    mempoolTxs: true,
    segwit: false,
  };
  const peer = new BitcoinP2P(options);
  peer.once("connected", () => {
    console.log(`Connected event!`);
  });

  peer.on("tx_mempool", ({ tx }) => {
    console.log(`Received mempool tx`, tx);
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
      console.log(`Received ${txs.length} block txs`);
    }
  );
  peer.on("error_message", ({ error, buffer, magic, extmsg }) => {
    try {
      const message = Message.read({ buffer, magic, extmsg });
      // const { command, payload, end, needed } = message;
      console.error(`ERROR MESSAGE`, message, error);
    } catch (err) {
      console.error(`ERROR MESSAGE: Message parse error`, error, err);
    }
  });
  peer.on("block_chunk", (obj) => {
    console.log(`Received block chunk`, obj);
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
  await peer.connect();
  console.log(`Connected`);
  const delay = await peer.ping();
  console.log(`Peer responded in ${delay} ms`);

  await new Promise((r) => setTimeout(r, 1000 * 3));
  // console.log(`Getting peers of peers`);
  let addrs = await peer.getAddr();
  // console.log(addrs);

  const headers = await peer.getHeaders({});
  console.log(`Headers`, headers);

  // peer.fetchMempoolTxs((txids) => txids); // Return filtered txids to download mempool txs
  // peer.fetchNewBlocks((hashes) => hashes); // Return filtered block hashes to download new blocks

  // await new Promise((r) => setTimeout(r, 1000 * 3));
  console.log(`Getting block...`);
  let blockInfo = await peer.getBlock(
    "000000000000002245b638f45da58d88a31f51b0847fe20c0767401dc239d8b5"
  );
  console.log(blockInfo);

  peer.disconnect();
})();
