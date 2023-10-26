import EventEmitter from "events";
import Net from "net";
import Crypto from "crypto";
import * as bsvMin from "bsv-minimal";
import {
  Message,
  Headers,
  Inv,
  Version,
  GetData,
  Reject,
  Address,
} from "./messages";
import { NetAddress } from "./messages/address";
import { MAGIC_NUMS, MAX_PER_MSG, SEGWIT, VERSIONS } from "./config";
import { GetHeadersOptions } from "./messages/headers";
import { VersionOptions } from "./messages/version";
import CustomEvents from "./events";
import { PeerEmitter } from "./types/PeerEmitter";

export interface PeerOptions {
  node: string;
  port?: number;
  ticker: string;
  validate?: boolean;
  autoReconnect?: boolean;
  autoReconnectWait?: number;
  disableExtmsg?: boolean;
  segwit?: boolean;
  DEBUG_LOG?: boolean;
  magic?: Buffer /** 4 byte Buffer */;
  version?: number;
  user_agent?: string;
  start_height?: number;
  mempoolTxs?: boolean;
  blockByteBuffer?: number;
}

export type GetBlockReturn = {
  ticker: string;
  blockHash: Buffer;
  header: bsvMin.Header;
  height?: number;
  size: number;
  startDate: number;
  block?: bsvMin.Block;
};

export default class Peer extends (EventEmitter as new () => PeerEmitter) {
  node: string;
  port: number;
  ticker: string;
  magic: Buffer;
  version: number;
  user_agent?: string;
  segwit?: boolean;
  start_height?: number;
  mempoolTxs: boolean;
  validate: boolean;
  autoReconnect: boolean;
  autoReconnectWait: number;
  disableExtmsg: boolean;
  connected: boolean;
  listenTxs?: (txids: Buffer[]) => Promise<Buffer[]> | Buffer[];
  listenBlocks?: (hashes: Buffer[]) => Promise<Buffer[]> | Buffer[];
  extmsg: boolean;
  disconnects: number;
  timeoutConnect: number;
  DEBUG_LOG: boolean;
  emitter: CustomEvents;
  buffers: {
    msgBuffer: bsvMin.utils.BufferChunksReader;
    msgBytesNeeded: number;
    blockDl:
      | {
          obj: bsvMin.Block;
          buffer: bsvMin.utils.BufferChunksReader;
          size: number;
          date: number;
          started: boolean;
        }
      | undefined;
  };
  socket?: Net.Socket | null;
  connectOptions?: VersionOptions;
  promiseConnect?: any;
  blockByteBuffer: number;

  constructor({
    node,
    port,
    ticker = "BSV",
    validate = true,
    autoReconnect = true,
    autoReconnectWait = 1000 * 2, // 2 seconds
    segwit = SEGWIT[ticker] || SEGWIT.DEFAULT,
    disableExtmsg = false,
    DEBUG_LOG = false,
    blockByteBuffer = 100000000, // Number of bytes of block data before processing. 100MB recommended. 0 for disabled
    magic = MAGIC_NUMS[ticker] || MAGIC_NUMS.DEFAULT,
    version = VERSIONS[ticker] || VERSIONS.DEFAULT,
    user_agent,
    start_height = 0,
    mempoolTxs = true,
  }: PeerOptions) {
    super();
    this.setMaxListeners(0);
    this.magic = magic;
    this.version = version;
    this.user_agent = user_agent;
    this.start_height = start_height;
    this.mempoolTxs = mempoolTxs;
    this.segwit = segwit;
    this.blockByteBuffer = blockByteBuffer;

    this.port = port || 8333;
    if (!port && node.split(":").length > 1) {
      const split = node.split(":");
      const portNum = parseInt(split[split.length - 1]);
      if (portNum > 0) this.port = portNum;
    }
    this.node = node;
    if (node.split(":").length === 2) {
      this.node = node.split(":")[0];
    } else if (node.includes("[") && node.split("]").length === 2) {
      // ipv6 formated with port https://en.wikipedia.org/wiki/IPv6#Addressing
      this.node = node.replace("[", "").split("]")[0];
    }

    this.ticker = ticker;
    this.validate = validate;
    this.autoReconnect = autoReconnect;
    this.autoReconnectWait = autoReconnectWait;
    this.disableExtmsg = disableExtmsg;
    this.connected = false;
    this.extmsg = false;
    this.disconnects = 0;
    this.timeoutConnect = 1000 * 30; // 30 seconds
    this.DEBUG_LOG = DEBUG_LOG;
    this.emitter = new CustomEvents();
    this.buffers = {
      msgBuffer: new bsvMin.utils.BufferChunksReader(Buffer.from([])),
      msgBytesNeeded: 0,
      blockDl: undefined,
    };
  }

