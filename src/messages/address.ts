import { utils } from "bsv-minimal";

const { BufferReader, BufferWriter } = utils;

const IPV4_BUF = Buffer.from("00000000000000000000FFFF", "hex");

export type NetAddress = {
  services: Buffer;
  ip: Buffer;
  port: number;
  time?: number;
  ipv4?: string;
};

function read(payload: Buffer | utils.BufferReader, versionMessage = false) {
  let br = payload;
  if (Buffer.isBuffer(br)) br = new BufferReader(br);
  let time;
  if (!versionMessage) time = br.readUInt32LE(); // Time not present in version message: https://en.bitcoin.it/wiki/Protocol_documentation#Network_address
  const services = br.readReverse(8);
  const ip = br.read(16);
  const port = br.readUInt16BE();
  const result: NetAddress = { services, ip, port };
  if (!versionMessage) result.time = time;
  if (Buffer.compare(IPV4_BUF, result.ip.subarray(0, 12)) === 0) {
    const br2 = new BufferReader(result.ip.subarray(12));
    result.ipv4 = `${br2.readUInt8()}.${br2.readUInt8()}.${br2.readUInt8()}.${br2.readUInt8()}`;
  }
  return result;
}

function readAddr(payload: Buffer) {
  const br = new BufferReader(payload);
  const count = br.readVarintNum();
  const addrs: NetAddress[] = [];
  for (let i = 0; i < count; i++) {
    const addr = read(br);
    addrs.push(addr);
  }
  return addrs;
}

export interface MessageAddress {
  services: Buffer;
  ip: Buffer;
  port: number;
  time?: number;
  ipv4?: string;
  bw?: utils.BufferWriter;
}

function write({ time, services, ip, port, bw }: MessageAddress) {
  if (!bw) bw = new BufferWriter();
  if (time) bw.writeUInt32LE(time);
  // bw.writeUInt64LEBN(services)
  bw.writeReverse(services);
  bw.write(ip);
  bw.writeUInt16BE(port);
  return bw.toBuffer();
}

const Address = {
  read,
  readAddr,
  write,
};

export default Address;
