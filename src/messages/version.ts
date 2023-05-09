import { utils } from "bsv-minimal";

import crypto from "crypto";
import Address, { MessageAddress } from "./address";
import { VERSIONS, USER_AGENTS } from "../config";

const { BufferReader, BufferWriter } = utils;

const VERSION_OBJ = {
  // version: VERSIONS.DEFAULT,
  // services: Buffer.alloc(8, 0),
  // version: VERSION,
  services: Buffer.alloc(8, 0),
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
  // start_height: 0,
  relay: 1, // Receive mempool txs
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
    addr_recv: Address.read(br, true),
    addr_from: Address.read(br, true),
    nonce: br.read(8),
    user_agent: br.readVarLengthBuffer().toString(),
    start_height: br.readUInt32LE(),
    relay: br.readUInt8(),
    segwit: false,
  };
  const services = result.services;
  if (services && services[7] & (1 << 3)) result.segwit = true;
  // if (!br.eof()) throw new Error(`Invalid payload`)
  return result;
}

export type VersionOptions = {
  user_agent?: string;
  timestamp?: number;
  version?: number;
  services?: Buffer;
  addr_recv?: MessageAddress;
  addr_from?: MessageAddress;
  nonce?: Buffer;
  start_height?: number;
  relay?: number;
  segwit?: boolean;
};

export interface WriteVersionOptions {
  ticker: string;
  user_agent?: string;
  start_height?: number;
  mempoolTxs: boolean;
  version: number;
  segwit?: boolean;
  options?: VersionOptions;
}

function write({
  ticker,
  user_agent: userAgent,
  start_height: startHeight,
  mempoolTxs,
  version: versionParam,
  segwit,
  options,
}: WriteVersionOptions) {
  options = {
    ...VERSION_OBJ,
    user_agent: userAgent,
    start_height: startHeight,
    version: versionParam,
    relay: mempoolTxs ? 1 : 0,
    ...options,
  };
  let {
    version = VERSIONS[ticker] || VERSIONS.DEFAULT,
    services = VERSION_OBJ.services,
    timestamp = BigInt(Math.round(+new Date() / 1000)),
    addr_recv = VERSION_OBJ.addr_recv,
    addr_from = VERSION_OBJ.addr_from,
    nonce = VERSION_OBJ.nonce,
    user_agent = USER_AGENTS[ticker] || USER_AGENTS.DEFAULT,
    start_height = 0,
    relay = VERSION_OBJ.relay,
  } = options;

  if (segwit) services[7] = services[7] | (1 << 3);

  const bw = new BufferWriter();
  bw.writeUInt32LE(version);
  // bw.writeUInt64LE(services)
  bw.writeReverse(services);
  bw.writeUInt64LE(BigInt(timestamp));
  bw.write(Address.write(addr_recv));
  bw.write(Address.write(addr_from));
  bw.write(nonce);
  bw.writeVarintNum(Buffer.from(user_agent).length);
  bw.write(Buffer.from(user_agent));
  bw.writeUInt32LE(start_height);
  bw.writeUInt8(relay);
  const buf = bw.toBuffer();
  return buf;
}

const Version = {
  read,
  write,
};

export default Version;
