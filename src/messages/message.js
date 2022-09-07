const {
  utils: { BufferReader, BufferWriter, Hash }
} = require('bsv-minimal')
const { EXTMSG_TICKERS } = require('../config')

function write ({ command, payload, magic, ticker }) {
  if (!Buffer.isBuffer(command)) command = Buffer.from(command)
  if (!Buffer.isBuffer(payload)) payload = Buffer.from(payload || '')

  const bw = new BufferWriter()
  bw.write(magic)
  if (payload.length <= 0xffffffff) {
    bw.write(Buffer.concat([command, Buffer.alloc(12 - command.length, 0)]))
    bw.writeUInt32LE(payload.length)
    bw.write(Hash.sha256sha256(payload).slice(0, 4))
    bw.write(payload)
  } else {
    if (!EXTMSG_TICKERS[ticker])
      throw Error(`Ticker ${ticker} does not support extended messages`)
    // New message format for extended payloads > 4GB
    // https://github.com/bitcoin-sv/bitcoin-sv/releases/tag/v1.0.10
    const extmsg = Buffer.from('extmsg')
    bw.write(Buffer.concat([extmsg, Buffer.alloc(12 - extmsg.length, 0)]))
    bw.writeUInt32LE(0xffffffff)
    bw.writeUInt32LE(0x00000000)
    bw.write(Buffer.concat([command, Buffer.alloc(12 - command.length, 0)]))
    bw.writeUInt64LE(payload.length)
    bw.write(payload)
  }
  return bw.toBuffer()
}

function read ({ buffer, magic, ticker }) {
  const HEADER_SIZE = 4 + 12 + 4 + 4
  if (buffer.length <= HEADER_SIZE) {
    return { needed: HEADER_SIZE }
  }
  const br = new BufferReader(buffer)
  const bufferMagic = br.read(4)
  if (Buffer.compare(magic, bufferMagic) !== 0) {
    throw new Error(
      `Invalid magic ${bufferMagic.toString('hex')}. Expecting ${magic.toString(
        'hex'
      )}`
    )
  }
  const buf = br.read(12)
  let pos = buf.length
  while (buf[pos - 1] === 0) {
    pos--
  }
  let command = buf.slice(0, pos).toString()
  const length = br.readUInt32LE()
  const checksum = br.read(4)
  let payload
  if (length === 0xffffffff && command.toLowerCase() === 'extmsg') {
    if (!EXTMSG_TICKERS[ticker])
      throw Error(`Ticker ${ticker} does not support extended messages`)
    // New message format for extended payloads > 4GB
    // https://github.com/bitcoin-sv/bitcoin-sv/releases/tag/v1.0.10
    const buf = br.read(12)
    let pos = buf.length
    while (buf[pos - 1] === 0) {
      pos--
    }
    command = buf.slice(0, pos).toString()
    const ext_length = br.readUInt64LE()
    payload = br.read(ext_length)

    if (payload.length !== ext_length) {
      // console.log(
      //   'bsv-p2p: Invalid length. Waiting for more data...',
      //   payload.length,
      //   length
      // )
      return { command, payload, needed: HEADER_SIZE + 12 + 8 + ext_length }
    }
  } else {
    payload = br.read(length)

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
  }

  return { command, payload, end: br.pos, needed: 0 }
}

module.exports = {
  read,
  write
}
