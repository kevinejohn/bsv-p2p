import BitcoinP2P, { PeerOptions } from "../src";

(async () => {
  const options: PeerOptions = {
    ticker: "BSV",
    node: `95.217.42.32:8333`,
    DEBUG_LOG: true,
    // mempoolTxs: false,
  };
  const peer = new BitcoinP2P(options);
  peer.once("connected", () => {
    console.log(`Connected event!`);
  });

  peer.on("transactions", ({ transactions }) => {
    console.log(`Received ${transactions.length} txs`);
  });
  peer.on("block_chunk", (obj) => {
    // console.log(`Received block chunk`, obj);
  });
  peer.on("headers", (obj) => {
    // console.log(`Received headers`, obj);
  });
  peer.on("addr", ({ addr }) => {
    // for (const { ipv4, port } of addr) {
    //   if (ipv4 && port > 8000 && port < 9400) {
    //     console.log(`${ipv4}:${port}`);
    //   }
    // }
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
  // let addrs = await peer.getAddr();
  // console.log(addrs);

  const headers = await peer.getHeaders({});
  console.log(`Headers`, headers);

  // // peer.listenForTxs();
  // peer.listenForBlocks();

  // await new Promise((r) => setTimeout(r, 1000 * 3));
  console.log(`Getting block...`);
  let blockInfo = await peer.getBlock(
    "000000000000002245b638f45da58d88a31f51b0847fe20c0767401dc239d8b5"
  );
  console.log(blockInfo);

  peer.disconnect();
})();
