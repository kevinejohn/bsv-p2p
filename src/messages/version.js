const {
  utils: { BufferReader, BufferWriter }
} = require('bsv-minimal')
const crypto = require('crypto')
const Address = require('./address')
const { VERSIONS, USER_AGENTS } = require('../config')

const VERSION_OBJ = {
  // version: 70001,
  // services: Buffer.alloc(8, 0),
  // version: VERSION,
  services: Buffer.from('0000000000000025', 'hex'),
  // services: new BN(0),
  // timestamp: ,
  addr_recv: {
    services: Buffer.alloc(8, 0),
    // services: new BN(0),
    ip: Buffer.alloc(16, 0),
    port: 0
  },
  addr_from: {
    services: Buffer.alloc(8, 0),
    // services: new BN(0),
    ip: Buffer.alloc(16, 0),
    port: 0
  },
  nonce: crypto.randomBytes(8),
  // user_agent: ,
  start_height: 0,
  relay: Buffer.from([1])
}

function read (payload) {
  let br = payload
  if (Buffer.isBuffer(br)) br = new BufferReader(br)
  const o = {}
  o.version = br.readUInt32LE()
  // o.services = br.readUInt64LE()
  o.services = br.readReverse(8)
  o.timestamp = br.readUInt64LE().toString()
  o.addr_recv = Address.read(br, { ipv4: true })
  o.addr_from = Address.read(br, { ipv4: true })
  o.nonce = br.read(8)
  o.user_agent = br.readVarLengthBuffer().toString()
  o.start_height = br.readUInt32LE()
  o.relay = br.readUInt8()
  // if (!br.eof()) throw new Error(`Invalid payload`)
  return o
}

function write ({ ticker, options }) {
  options = {
    user_agent: USER_AGENTS[ticker],
    timestamp: Math.round(+new Date() / 1000),
    ...VERSION_OBJ,
    ...options
  }
  let {
    version,
    services,
    timestamp = Math.round(+new Date() / 1000),
    addr_recv,
    addr_from,
    nonce,
    user_agent = USER_AGENTS[ticker],
    start_height,
    relay
  } = options

  if (!(start_height >= 0)) {
    start_height = 0
  }

  const bw = new BufferWriter()
  bw.writeUInt32LE(version || VERSIONS[ticker])
  // bw.writeUInt64LE(services)
  bw.writeReverse(services)
  bw.writeUInt64LE(timestamp)
  bw.write(Address.write(addr_recv))
  bw.write(Address.write(addr_from))
  bw.write(nonce)
  if (!Buffer.isBuffer(user_agent)) user_agent = Buffer.from(user_agent)
  bw.writeVarintNum(user_agent.length)
  bw.write(user_agent)
  bw.writeUInt32LE(start_height)
  bw.write(relay)
  return bw.toBuffer()
}

module.exports = {
  read,
  write
}