  sendMessage(command: string, payload: Buffer | null, force = false) {
    if (!this.connected && !force) throw Error(`Not connected`);
    const { magic, extmsg } = this;
    const serialized = Message.write({
      command,
      payload,
      magic,
      extmsg,
    });
    if (!this.socket) throw Error("Socket not connected");
    this.socket.write(serialized);
    this.DEBUG_LOG &&
      console.log(
        `bsv-p2p: Sent message ${command} ${
          payload ? payload.length : "0"
        } bytes`
      );
  }

  readMessage(buffer: Buffer) {
    const {
      node,
      port,
      magic,
      buffers,
      ticker,
      validate,
      listenTxs,
      listenBlocks,
      extmsg,
    } = this;
    const message = Message.read({ buffer, magic, extmsg });
    const { command, payload, end, needed, sizePayload } = message;
    buffers.msgBytesNeeded = needed;

    if (command === "block" && !buffers.blockDl) {
      if (payload.length > 0) {
        const obj = new bsvMin.Block({ validate });
        obj.addBufferChunk(payload);
        if (obj.txRead >= 1) {
          buffers.blockDl = {
            obj: new bsvMin.Block({ validate }),
            size: sizePayload,
            buffer: new bsvMin.utils.BufferChunksReader(payload),
            date: +new Date(),
            started: true,
          };
        } else {
          buffers.msgBytesNeeded = 1;
        }
      } else {
        buffers.msgBytesNeeded = 1;
      }
      if (!buffers.msgBytesNeeded) return;
    }
    if (buffers.msgBytesNeeded) return;
    const remainingBuffer = buffer.subarray(end);
    buffers.msgBuffer = new bsvMin.utils.BufferChunksReader(remainingBuffer);
    buffers.msgBytesNeeded = 0;

    this.DEBUG_LOG &&
      command !== "inv" &&
      console.log(
        `bsv-p2p: Received message`,
        command,
        payload && `${payload.length} bytes`
      );
    if (command === "ping") {
      this.sendMessage("pong", payload);
      this.emit("ping", { ticker, node, port });
    } else if (command === "pong") {
      const nonce = payload.toString("hex");
      this.emitter.emit(`pong_${nonce}`);
      this.emit("pong", { ticker, node, port, nonce });
    } else if (command === "headers") {
      const { headers, txs } = Headers.parseHeaders(payload);
      this.DEBUG_LOG &&
        console.log(`bsv-p2p: Received ${headers.length} headers`);
      this.emitter.emit("headers", headers);
      this.emit(`headers`, { ticker, node, port, headers, txs });
    } else if (command === "version") {
      this.sendMessage("verack", null, true);
      const version = Version.read(payload);
      this.DEBUG_LOG && console.log(`bsv-p2p: version`, version);
      if (!this.disableExtmsg) this.extmsg = version.version >= 70016; // Enable/disable extension messages based on node version
      this.emitter.emit("version", { version });
      this.emit("version", { ticker, node, port, version });
    } else if (command === "verack") {
      this.DEBUG_LOG && console.log(`bsv-p2p: verack`);
      this.emitter.emit("verack");
    } else if (command === "inv") {
      const msg = Inv.read(payload);
      this.DEBUG_LOG &&
        console.log(
          `bsv-p2p: inv`,
          (Object.keys(msg) as (keyof typeof msg)[])
            .filter((k) => msg[k].length > 0)
            .map((k) => `${k}: ${msg[k].length}`)
            .join(", ")
        );
      this.emit("inv", msg);
      const { blocks, txs } = msg;
      if (blocks.length > 0) {
        this.emit("block_hashes", { ticker, node, port, hashes: blocks });
      }
      if (listenTxs && txs.length > 0) {
        try {
          const results = listenTxs(txs);
          if (results instanceof Promise) {
            results
              .then((txids: Buffer[]) => this.getTxs(txids))
              .catch((err: any) => {
                this.DEBUG_LOG &&
                  console.error(
                    `bsv-p2p: fetchMempoolTxs threw error: ${err.message}`
                  );
              });
          } else {
            this.getTxs(results);
          }
        } catch (err: any) {
          this.DEBUG_LOG &&
            console.error(
              `bsv-p2p: fetchMempoolTxs threw error: ${err.message}`
            );
        }
      }
      if (listenBlocks && blocks.length > 0) {
        try {
          const results = listenBlocks(blocks);
          if (results instanceof Promise) {
            results
              .then((hashes: Buffer[]) => this.getBlocks(hashes))
              .catch((err: any) => {
                this.DEBUG_LOG &&
                  console.error(
                    `bsv-p2p: fetchNewBlocks threw error: ${err.message}`
                  );
              });
          } else {
            this.getBlocks(results);
          }
        } catch (err: any) {
          this.DEBUG_LOG &&
            console.error(
              `bsv-p2p: fetchNewBlocks threw error: ${err.message}`
            );
        }
      }
    } else if (command === "block") {
      // Processed in readMessage function
    } else if (command === "tx") {
      const tx = bsvMin.Transaction.fromBuffer(payload);
      this.DEBUG_LOG && console.log(`bsv-p2p: tx`, tx);
      this.emit("tx_mempool", { ticker, node, port, tx });
    } else if (command === "notfound") {
      const notfound = Inv.read(payload);
      this.DEBUG_LOG && console.log("bsv-p2p: notfound", notfound);
      notfound.blocks.map((hash) =>
        this.emitter.emit(
          `notfound_block_${hash.toString("hex")}`,
          "Block not found"
        )
      );
      this.emit(`notfound`, notfound);
    } else if (command === "alert") {
      this.DEBUG_LOG && console.warn(`bsv-p2p: alert ${payload.toString()}`);
      this.emit(`alert`, { ticker, node, port, payload });
    } else if (command === "getdata") {
      const msg = GetData.read(payload);
      msg.txs.map((hash) => {
        this.emitter.emit(`getdata_tx_${hash.toString("hex")}`);
      });
      this.emit(`getdata`, msg);
    } else if (command === "reject") {
      const msg = Reject.read(payload);
      this.DEBUG_LOG && console.log(`bsv-p2p: reject`, msg);
      if (msg.data)
        this.emitter.emit(`reject_${msg.data.toString("hex")}`, msg.reason);
      this.emit(`reject`, msg);
    } else if (command === "addr") {
      const addrs = Address.readAddr(payload);
      this.DEBUG_LOG && console.log(`bsv-p2p: addr`, addrs);
      this.emitter.emit("addr", { ticker, node, port, addrs });
      this.emit("addr", { ticker, node, port, addrs });
    } else if (command === "getheaders") {
      this.DEBUG_LOG && console.log(`bsv-p2p: getheaders`);
      this.emit(`getheaders`, { ticker, node, port });
    } else if (command === "sendcmpct") {
      this.DEBUG_LOG &&
        console.log(`bsv-p2p: sendcmpct ${payload.toString("hex")}`);
      this.emit(`sendcmpct`, { ticker, node, port, payload });
    } else if (command === "sendheaders") {
      this.DEBUG_LOG && console.log(`bsv-p2p: sendheaders`);
      this.emit(`sendheaders`, { ticker, node, port, payload });
    } else {
      this.DEBUG_LOG &&
        console.log(
          `bsv-p2p: Unknown command ${command}, ${payload?.toString("hex")} ${
            payload?.length
          } bytes`
        );
      this.emit(`unknown_msg`, { ticker, node, port, command, payload });
    }
    this.emit("message", { ticker, node, port, command, payload });

    if (remainingBuffer.length > 0) {
      this.readMessage(remainingBuffer);
    }
  }

