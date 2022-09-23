import { utils } from "bsv-minimal";

const { BufferReader, BufferWriter } = utils;

function read(buffer: Buffer) {
  const br = new BufferReader(buffer);
  const count = br.readVarintNum();
  const txs: Buffer[] = [];
  const blocks: Buffer[] = [];
  const other: [Buffer, number][] = [];
  for (let i = 0; i < count; i++) {
    const type = br.readUInt32LE();
    const hash = br.readReverse(32);
    if (type === 1) {
      txs.push(hash);
    } else if (type === 2) {
      blocks.push(hash);
    } else {
      other.push([hash, type]);
    }
  }
  return { txs, blocks, other };
}

interface WriteGetDataOptions {
  txs?: Buffer[];
  blocks?: Buffer[];
  other?: [Buffer, number][];
}

function write({ txs = [], blocks = [], other = [] }: WriteGetDataOptions) {
  const bw = new BufferWriter();
  bw.writeVarintNum(txs.length + blocks.length + other.length);
  for (const hash of txs) {
    bw.writeUInt32LE(1);
    bw.writeReverse(hash);
  }
  for (const hash of blocks) {
    bw.writeUInt32LE(2);
    bw.writeReverse(hash);
  }
  for (const [hash, type] of other) {
    bw.writeUInt32LE(type);
    bw.writeReverse(hash);
  }
  return bw.toBuffer();
}

const GetData = {
  read,
  write,
};

export default GetData;
