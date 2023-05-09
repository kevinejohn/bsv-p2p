const MAGIC_NUMS: { [key: string]: Buffer } = {
  BSV: Buffer.from("e3e1f3e8", "hex"),
  BCH: Buffer.from("e3e1f3e8", "hex"),
  BTC: Buffer.from("f9beb4d9", "hex"),
  XEC: Buffer.from("e3e1f3e8", "hex"),
  "BSV-STN": Buffer.from("fbcec4f9", "hex"),
  REGTEST: Buffer.from("dab5bffa", "hex"),
  TESTNET: Buffer.from("f4e5f3f4", "hex"),
  DEFAULT: Buffer.from("e3e1f3e8", "hex"),
} as const;

const VERSIONS: { [ticker: string]: number } = {
  BSV: 70016,
  BTC: 70015,
  BCH: 70015,
  XEC: 70015,
  "BSV-STN": 70016,
  DEFAULT: 70015,
} as const;

const SEGWIT: { [ticker: string]: boolean } = {
  BSV: false,
  BTC: true,
  BCH: false,
  XEC: false,
  "BSV-STN": false,
  DEFAULT: false,
} as const;

const USER_AGENTS: { [ticker: string]: string } = {
  BSV: "/Bitcoin SV/",
  BTC: "/Bitcoin/",
  BCH: "/Bitcoin/",
  XEC: "/Bitcoin/",
  "BSV-STN": "/Bitcoin SV/",
  DEFAULT: "/Bitcoin/",
} as const;

const MAX_PER_MSG = 50000 as const;

export { MAGIC_NUMS, VERSIONS, USER_AGENTS, SEGWIT, MAX_PER_MSG };
