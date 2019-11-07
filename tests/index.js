const BitcoinP2P = require('../src')

;(async () => {
  const nodes = ['47.90.246.229:8333', '47.254.173.235:8333']
  const peer = new BitcoinP2P({ nodes, DEBUG_LOG: true })

  await peer.connect()
  console.log(`Connected`)
  peer.getAddr()
  // await peer.disconnect()
  console.log(`DONE`)
})()
