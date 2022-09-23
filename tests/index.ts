import BitcoinP2P, { PeerOptions } from "../src";

(async () => {
  const options: PeerOptions = {
    ticker: "BSV",
    node: "seed.bitcoinsv.io",
    DEBUG_LOG: true,
  };
  const peer = new BitcoinP2P(options);
  peer.once("connected", () => {
    console.log(`Connected event!`);
  });

  peer.on("transactions", ({ transactions }) => {
    console.log(`Received ${transactions.length} txs`);
  });
  peer.on("addr", ({ addr }) => {
    for (const { ipv4, port } of addr) {
      if (ipv4 && port > 8000 && port < 9400) {
        console.log(`${ipv4}:${port}`);
      }
    }
  });
  peer.on("disconnected", ({ disconnects }) => {
    console.log(`Disconnected to peer`);
  });
  await peer.connect();
  console.log(`Connected`);
  const delay = await peer.ping();
  console.log(`Peer responded in ${delay} ms`);
  // peer.getAddr();

  await peer.getBlock(
    "000000000054e7be570e606951fe0a80480efbe1f20d55d58cc2b88c8afe5003"
  );

  await peer.disconnect();
})();
