const {
  utils: { BufferReader, BufferWriter }
} = require('bsv-minimal')

function read (buffer) {
  const br = new BufferReader(buffer)
  const count = br.readVarintNum()
  const txs = []
  const blocks = []
  for (let i = 0; i < count; i++) {
    const type = br.readUInt32LE()
    const hash = br.readReverse(32)
    if (type === 1) {
      txs.push(hash)
    } else if (type === 2) {
      blocks.push(hash)
    }
  }
  return { txs, blocks }
}

function write (array, type) {
  const bw = new BufferWriter()
  bw.writeVarintNum(array.length)
  for (let hash of array) {
    if (!Buffer.isBuffer(hash)) hash = Buffer.from(hash, 'hex')
    bw.writeUInt32LE(type)
    bw.writeReverse(hash)
  }
  return bw.toBuffer()
}

module.exports = {
  read,
  write
}
