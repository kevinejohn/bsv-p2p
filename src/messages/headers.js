const {
  Header,
  utils: { BufferReader, BufferWriter }
} = require('bsv-minimal')

function getheaders ({ version, from, to }) {
  if (!from) from = Buffer.alloc(32, 0)
  if (!Array.isArray(from)) from = [from]
  if (!to) to = Buffer.alloc(32, 0)
  if (!Buffer.isBuffer(to)) to = Buffer.from(to, 'hex')
  const bw = new BufferWriter()
  bw.writeUInt32LE(version)
  bw.writeVarintNum(from.length)
  for (let hash of from) {
    if (!Buffer.isBuffer(hash)) hash = Buffer.from(hash, 'hex')
    bw.writeReverse(hash)
  }
  bw.writeReverse(to)
  return bw.toBuffer()
}

function parseHeaders (payload) {
  const br = new BufferReader(payload)
  const count = br.readVarintNum()
  const headers = []
  for (let i = 0; i < count; i++) {
    const header = Header.fromBufferReader(br)
    const txCount = br.readVarintNum()
    headers.push(header)
  }
  if (!br.eof()) throw new Error(`Invalid payload`)
  return headers
}

module.exports = {
  getheaders,
  parseHeaders
}
