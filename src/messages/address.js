const {
  utils: { BufferReader, BufferWriter },
} = require("bsv-minimal");

const IPV4_BUF = Buffer.from("00000000000000000000FFFF", "hex");

function read(payload, { time, ipv4 }) {
  let br = payload;
  if (Buffer.isBuffer(br)) br = new BufferReader(br);
  const o = {};
  if (time) o.time = br.readUInt32LE();
  // o.services = br.readUInt64LEBN()
  o.services = br.readReverse(8);
  o.ip = br.read(16);
  o.port = br.readUInt16BE();
  if (ipv4 && Buffer.compare(IPV4_BUF, o.ip.slice(0, 12)) === 0) {
    const br2 = new BufferReader(o.ip.slice(12));
    o.ipv4 = `${br2.readUInt8()}.${br2.readUInt8()}.${br2.readUInt8()}.${br2.readUInt8()}`;
  }
  return o;
}

function readAddr(payload) {
  const br = new BufferReader(payload);
  const count = br.readVarintNum();
  const addrs = [];
  for (let i = 0; i < count; i++) {
    const addr = read(br, { time: true, ipv4: true });
    addrs.push(addr);
  }
  return addrs;
}

function write({ time, services, ip, port, bw }) {
  if (!bw) bw = new BufferWriter();
  if (time) bw.writeUInt32LE(time);
  // bw.writeUInt64LEBN(services)
  bw.writeReverse(services);
  bw.write(ip);
  bw.writeUInt16BE(port);
  return bw.toBuffer();
}

module.exports = {
  read,
  readAddr,
  write,
};