  connect(options = this.connectOptions) {
    if (!this.promiseConnect) {
      this.promiseConnect = new Promise<void>((resolve, reject) => {
        this.connectOptions = options;
        this.socket = new Net.Socket();
        const {
          socket,
          buffers,
          ticker,
          version,
          user_agent,
          start_height,
          mempoolTxs,
          node,
          port,
        } = this;
        this.DEBUG_LOG &&
          console.log(`bsv-p2p: Connecting to ${node} on port ${port}`);
        const timeout = setTimeout(() => {
          this.disconnect(this.autoReconnect);
          reject(Error(`timeout`));
        }, this.timeoutConnect);
        socket.on("connect", () => {
          this.DEBUG_LOG &&
            console.log(`bsv-p2p: Connected to ${node} on port ${port}`);
          const payload = Version.write({
            ticker,
            version,
            user_agent,
            start_height,
            mempoolTxs,
            segwit: this.segwit,
            options,
          });
          this.sendMessage("version", payload, true);
          this.emit("connect", { ticker, node, port });
        });
        socket.on("error", (error) => {
          this.DEBUG_LOG && console.error(`bsv-p2p: Socket error`, error);
          this.emit("error_socket", { ticker, node, port, error });
          this.disconnect(this.autoReconnect);
          clearTimeout(timeout);
          reject(Error(`disconnected (error)`));
        });
        socket.on("end", () => {
          this.DEBUG_LOG &&
            console.warn(`bsv-p2p: Socket disconnected ${node}`);
          this.disconnect(this.autoReconnect);
          clearTimeout(timeout);
          reject(Error(`disconnected (end)`));
        });
        socket.on("data", (data: Buffer) => {
          // this.DEBUG_LOG && console.log(`bsv-p2p: data`, data.length);
          try {
            if (buffers.blockDl?.obj.header) {
              this.emitter.resetTimeout(
                `block_${buffers.blockDl.obj.getHash().toString("hex")}`,
                30
              ); // Extend getBlock timeout another 30 seconds
            }

            if (!buffers.blockDl) {
              buffers.msgBuffer.append(data);
              if (buffers.msgBuffer.length >= buffers.msgBytesNeeded) {
                buffers.msgBuffer.rewind(buffers.msgBuffer.pos);
                const buf = buffers.msgBuffer.readAll();
                this.readMessage(buf);
              }
            }
            if (buffers.blockDl) {
              if (buffers.blockDl.started) {
                buffers.blockDl.started = false;
              } else {
                buffers.blockDl.buffer.append(data);
              }
              const started = buffers.blockDl.buffer.pos === 0;
              const finished =
                buffers.blockDl.buffer.length >= buffers.blockDl.size;

              if (
                !finished &&
                buffers.blockDl.buffer.length - buffers.blockDl.buffer.pos <
                  this.blockByteBuffer
              ) {
                // Wait until we have enough bytes to process next chunk
                return;
              }

              const readBytes = finished
                ? buffers.blockDl.size - buffers.blockDl.buffer.pos
                : buffers.blockDl.buffer.length - buffers.blockDl.buffer.pos;
              const chunk = buffers.blockDl.buffer.read(readBytes);
              buffers.blockDl.buffer.trim(); // Clear memory of earlier block data

              const block = buffers.blockDl.obj;
              let blockstream: bsvMin.BlockStream | undefined;
              if (
                started ||
                this.validate ||
                this.listenerCount("tx_block") > 0
              ) {
                blockstream = block.addBufferChunk(chunk);
              }

              const header = block.header;
              if (!header) throw Error(`Missing header`);
              const txCount = block.txCount;
              if (!txCount) throw Error(`Missing txCount`);
              const blockHash = block.getHash();
              const height = block.height;
              const blockSize = buffers.blockDl.size;
              const startDate = buffers.blockDl.date;

              this.emit("block_chunk", {
                node,
                port,
                ticker,
                header,
                blockHash,
                chunk,
                started,
                finished,
                blockSize,
                height,
                startDate,
                txCount,
              });

              if (blockstream) {
                this.emit("tx_block", {
                  node,
                  port,
                  ticker,
                  header,
                  blockHash,
                  started,
                  finished,
                  blockSize,
                  height,
                  startDate,
                  txs: blockstream.txs,
                  txCount,
                });
              }

              if (finished) {
                this.emitter.emit(`block_${blockHash.toString("hex")}`, {
                  ticker,
                  blockHash,
                  block,
                  header,
                  height,
                  blockSize,
                  startDate,
                });
                this.emit("block", {
                  blockHash,
                  block,
                  header,
                  ticker,
                  node,
                  port,
                  blockSize,
                  height,
                  startDate,
                  txCount,
                });

                const buf = buffers.blockDl.buffer.readAll();
                buffers.msgBuffer = new bsvMin.utils.BufferChunksReader(buf);
                buffers.msgBytesNeeded = 0;
                buffers.blockDl = undefined;
              }
            }
          } catch (error: any) {
            buffers.msgBuffer.rewind(buffers.msgBuffer.pos);
            const buffer = buffers.msgBuffer.readAll();
            this.DEBUG_LOG &&
              console.error(
                `bsv-p2p: on data error. Disconnecting. buffer: ${buffer.toString(
                  "hex"
                )}`,
                error
              );
            const { magic, extmsg } = this;
            this.emit("error_message", {
              ticker,
              node,
              port,
              error,
              magic,
              extmsg,
              buffer,
            });
            this.disconnect(this.autoReconnect); // TODO: Recover!
          }
        });
        let connectVrack = false;
        let connectVersion = false;
        const isConnected = () => {
          if (connectVrack && connectVersion) {
            clearTimeout(timeout);
            this.connected = true;
            resolve();
            this.emit(`connected`, { ticker, node, port });
          }
        };
        this.emitter.once("verack", () => {
          connectVrack = true;
          isConnected();
        });
        this.emitter.once("version", ({ version }) => {
          if (this.segwit && !version.segwit) {
            this.disconnect(false);
            clearTimeout(timeout);
            reject(Error(`peer does not support segwit`));
          } else {
            connectVersion = true;
            isConnected();
          }
        });

        socket.connect(port, node);
      });
    }
    return this.promiseConnect;
  }

