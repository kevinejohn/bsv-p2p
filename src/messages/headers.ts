import { Header, utils } from "bsv-minimal";
import { VERSIONS } from "../config";

const { BufferReader, BufferWriter } = utils;

export interface GetHeadersOptions {
  from?: Buffer | Buffer[];
  to?: Buffer;
  ticker: keyof typeof VERSIONS;
}

function getheaders({ from, to, ticker }: GetHeadersOptions) {
  if (!from) from = Buffer.alloc(32, 0);
  if (!Array.isArray(from)) from = [from];
  if (!to) to = Buffer.alloc(32, 0);
  if (!Buffer.isBuffer(to)) to = Buffer.from(to, "hex");
  const bw = new BufferWriter();
  bw.writeUInt32LE(VERSIONS[ticker]);
  bw.writeVarintNum(from.length);
  for (let hash of from) {
    if (!Buffer.isBuffer(hash)) hash = Buffer.from(hash, "hex");
    bw.writeReverse(hash);
  }
  bw.writeReverse(to);
  return bw.toBuffer();
}

function parseHeaders(payload: Buffer) {
  const br = new BufferReader(payload);
  const count = br.readVarintNum();
  const headers = [];
  for (let i = 0; i < count; i++) {
    const header = Header.fromBufferReader(br);
    const txCount = br.readVarintNum();
    headers.push(header);
  }
  if (!br.eof()) throw new Error(`Invalid payload`);
  return headers;
}

const Headers = {
  getheaders,
  parseHeaders,
};

export default Headers;
