const curToken = 'ddn' // eok, sail, lims
const net = 'mainnet'  // mainnet, testnet

const tokenConfig = {
  ddn: {
    mainnet: {
      nethash: "b11fa2f2",
      beginEpochTime: new Date(Date.UTC(2017, 11, 20, 4, 0, 0, 0)),
      peer: {
        port: 8000,
        address: "peer.ddn.link"
      }
    },
    testnet: {
      nethash: "0ab796cd",
      beginEpochTime: new Date(Date.UTC(2017, 10, 20, 4, 0, 0, 0)),
      peer: {
        port: 8001,
        address: "47.92.0.84"
      },
    }
  },
  eok: {
    mainnet: {
      nethash: "",
      peer: {
      },
    },
    testnet: {
      nethash: "0ab796cd",
      beginEpochTime: new Date(Date.UTC(2018, 5, 6, 12, 20, 20, 20)), // testnet,
      peer: {
        port: 8001,
        address: "peer.ebookchain.org"
      },
    }
  }
}

const config = {
  name: 'DDN区块链浏览器',
  prefix: 'ddn20190522',
  openPages: ['/home'],
  serverUrl: `http://${tokenConfig[curToken][net].peer.address}:${tokenConfig[curToken][net].peer.port}`,
  token: tokenConfig[curToken][net],
  peerAddress:"peer.ebookchain.org",
  coinName :localStorage.getItem("tokenName")
}

export default config
