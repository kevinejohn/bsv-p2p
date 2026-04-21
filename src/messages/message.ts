import { utils } from "bsv-minimal";

const { BufferReader, BufferWriter, Hash } = utils;

interface WriteMessageOptions {
  command: string;
  payload: Buffer | null;
  magic: Buffer;
  extmsg: boolean;
}

function write({ command, payload, magic, extmsg }: WriteMessageOptions) {
  const cmdBuf = Buffer.from(command);
  if (!Buffer.isBuffer(payload)) payload = Buffer.from("");

  const bw = new BufferWriter();
  bw.write(magic);
  if (payload.length <= 0xffffffff) {
    bw.write(Buffer.concat([cmdBuf, Buffer.alloc(12 - cmdBuf.length, 0)]));
    bw.writeUInt32LE(payload.length);
    bw.write(Hash.sha256sha256(payload).subarray(0, 4));
    bw.write(payload);
  } else {
    if (!extmsg) throw Error(`extended messages not supported`);
    // New message format for extended payloads > 4GB
    // https://github.com/bitcoin-sv/bitcoin-sv/releases/tag/v1.0.10
    const extcmd = Buffer.from("extmsg");
    bw.write(Buffer.concat([extcmd, Buffer.alloc(12 - extcmd.length, 0)]));
    bw.writeUInt32LE(0xffffffff);
    bw.writeUInt32LE(0x00000000);
    bw.write(Buffer.concat([cmdBuf, Buffer.alloc(12 - cmdBuf.length, 0)]));
    bw.writeUInt64LE(BigInt(payload.length));
    bw.write(payload);
  }
  return bw.toBuffer();
}

interface ReadMessageOptions {
  magic: Buffer;
  buffer: Buffer;
  extmsg: boolean;
}

const HEADER_SIZE = 4 + 12 + 4 + 4;
const HEADER_EXTMSG_SIZE = 4 + 12 + 4 + 4 + 12 + 8;
const MAX_MESSAGE_PAYLOAD_SIZE = 32 * 1024 * 1024; // Bitcoin Core's historical non-block message cap
const MAX_BLOCK_PAYLOAD_SIZE = 8 * 1024 * 1024 * 1024; // Allow BSV extmsg blocks, but reject unbounded claims

function assertPayloadSize(command: string, length: number | bigint) {
  const max =
    command.toLowerCase() === "block"
      ? BigInt(MAX_BLOCK_PAYLOAD_SIZE)
      : BigInt(MAX_MESSAGE_PAYLOAD_SIZE);
  const size = BigInt(length);

  if (size > max) {
    throw new Error(
      `Payload too large for ${command}: ${size.toString()} bytes`
    );
  }

  if (size > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error(
      `Payload too large for ${command}: ${size.toString()} bytes`
    );
  }
}

function read({ buffer, magic, extmsg }: ReadMessageOptions): {
  command: string;
  payload: Buffer;
  needed: number;
  end?: number;
  sizePayload: number;
} {
  if (buffer.length < HEADER_SIZE)
    return {
      command: "",
      payload: Buffer.from(""),
      sizePayload: 0,
      needed: HEADER_SIZE,
    };
  const br = new BufferReader(buffer);
  const bufferMagic = br.read(4);
  if (Buffer.compare(magic, bufferMagic) !== 0) {
    throw new Error(
      `Invalid magic ${bufferMagic.toString("hex")}. Expecting ${magic.toString(
        "hex"
      )}`
    );
  }
  const buf = br.read(12);
  let pos = buf.length;
  while (buf[pos - 1] === 0) {
    pos--;
  }
  let command = buf.slice(0, pos).toString();
  const length = br.readUInt32LE();
  const checksum = br.read(4);
  let payload: Buffer;
  if (length === 0xffffffff && command.toLowerCase() === "extmsg") {
    if (!extmsg) throw Error(`extended messages not supported`);
    if (buffer.length < HEADER_EXTMSG_SIZE)
      return {
        command: "",
        payload: Buffer.from(""),
        needed: HEADER_EXTMSG_SIZE,
        sizePayload: 0,
      };
    // New message format for extended payloads > 4GB
    // https://github.com/bitcoin-sv/bitcoin-sv/releases/tag/v1.0.10
    const buf = br.read(12);
    let pos = buf.length;
    while (buf[pos - 1] === 0) {
      pos--;
    }
    command = buf.slice(0, pos).toString();
    const ext_length = br.readUInt64LEBI();
    assertPayloadSize(command, ext_length);
    const sizePayload = Number(ext_length);
    if (buffer.length < HEADER_EXTMSG_SIZE + sizePayload) {
      return {
        command,
        payload: buffer.subarray(HEADER_EXTMSG_SIZE),
        sizePayload,
        needed: HEADER_EXTMSG_SIZE + sizePayload,
      };
    }
    payload = br.read(sizePayload);
  } else {
    assertPayloadSize(command, length);
    if (buffer.length < HEADER_SIZE + length) {
      return {
        command,
        payload: buffer.subarray(HEADER_SIZE),
        sizePayload: length,
        needed: HEADER_SIZE + length,
      };
    }
    payload = br.read(length);

    const hash = Hash.sha256sha256(payload).slice(0, 4);
    if (Buffer.compare(checksum, hash) !== 0) {
      throw new Error(`Invalid checksum`);
    }
  }

  return {
    command,
    payload,
    sizePayload: payload.length,
    end: br.pos,
    needed: 0,
  };
}

const Message = {
  read,
  write,
};

export default Message;
