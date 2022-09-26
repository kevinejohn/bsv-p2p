import { utils } from "bsv-minimal";

const { BufferReader } = utils;

interface ReadRejectResult {
  message: string;
  ccode: number;
  reason: string;
  data?: Buffer;
}

function read(payload: Buffer) {
  const br = new BufferReader(payload);
  const result: ReadRejectResult = {
    message: br.readVarLengthBuffer().toString(),
    ccode: br.readUInt8(),
    reason: br.readVarLengthBuffer().toString(),
  };
  if (!br.eof()) result.data = br.readReverse(32);

  return result;
}

const Reject = { read };

export default Reject;
