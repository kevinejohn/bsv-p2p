import { Header, utils } from "bsv-minimal";

const { BufferReader, BufferWriter } = utils;

export interface GetHeadersOptions {
  from?: Buffer | Buffer[];
  to?: Buffer;
  version: number;
}

function getheaders({ from, to, version }: GetHeadersOptions) {
  if (!from) from = Buffer.alloc(32, 0);
  if (!Array.isArray(from)) from = [from];
  if (!to) to = Buffer.alloc(32, 0);
  if (!Buffer.isBuffer(to)) to = Buffer.from(to, "hex");
  const bw = new BufferWriter();
  bw.writeUInt32LE(version);
  bw.writeVarintNum(from.length);
  for (const hash of from) {
    bw.writeReverse(hash);
  }
  bw.writeReverse(to);
  return bw.toBuffer();
}

function parseHeaders(payload: Buffer) {
  const br = new BufferReader(payload);
  const count = br.readVarintNum();
  const headers: Header[] = [];
  const txs: number[] = [];
  for (let i = 0; i < count; i++) {
    const header = Header.fromBufferReader(br);
    const txCount = br.readVarintNum(); // Always 0
    headers.push(header);
    txs.push(txCount);
  }
  if (!br.eof()) throw new Error(`Invalid payload`);
  return { headers, txs };
}

const Headers = {
  getheaders,
  parseHeaders,
};

export default Headers;
