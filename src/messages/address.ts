import { utils } from "bsv-minimal";

const { BufferReader, BufferWriter } = utils;

const IPV4_BUF = Buffer.from("00000000000000000000FFFF", "hex");

export type NetAddress = {
  services: Buffer;
  ip: Buffer;
  port: number;
  time?: number;
  ipv4?: string;
  ipv6?: string;
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
  } else {
    const br2 = new BufferReader(result.ip);
    result.ipv6 = `${br2.read(2).toString("hex")}:${br2
      .read(2)
      .toString("hex")}:${br2.read(2).toString("hex")}:${br2
      .read(2)
      .toString("hex")}:${br2.read(2).toString("hex")}:${br2
      .read(2)
      .toString("hex")}:${br2.read(2).toString("hex")}:${br2
      .read(2)
      .toString("hex")}`;
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
  ip?: Buffer;
  ipv4?: string;
  ipv6?: string;
  port: number;
  time?: number;
  bw?: utils.BufferWriter;
}

function write({ time, services, ip, ipv4, ipv6, port, bw }: MessageAddress) {
  if (!bw) bw = new BufferWriter();
  if (time) bw.writeUInt32LE(time);
  // bw.writeUInt64LEBN(services)
  bw.writeReverse(services);
  if (ip) {
    bw.write(ip);
  } else if (ipv4) {
    const nums = ipv4.split(".");
    if (nums.length !== 4) throw Error(`Invalid ipv4: ${ipv4}`);
    bw.write(IPV4_BUF);
    bw.writeUInt8(parseInt(nums[0]));
    bw.writeUInt8(parseInt(nums[1]));
    bw.writeUInt8(parseInt(nums[2]));
    bw.writeUInt8(parseInt(nums[3]));
  } else if (ipv6) {
    const octets = ipv6.split(":");
    if (octets.length !== 8 || ipv6.length !== 39)
      throw Error(`Invalid ipv6: ${ipv6}`);
    bw.write(Buffer.from(octets[0], "hex"));
    bw.write(Buffer.from(octets[1], "hex"));
    bw.write(Buffer.from(octets[2], "hex"));
    bw.write(Buffer.from(octets[3], "hex"));
    bw.write(Buffer.from(octets[4], "hex"));
    bw.write(Buffer.from(octets[5], "hex"));
    bw.write(Buffer.from(octets[6], "hex"));
    bw.write(Buffer.from(octets[7], "hex"));
  } else {
    throw Error(`Missing ip`);
  }
  bw.writeUInt16BE(port);
  return bw.toBuffer();
}

const Address = {
  read,
  readAddr,
  write,
};

export default Address;
