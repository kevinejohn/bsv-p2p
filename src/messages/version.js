const {
  utils: { BufferReader, BufferWriter, BN }
} = require('bsv-minimal')
const crypto = require('crypto')
const Address = require('./address')

const VERSION = {
  // version: 70015,
  version: 70001,
  services: Buffer.from([1, 0, 0, 0, 0, 0, 0, 0]), // Buffer.alloc(8, 0),
  // timestamp: ,
  addr_recv: {
    services: Buffer.alloc(8, 0),
    ip: Buffer.alloc(16, 0),
    port: 0
  },
  addr_from: {
    services: Buffer.alloc(8, 0),
    ip: Buffer.alloc(16, 0),
    port: 0
  },
  nonce: crypto.randomBytes(8),
  // user_agent: '/Bitcoin SV:0.2.1(EB10000.0)/',
  start_height: 0,
  relay: Buffer.from([1])
}

const USER_AGENTS = {
  BSV: '/Bitcoin SV:0.2.1(EB2000.0)/',
  // BSV: '/bitcore:1.2.1/',
  BTC: '/Bitcoin/',
  BCH: '/Bitcoin/',
  'BSV-STN': '/Bitcoin SV:0.2.1(EB10000.0)/'
}

function read (payload) {
  let br = payload
  if (Buffer.isBuffer(br)) br = new BufferReader(br)
  const o = {}
  o.version = br.readUInt32LE()
  // o.services = br.readUInt64LEBN()
  o.services = br.read(8)
  o.timestamp = br.readUInt64LEBN()
  o.addr_recv = Address.read(br, true)
  o.addr_from = Address.read(br, true)
  o.nonce = br.read(8)
  o.user_agent = br.readVarLengthBuffer().toString()
  o.start_height = br.readUInt32LE()
  o.relay = br.read(1)
  if (!br.eof()) throw new Error(`Invalid payload`)
  return o
}

function write (network = USER_AGENTS.BSV, custom = VERSION) {
  let {
    version,
    services,
    timestamp = new BN(Math.round(+new Date() / 1000)),
    addr_recv,
    addr_from,
    nonce,
    user_agent = USER_AGENTS[network],
    start_height,
    relay
  } = custom

  const bw = new BufferWriter()
  bw.writeUInt32LE(version)
  // bw.writeUInt64LEBN(services)
  bw.write(services)
  bw.writeUInt64LEBN(timestamp)
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
