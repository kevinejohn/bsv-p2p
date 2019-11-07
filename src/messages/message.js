const {
  utils: { BufferReader, BufferWriter, Hash }
} = require('bsv-minimal')

function write ({ command, payload, magic }) {
  if (!Buffer.isBuffer(command)) command = Buffer.from(command)
  if (!Buffer.isBuffer(payload)) payload = Buffer.from(payload || '')

  const bw = new BufferWriter()
  bw.write(magic)
  bw.write(Buffer.concat([command, Buffer.alloc(12 - command.length, 0)]))
  bw.writeUInt32LE(payload.length)
  bw.write(Hash.sha256sha256(payload).slice(0, 4))
  bw.write(payload)
  return bw.toBuffer()
}
function read ({ buffer, magic }) {
  const HEADER_SIZE = 4 + 12 + 4 + 4
  if (buffer.length <= HEADER_SIZE) {
    return { needed: HEADER_SIZE }
  }
  const br = new BufferReader(buffer)
  const bufferMagic = br.read(4)
  if (Buffer.compare(magic, bufferMagic) !== 0) {
    throw new Error(`Invalid magic ${magic.toString('hex')}`)
  }
  const buf = br.read(12)
  const length = br.readUInt32LE()
  const checksum = br.read(4)
  const payload = br.read(length)

  let pos = buf.length
  while (buf[pos - 1] === 0) {
    pos--
  }
  const command = buf.slice(0, pos).toString()
  if (payload.length !== length) {
    // console.log(
    //   'bsv-p2p: Invalid length. Waiting for more data...',
    //   payload.length,
    //   length
    // )
    return { command, payload, needed: HEADER_SIZE + length }
  }

  const hash = Hash.sha256sha256(payload).slice(0, 4)
  if (Buffer.compare(checksum, hash) !== 0) {
    throw new Error(`Invalid checksum`)
  }
  return { command, payload, end: br.pos, needed: 0 }
}

module.exports = {
  read,
  write
}
