const BitcoinP2P = require('../src')

;(async () => {
  const options = {
    ticker: 'BSV',
    nodes: [
      `seed.bitcoinsv.io`,
      `seed.cascharia.com`,
      `seed.satoshisvision.network`
    ],
    DEBUG_LOG: true
  }
  // const options = { ticker: 'BSV-STN', nodes: [`stn-seed.bitcoinsv.io:9333`], DEBUG_LOG: true }
  const peer = new BitcoinP2P(options)

  await peer.connect()
  console.log(`Connected`)
  // await peer.getAddr()
  // await peer.disconnect()
})()
