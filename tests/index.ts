import assert from "assert";
import Net from "net";
import { Block } from "bsv-minimal";
import BitcoinP2P from "../src";
import { MAX_PER_MSG } from "../src/config";
import { GetData, Headers, Inv, Message, Version } from "../src/messages";

const magic = Buffer.from("e3e1f3e8", "hex");

function withTimeout<T>(promise: Promise<T>, ms: number, label: string) {
  let timeout: NodeJS.Timeout | undefined;
  const timer = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(Error(`${label} timed out`)), ms);
  });

  return Promise.race([promise, timer]).finally(() => {
    if (timeout) clearTimeout(timeout);
  });
}

function makeCoinbaseTx() {
  return Buffer.concat([
    Buffer.from("01000000", "hex"), // version
    Buffer.from("01", "hex"), // input count
    Buffer.alloc(32, 0), // prev txid
    Buffer.from("ffffffff", "hex"), // prev vout
    Buffer.from("01", "hex"), // script length
    Buffer.from("00", "hex"), // script
    Buffer.from("ffffffff", "hex"), // sequence
    Buffer.from("01", "hex"), // output count
    Buffer.alloc(8, 0), // satoshis
    Buffer.from("00", "hex"), // output script length
    Buffer.from("00000000", "hex"), // locktime
  ]);
}

function makeBlockPayload() {
  const header = Buffer.concat([
    Buffer.from("01000000", "hex"), // version
    Buffer.alloc(32, 0), // prev block
    Buffer.alloc(32, 0), // merkle root, validation disabled in this test
    Buffer.alloc(4, 0), // time
    Buffer.alloc(4, 0), // bits
    Buffer.alloc(4, 0), // nonce
  ]);

  return Buffer.concat([header, Buffer.from("01", "hex"), makeCoinbaseTx()]);
}

async function testVersionDefaultsAreIsolated() {
  const first = Version.read(
    Version.write({
      ticker: "BSV",
      version: 70016,
      mempoolTxs: true,
      segwit: false,
    })
  );
  const second = Version.read(
    Version.write({
      ticker: "BSV",
      version: 70016,
      mempoolTxs: true,
      segwit: false,
    })
  );

  assert.notStrictEqual(
    first.nonce.toString("hex"),
    second.nonce.toString("hex")
  );

  Version.write({
    ticker: "BTC",
    version: 70015,
    mempoolTxs: true,
    segwit: true,
  });
  const bsv = Version.read(
    Version.write({
      ticker: "BSV",
      version: 70016,
      mempoolTxs: true,
      segwit: false,
    })
  );
  assert.equal(bsv.segwit, false);

  const services = Buffer.alloc(8, 0);
  Version.write({
    ticker: "BTC",
    version: 70015,
    mempoolTxs: true,
    segwit: true,
    options: { services },
  });
  assert.equal(services.toString("hex"), Buffer.alloc(8, 0).toString("hex"));
}

async function testNodeParsingKeepsRawIpv6Port() {
  const rawIpv6 = new BitcoinP2P({
    node: "2401:d002:3902:0700:d28e:56b6:a15b:8f41",
    ticker: "BSV",
  });
  assert.equal(rawIpv6.node, "2401:d002:3902:0700:d28e:56b6:a15b:8f41");
  assert.equal(rawIpv6.port, 8333);

  const bracketedIpv6 = new BitcoinP2P({
    node: "[2401:d002:3902:0700:d28e:56b6:a15b:8f41]:18333",
    ticker: "BSV",
  });
  assert.equal(bracketedIpv6.node, "2401:d002:3902:0700:d28e:56b6:a15b:8f41");
  assert.equal(bracketedIpv6.port, 18333);

  const ipv4WithPort = new BitcoinP2P({
    node: "127.0.0.1:18444",
    ticker: "BSV",
  });
  assert.equal(ipv4WithPort.node, "127.0.0.1");
  assert.equal(ipv4WithPort.port, 18444);
}

async function testGetBlockRejectsInvalidHash() {
  const peer = new BitcoinP2P({
    node: "127.0.0.1",
    ticker: "BSV",
    autoReconnect: false,
  });

  await assert.rejects(
    () => peer.getBlock("abcd", 1),
    /Invalid block hash/
  );
}

async function testVersionReadHandlesMissingRelayByte() {
  const fullPayload = Version.write({
    ticker: "BSV",
    version: 70001,
    mempoolTxs: true,
    segwit: false,
  });
  const legacyPayload = fullPayload.subarray(0, fullPayload.length - 1);
  const version = Version.read(legacyPayload);

  assert.equal(version.relay, 1);
}

async function testRejectsUnboundedNonBlockPayloads() {
  const command = Buffer.concat([Buffer.from("ping"), Buffer.alloc(8, 0)]);
  const header = Buffer.alloc(24, 0);
  magic.copy(header, 0);
  command.copy(header, 4);
  header.writeUInt32LE(0xffffffff, 16);

  assert.throws(
    () => Message.read({ buffer: header, magic, extmsg: false }),
    /Payload too large/
  );
}

