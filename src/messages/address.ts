import { utils } from "bsv-minimal";

const { BufferReader, BufferWriter } = utils;

const IPV4_BUF = Buffer.from("00000000000000000000FFFF", "hex");

interface ReadAddressOptions {
  time?: boolean;
  ipv4?: boolean;
}

export interface ReadAddress extends Omit<MessageAddress, "bw"> {
  services: Buffer;
  ip: Buffer;
  port: number;
  time?: number;
  ipv4?: string;
}

function read(
  payload: Buffer | utils.BufferReader,
  { time, ipv4 }: ReadAddressOptions
) {
  let br = payload;
  if (Buffer.isBuffer(br)) br = new BufferReader(br);
  const result: ReadAddress = {
    services: br.readReverse(8),
    ip: br.read(16),
    port: br.readUInt16BE(),
  };
  if (time) result.time = br.readUInt32LE();
  if (ipv4 && Buffer.compare(IPV4_BUF, result.ip.subarray(0, 12)) === 0) {
    const br2 = new BufferReader(result.ip.subarray(12));
    result.ipv4 = `${br2.readUInt8()}.${br2.readUInt8()}.${br2.readUInt8()}.${br2.readUInt8()}`;
  }
  return result;
}

function readAddr(payload: Buffer) {
  const br = new BufferReader(payload);
  const count = br.readVarintNum();
  const addrs = [];
  for (let i = 0; i < count; i++) {
    const addr = read(br, { time: true, ipv4: true });
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
