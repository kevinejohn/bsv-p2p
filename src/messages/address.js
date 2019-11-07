const {
  utils: { BufferReader, BufferWriter }
} = require('bsv-minimal')

function read (payload, isVersion = false) {
  let br = payload
  if (Buffer.isBuffer(br)) br = new BufferReader(br)
  const o = {}
  if (!isVersion) o.time = br.readUInt32LE()
  // o.services = br.readUInt64LEBN()
  o.services = br.read(8)
  o.ip = br.read(16)
  o.port = br.readUInt16BE()
  // o.port = br.readUInt16LE()

  return o
}

function write ({ time, services, ip, port, bw }) {
  if (!bw) bw = new BufferWriter()
  if (time) bw.writeUInt32LE(time)
  // bw.writeUInt64LEBN(services)
  bw.write(services)
  bw.write(ip)
  bw.writeUInt16BE(port)
  // bw.writeUInt16LE(port)
  return bw.toBuffer()
}

module.exports = {
  read,
  write
}