  disconnect(autoReconnect = false) {
    this.autoReconnect = !!autoReconnect;
    if (this.socket) {
      this.DEBUG_LOG && console.warn(`bsv-p2p: Disconnected from ${this.node}`);
      this.socket.destroy();
      this.socket = null;
      this.connected = false;
      this.disconnects++;
      this.buffers = {
        msgBuffer: new bsvMin.utils.BufferChunksReader(Buffer.from([])),
        msgBytesNeeded: 0,
        blockDl: undefined,
      };

      delete this.promiseConnect;
      this.emitter.removeAllListeners("disconnected");

      const { ticker, node, port, disconnects } = this;
      this.emit("disconnected", { ticker, node, port, disconnects });

      if (autoReconnect && typeof this.autoReconnectWait === "number") {
        setTimeout(
          () => this.connect().catch(() => {}),
          this.autoReconnectWait
        ); // Wait before reconnecting
      }
    }
  }

  async getHeaders({
    from,
    to,
    timeoutSeconds = 60 * 1,
  }: {
    from?: GetHeadersOptions["from"];
    to?: GetHeadersOptions["to"];
    timeoutSeconds?: number;
  }) {
    const { version } = this;
    const payload = Headers.getheaders({ from, to, version });
    this.sendMessage("getheaders", payload);
    const headers: bsvMin.Header[] = await this.emitter.wait(
      "headers",
      null,
      timeoutSeconds
    );
    return headers;
  }

