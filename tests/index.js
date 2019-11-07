const BitcoinP2P = require('../src')

;(async () => {
  const nodes = [`seed.bitcoinsv.io`, `seed.cascharia.com`, `seed.satoshisvision.network`]
  const peer = new BitcoinP2P({ nodes, DEBUG_LOG: true })

  await peer.connect()
  console.log(`Connected`)
  peer.getAddr()
  // await peer.disconnect()
  console.log(`DONE`)
})()
