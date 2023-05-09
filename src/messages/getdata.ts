import { utils } from "bsv-minimal";

const { BufferReader, BufferWriter } = utils;

function read(buffer: Buffer) {
  const br = new BufferReader(buffer);
  const count = br.readVarintNum();
  const errors: Buffer[] = [];
  const txs: Buffer[] = [];
  const blocks: Buffer[] = [];
  const filtered_blocks: Buffer[] = [];
  const compact_blocks: Buffer[] = [];
  const witness_txs: Buffer[] = [];
  const witness_blocks: Buffer[] = [];
  const other: [Buffer, number][] = [];
  for (let i = 0; i < count; i++) {
    const type = br.readUInt32LE();
    const hash = br.readReverse(32);
    if (type === 0) {
      errors.push(hash);
    } else if (type === 1) {
      txs.push(hash);
    } else if (type === 2) {
      blocks.push(hash);
    } else if (type === 3) {
      filtered_blocks.push(hash);
    } else if (type === 4) {
      compact_blocks.push(hash);
    } else if (type === 0x40000001) {
      witness_txs.push(hash);
    } else if (type === 0x40000002) {
      witness_blocks.push(hash);
    } else {
      other.push([hash, type]);
    }
  }
  return {
    errors,
    txs,
    blocks,
    witness_txs,
    witness_blocks,
    filtered_blocks,
    compact_blocks,
    other,
  };
}

interface WriteGetDataOptions {
  txs?: Buffer[];
  blocks?: Buffer[];
  witness_txs?: Buffer[];
  witness_blocks?: Buffer[];
  errors?: Buffer[];
  filtered_blocks?: Buffer[];
  compact_blocks?: Buffer[];
  other?: [Buffer, number][];
}

function write({
  errors = [],
  txs = [],
  blocks = [],
  witness_txs = [],
  witness_blocks = [],
  filtered_blocks = [],
  compact_blocks = [],
  other = [],
}: WriteGetDataOptions) {
  const bw = new BufferWriter();
  bw.writeVarintNum(
    txs.length +
      blocks.length +
      witness_txs.length +
      witness_blocks.length +
      errors.length +
      filtered_blocks.length +
      compact_blocks.length +
      other.length
  );
  for (const hash of errors) {
    bw.writeUInt32LE(0);
    bw.writeReverse(hash);
  }
  for (const hash of txs) {
    bw.writeUInt32LE(1);
    bw.writeReverse(hash);
  }
  for (const hash of blocks) {
    bw.writeUInt32LE(2);
    bw.writeReverse(hash);
  }
  for (const hash of witness_txs) {
    bw.writeUInt32LE(0x40000001);
    bw.writeReverse(hash);
  }
  for (const hash of witness_blocks) {
    bw.writeUInt32LE(0x40000002);
    bw.writeReverse(hash);
  }
  for (const hash of filtered_blocks) {
    bw.writeUInt32LE(3);
    bw.writeReverse(hash);
  }
  for (const hash of compact_blocks) {
    bw.writeUInt32LE(4);
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
