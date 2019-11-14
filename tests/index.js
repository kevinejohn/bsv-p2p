const BitcoinP2P = require('../src')

;(async () => {
  // const COIN = 'BSV'
  const COIN = 'BSV-STN'

  const OPTIONS = {
    BSV: {
      ticker: 'BSV',
      node: `seed.bitcoinsv.io`,
      // nodes: [
      //   `seed.bitcoinsv.io`,
      //   `seed.cascharia.com`,
      //   `seed.satoshisvision.network`
      // ],
      autoReconnect: false,
      DEBUG_LOG: true
    },
    'BSV-STN': {
      ticker: 'BSV-STN',
      node: '209.97.128.49:9333',
      // nodes: [
      //   `209.97.128.49:9333`,
      //   `144.76.85.2:9333`,
      //   `159.69.162.170:9333`,
      //   `138.201.83.157:9333`
      // ],
      // nodes: [`178.128.169.224:9333`],
      // nodes: [`stn-seed.bitcoinsv.io:9333`],
      autoReconnect: false,
      DEBUG_LOG: true
    }
  }
  const peer = new BitcoinP2P(OPTIONS[COIN])

  await peer.connect()
  console.log(`Connected`)
  const delay = await peer.ping()
  console.log(`Peer responded in ${delay} ms`)
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
  peer.on('disconnected', ({ disconnects }) => {
    console.log(`Disconnected to peer`)
  })
  setTimeout(() => {
    // peer.getAddr()
    // peer.getBlock(
    //   '000000000054e7be570e606951fe0a80480efbe1f20d55d58cc2b88c8afe5003'
    // )
  }, 5000)

  // await peer.disconnect()
})()
