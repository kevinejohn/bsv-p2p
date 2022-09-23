import { utils } from "bsv-minimal";

const { BufferReader, BufferWriter } = utils;

function read(buffer: Buffer) {
  const br = new BufferReader(buffer);
  const count = br.readVarintNum();
  const txs = [];
  const blocks = [];
  const unknown = [];
  for (let i = 0; i < count; i++) {
    const type = br.readUInt32LE();
    const hash = br.readReverse(32);
    if (type === 1) {
      txs.push(hash);
    } else if (type === 2) {
      blocks.push(hash);
    } else {
      unknown.push({ type, hash });
    }
  }
  return { txs, blocks, unknown };
}

function write(array: (Buffer | string)[], type: number) {
  const bw = new BufferWriter();
  bw.writeVarintNum(array.length);
  for (let hash of array) {
    if (!Buffer.isBuffer(hash)) hash = Buffer.from(hash, "hex");
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
