import { utils } from "bsv-minimal";

import crypto from "crypto";
import Address, { MessageAddress } from "./address";
import { VERSIONS, USER_AGENTS } from "../config";

const { BufferReader, BufferWriter } = utils;

const VERSION_OBJ = {
  // version: 70001,
  // services: Buffer.alloc(8, 0),
  // version: VERSION,
  services: Buffer.from("0000000000000025", "hex"),
  // services: new BN(0),
  // timestamp: ,
  addr_recv: {
    services: Buffer.alloc(8, 0),
    // services: new BN(0),
    ip: Buffer.alloc(16, 0),
    port: 0,
  },
  addr_from: {
    services: Buffer.alloc(8, 0),
    // services: new BN(0),
    ip: Buffer.alloc(16, 0),
    port: 0,
  },
  nonce: crypto.randomBytes(8),
  // user_agent: ,
  start_height: 0,
  relay: Buffer.from([1]),
} as const;

function read(payload: Buffer | utils.BufferReader) {
  let br = payload;
  if (Buffer.isBuffer(br)) br = new BufferReader(br);
  // We don't NEED to explicityly type this, but it'll
  // be helpful so others can re-use the interface
  const result = {
    version: br.readUInt32LE(),
    // services : br.readUInt64LE(,
    services: br.readReverse(8),
    timestamp: br.readUInt64LE(),
    addr_recv: Address.read(br, { ipv4: true }),
    addr_from: Address.read(br, { ipv4: true }),
    nonce: br.read(8),
    user_agent: br.readVarLengthBuffer().toString(),
    start_height: br.readUInt32LE(),
    relay: br.readUInt8(),
  };
  // if (!br.eof()) throw new Error(`Invalid payload`)
  return result;
}

interface WriteVersionOptions {
  ticker: keyof typeof USER_AGENTS;
  options: {
    user_agent?: typeof USER_AGENTS[keyof typeof USER_AGENTS] | Buffer;
    timestamp?: bigint;
    version?: number;
    services: Buffer;
    addr_recv: MessageAddress;
    addr_from: MessageAddress;
    nonce: Buffer;
    start_height: number;
    relay: Buffer;
  };
}

function write({ ticker, options }: WriteVersionOptions) {
  options = {
    user_agent: USER_AGENTS[ticker],
    timestamp: BigInt(Math.round(+new Date() / 1000)),
    ...VERSION_OBJ,
    ...options,
  };
  let {
    version,
    services,
    timestamp = BigInt(Math.round(+new Date() / 1000)),
    addr_recv,
    addr_from,
    nonce,
    user_agent = USER_AGENTS[ticker],
    start_height,
    relay,
  } = options;

  if (!(start_height >= 0)) {
    start_height = 0;
  }

  const bw = new BufferWriter();
  bw.writeUInt32LE(version || VERSIONS[ticker]);
  // bw.writeUInt64LE(services)
  bw.writeReverse(services);
  bw.writeUInt64LE(timestamp);
  bw.write(Address.write(addr_recv));
  bw.write(Address.write(addr_from));
  bw.write(nonce);
  if (!Buffer.isBuffer(user_agent)) user_agent = Buffer.from(user_agent);
  bw.writeVarintNum(user_agent.length);
  bw.write(user_agent);
  bw.writeUInt32LE(start_height);
  bw.write(relay);
  return bw.toBuffer();
}

const Version = {
  read,
  write,
};

export default Version;