  getMempool() {
    this.sendMessage("mempool", null);
  }

  async getBlock(
    hash: Buffer | string,
    timeoutSeconds?: number
  ): Promise<GetBlockReturn> {
    if (Buffer.isBuffer(hash)) {
      this.getBlocks([hash]);
      hash = hash.toString("hex");
    } else {
      this.getBlocks([Buffer.from(hash, "hex")]);
    }
    if (!timeoutSeconds) timeoutSeconds = 30;
    const results: GetBlockReturn = await this.emitter.wait(
      `block_${hash}`,
      [`notfound_block_${hash}`, `reject_${hash}`],
      timeoutSeconds
    );
    return results;
  }

  getBlocks(blocks: Buffer[]) {
    // blocks is an array of 32 byte Buffer block hashes
    if (this.segwit) {
      const payload = GetData.write({ witness_blocks: blocks });
      this.sendMessage("getdata", payload);
    } else {
      const payload = GetData.write({ blocks });
      this.sendMessage("getdata", payload);
    }
  }

  async broadcastTx(
    transaction: bsvMin.Transaction,
    timeoutSeconds: number = 60 * 1
  ) {
    const [result] = await this.broadcastTxs([transaction], timeoutSeconds);
    if (result.status === "rejected") {
      throw Error(result.reason);
    } else {
      return result.value;
    }
  }

