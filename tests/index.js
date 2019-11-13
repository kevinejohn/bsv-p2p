const BitcoinP2P = require('../src')

;(async () => {
  // const COIN = 'BSV'
  const COIN = 'BSV-STN'

  const OPTIONS = {
    BSV: {
      ticker: 'BSV',
      nodes: [
        `seed.bitcoinsv.io`,
        `seed.cascharia.com`,
        `seed.satoshisvision.network`
      ],
      DEBUG_LOG: true
    },
    'BSV-STN': {
      ticker: 'BSV-STN',
      nodes: [`178.128.169.224:9333`],
      // nodes: [`stn-seed.bitcoinsv.io:9333`],
      DEBUG_LOG: true
    }
  }
  const peer = new BitcoinP2P(OPTIONS[COIN])

  await peer.connect()
  console.log(`Connected`)
  const delay = await peer.ping()
  console.log(`Peer responded in ${delay} ms`)
  // await peer.disconnect()
  peer.on('transactions', ({ transactions }) => {
    console.log(`Received ${transactions.length} txs`)
  })
  peer.on('addr', ({ addr }) => {
    for (const { ipv4, port } of addr) {
      if (ipv4 && port > 8000 && port < 9400) {
        console.log(`${ipv4}:${port}`)
      }
    } 
  })
  setTimeout(() => {
    // peer.getAddr()
    peer.getBlock(
      '000000000054e7be570e606951fe0a80480efbe1f20d55d58cc2b88c8afe5003'
    )
  }, 5000)
  // peer.getBlock(
  //   '000000000054e7be570e606951fe0a80480efbe1f20d55d58cc2b88c8afe5003'
  // )
  // console.log(`DONE`)
})()