async function testRejectsTooManyInventoryItems() {
  const payload = Buffer.alloc(3);
  payload[0] = 0xfd;
  payload.writeUInt16LE(MAX_PER_MSG + 1, 1);

  assert.throws(() => Inv.read(payload), /Too many inventory items/);
  assert.throws(() => GetData.read(payload), /Too many inventory items/);
}

async function testGetheadersNormalizesHexStrings() {
  const locator = "11".repeat(32);
  const stop = "22".repeat(32);
  const payload = Headers.getheaders({
    from: [locator],
    to: stop,
    version: 70016,
  });

  assert.equal(payload.length, 4 + 1 + 32 + 32);
  assert.equal(payload.readUInt32LE(0), 70016);
  assert.equal(payload.readUInt8(4), 1);
  assert.equal(
    payload.subarray(5, 37).toString("hex"),
    Buffer.from(locator, "hex").reverse().toString("hex")
  );
  assert.equal(
    payload.subarray(37).toString("hex"),
    Buffer.from(stop, "hex").reverse().toString("hex")
  );
  assert.throws(
    () => Headers.getheaders({ from: ["abcd"], version: 70016 }),
    /Invalid locator hash/
  );
}

async function testWitnessGetdataResolvesBroadcastWaiters() {
  const peer = new BitcoinP2P({
    node: "127.0.0.1",
    ticker: "BSV",
    autoReconnect: false,
  });
  const hash = Buffer.alloc(32, 1);
  const wait = peer.emitter.wait(
    `getdata_tx_${hash.toString("hex")}`,
    null,
    1
  );
  const payload = GetData.write({ witness_txs: [hash] });

  peer.readMessage(
    Message.write({ command: "getdata", payload, magic, extmsg: false })
  );

  await wait;
}

async function testBlockRemainderIsParsedImmediately() {
  const server = Net.createServer();
  let serverSocket: Net.Socket | undefined;

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  server.on("connection", (socket) => {
    serverSocket = socket;
    socket.once("data", () => {
      const versionPayload = Version.write({
        ticker: "BSV",
        version: 70016,
        mempoolTxs: true,
        segwit: false,
      });
      socket.write(
        Buffer.concat([
          Message.write({
            command: "version",
            payload: versionPayload,
            magic,
            extmsg: false,
          }),
          Message.write({
            command: "verack",
            payload: null,
            magic,
            extmsg: false,
          }),
        ])
      );
    });
  });

  const address = server.address();
  assert(address && typeof address === "object");

  const peer = new BitcoinP2P({
    node: "127.0.0.1",
    port: address.port,
    ticker: "BSV",
    validate: false,
    autoReconnect: false,
  });

  try {
    await withTimeout(peer.connect(), 1000, "connect");

    const blockPayload = makeBlockPayload();
    const blockHash = Block.fromBuffer(blockPayload).getHash().toString("hex");
    const blockSeen = withTimeout(
      peer.getBlock(blockHash.toUpperCase(), 1),
      1000,
      "block"
    );
    const pingSeen = withTimeout(
      new Promise<void>((resolve) => peer.once("ping", () => resolve())),
      1000,
      "ping"
    );
    const blockMsg = Message.write({
      command: "block",
      payload: blockPayload,
      magic,
      extmsg: peer.extmsg,
    });
    const pingMsg = Message.write({
      command: "ping",
      payload: Buffer.alloc(8, 2),
      magic,
      extmsg: peer.extmsg,
    });

    assert(serverSocket);
    serverSocket.write(Buffer.concat([blockMsg, pingMsg]));
    const [blockResult] = await Promise.all([blockSeen, pingSeen]);
    assert.equal(blockResult.blockHash.toString("hex"), blockHash);
    assert.equal(blockResult.blockSize, blockPayload.length);
    assert.equal(blockResult.size, blockPayload.length);
  } finally {
    peer.disconnect(false);
    serverSocket?.destroy();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

const tests: [string, () => Promise<void>][] = [
  ["version defaults are isolated", testVersionDefaultsAreIsolated],
  ["node parsing keeps raw IPv6 port", testNodeParsingKeepsRawIpv6Port],
  ["getBlock rejects invalid hashes", testGetBlockRejectsInvalidHash],
  ["version read handles missing relay byte", testVersionReadHandlesMissingRelayByte],
  [
    "unbounded non-block payloads are rejected",
    testRejectsUnboundedNonBlockPayloads,
  ],
  [
    "too many inventory items are rejected",
    testRejectsTooManyInventoryItems,
  ],
  ["getheaders normalizes hex strings", testGetheadersNormalizesHexStrings],
  [
    "witness getdata resolves broadcast waiters",
    testWitnessGetdataResolvesBroadcastWaiters,
  ],
  [
    "block remainder is parsed immediately",
    testBlockRemainderIsParsedImmediately,
  ],
];

(async () => {
  for (const [name, test] of tests) {
    await test();
    console.log(`ok - ${name}`);
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