  async broadcastTxs(
    transactions: bsvMin.Transaction[],
    timeoutSeconds: number = 60 * 5
  ) {
    if (transactions.length > MAX_PER_MSG)
      throw Error(`Too many transactions (${MAX_PER_MSG} max)`);

    const txs = transactions.map((t) => t.getHash());
    const payload = Inv.write({ txs });
    this.sendMessage("inv", payload);
    const results = await Promise.allSettled(
      transactions.map(async (tx) => {
        await this.emitter.wait(
          `getdata_tx_${tx.getTxid()}`,
          `reject_${tx.getTxid()}`,
          timeoutSeconds
        );
        this.sendMessage("tx", tx.toBuffer());
      })
    );
    return results;
  }
  getTxs(txs: Buffer[]) {
    if (txs.length === 0) return;
    if (this.segwit) {
      const payload = GetData.write({ witness_txs: txs });
      this.sendMessage("getdata", payload);
    } else {
      const payload = GetData.write({ txs });
      this.sendMessage("getdata", payload);
    }
  }

  async getAddr(timeoutSeconds: number = 60 * 2) {
    // 2 minute default timeout
    this.sendMessage("getaddr", null);
    const result: {
      ticker: string;
      node: string;
      port: number;
      addrs: NetAddress[];
    } = await this.emitter.wait("addr", null, timeoutSeconds);
    return result;
  }

  async ping(timeoutSeconds: number = 30) {
    // 30 second default timeout
    const nonce = Crypto.randomBytes(8);
    const id = nonce.toString("hex");
    const date = +new Date();
    this.sendMessage("ping", nonce);
    await this.emitter.wait(`pong_${id}`, null, timeoutSeconds);
    return +new Date() - date;
  }

  fetchMempoolTxs(
    filterTxids: (txids: Buffer[]) => Promise<Buffer[]> | Buffer[]
  ) {
    if (!this.mempoolTxs) throw Error(`mempoolTxs was not set`);
    // Array of announced 32 byte txids from mempool. Return a filtered txid array of the txs you want to download.
    this.listenTxs = filterTxids;
  }

  fetchNewBlocks(
    filterBlocks: (hashes: Buffer[]) => Promise<Buffer[]> | Buffer[]
  ) {
    // Array of announced 32 byte block hashes. Return a filtered block array of the blocks you want to download.
    this.listenBlocks = filterBlocks;
  }
}
