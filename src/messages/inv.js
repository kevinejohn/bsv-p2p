const {
  utils: { BufferReader, BufferWriter }
} = require('bsv-minimal')

function read (buffer) {
  const br = new BufferReader(buffer)
  const count = br.readVarintNum()
  const txs = []
  const blocks = []
  const other = []
  for (let i = 0; i < count; i++) {
    let type = br.readUInt32LE()
    const hash = br.readReverse(32)
    if (type === 0) {
      // type = 'error'
    } else if (type === 1) {
      // type = 'tx'
      txs.push(hash)
    } else if (type === 2) {
      // type = 'block'
      blocks.push(hash)
    } else {
      other.push({
        type,
        hash
      })
    }
    // else if (type === 3 ) {
    //   type = 'filtered_block'
    // } else if (type === 4) {
    //   type = 'compatct_block'
    // }
  }
  if (!br.eof()) throw new Error(`Invalid payload`)
  return { txs, blocks, other }
}

function write ({ transactions }) {
  const bw = new BufferWriter()
  bw.writeVarintNum(transactions.length)
  for (const transaction of transactions) {
    bw.writeUInt32LE(1)
    bw.writeReverse(transaction.getHash())
  }
  return bw.toBuffer()
}

module.exports = {
  read,
  write
}
