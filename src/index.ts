import EventEmitter from "events";
import Net from "net";
import Crypto from "crypto";
import { Block, BlockStream, Transaction, Header } from "bsv-minimal";
import {
  Message,
  Headers,
  Inv,
  Version,
  GetData,
  Reject,
  Address,
} from "./messages";
import { ReadAddress } from "./messages/address";
import { MAGIC_NUMS, MAX_PER_MSG, VERSIONS } from "./config";
import { GetHeadersOptions } from "./messages/headers";
import CustomEvents from "./events";

export interface PeerOptions {
  node: string;
  ticker: string;
  stream?: boolean;
  validate?: boolean;
  autoReconnect?: boolean;
  disableExtmsg?: boolean;
  DEBUG_LOG?: boolean;
  magic?: Buffer /** 4 byte Buffer */;
  version?: number;
  user_agent?: string;
  start_height?: number;
  mempoolTxs?: boolean;
}

export type GetBlockReturn = {
  ticker: string;
  blockHash: Buffer;
  header: Header;
  height?: number;
  size: number;
  startDate: number;
};

export default class Peer extends EventEmitter {
  node: string;
  ticker: string;
  magic: Buffer;
  version: number;
  user_agent?: string;
  start_height?: number;
  mempoolTxs: boolean;
  stream: boolean;
  validate: boolean;
  autoReconnect: boolean;
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
    data: Buffer[];
    needed: number;
    length: number;
    block: Block;
    chunkNum: number;
    downloadingBlock: boolean;
  };
  socket?: Net.Socket | null;
  connectOptions?: any;
  promiseConnect?: any;

  constructor({
    node,
    ticker = "BSV",
    stream = true,
    validate = true,
    autoReconnect = true,
    disableExtmsg = false,
    DEBUG_LOG = false,
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

    this.node = node;
    this.ticker = ticker;
    this.stream = stream;
    this.validate = validate;
    this.autoReconnect = autoReconnect;
    this.disableExtmsg = disableExtmsg;
    this.connected = false;
    this.extmsg = false;
    this.disconnects = 0;
    this.timeoutConnect = 1000 * 30; // 30 seconds
    this.DEBUG_LOG = DEBUG_LOG;
    this.emitter = new CustomEvents();
    this.buffers = {
      data: [],
      needed: 0,
      length: 0,
      chunkNum: 0,
      block: new Block({ validate }),
      downloadingBlock: false,
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

  streamBlock(chunk: Buffer) {
    const { buffers, ticker, validate, node } = this;
    const {
      finished,
      started,
      transactions,
      bytesRemaining,
      header,
      height,
      size,
      txCount,
      startDate,
    }: BlockStream = buffers.block.addBufferChunk(chunk);

    const blockHash = header.getHash();
    this.emitter.resetTimeout(`block_${blockHash.toString("hex")}`, 30); // Extend getBlock timeout another 30 seconds
    if (finished) {
      if (bytesRemaining > 0 && buffers.block.br) {
        const remaining = buffers.block.br.readAll();
        buffers.data = [remaining];
        buffers.length = remaining.length;
      } else {
        buffers.data = [];
        buffers.length = 0;
      }
      buffers.block = new Block({ validate });
      buffers.needed = 0;
      buffers.downloadingBlock = false;

      this.emitter.emit(`block_${blockHash.toString("hex")}`, {
        ticker,
        blockHash,
        header,
        height,
        size,
        startDate,
      });
    }
    this.emit("block_chunk", {
      node,
      num: buffers.chunkNum++,
      started,
      finished,
      transactions,
      header,
      ticker,
      chunk: finished
        ? chunk.subarray(0, chunk.length - bytesRemaining)
        : chunk,
      blockHash,
      height,
      size,
      txCount,
      startDate,
    });
    this.emit("transactions", {
      node,
      ticker,
      finished,
      started,
      transactions,
      bytesRemaining,
      header,
      height,
      size,
      txCount,
      startDate,
    });
  }

  readMessage(buffer: Buffer) {
    const {
      node,
      magic,
      buffers,
      ticker,
      stream,
      validate,
      listenTxs,
      listenBlocks,
      extmsg,
    } = this;
    const message = Message.read({ buffer, magic, extmsg });
    const { command, payload, end, needed } = message;
    buffers.needed = needed;

    if (stream && command === "block") {
      buffers.chunkNum = 0;
      buffers.downloadingBlock = true;
      buffers.block = new Block({ validate });
      if (payload.length > 0) {
        try {
          this.streamBlock(payload);
        } catch (err) {
          // Not enough data to parse block header and txCount. Wait for more.
        }
      }
    }
    if (needed) return;
    const remainingBuffer = buffer.subarray(end);
    buffers.data = [remainingBuffer];
    buffers.length = remainingBuffer.length;
    buffers.needed = 0;

    this.DEBUG_LOG &&
      command !== "inv" &&
      console.log(
        `bsv-p2p: Received message`,
        command,
        payload && `${payload.length} bytes`
      );
    if (command === "ping") {
      this.sendMessage("pong", payload);
      this.emit("ping", { ticker, node });
    } else if (command === "pong") {
      const nonce = payload.toString("hex");
      this.emitter.emit(`pong_${nonce}`);
      this.emit("pong", { ticker, node, nonce });
    } else if (command === "headers") {
      const { headers, txs } = Headers.parseHeaders(payload);
      this.DEBUG_LOG &&
        console.log(`bsv-p2p: Received ${headers.length} headers`);
      this.emitter.emit("headers", headers);
      this.emit(`headers`, { ticker, node, headers, txs });
    } else if (command === "version") {
      this.sendMessage("verack", null, true);
      const version = Version.read(payload);
      this.DEBUG_LOG && console.log(`bsv-p2p: version`, version);
      if (!this.disableExtmsg) this.extmsg = version.version >= 70016; // Enable/disable extension messages based on node version
      this.emitter.emit("version");
      this.emit("version", { ticker, node, version });
    } else if (command === "verack") {
      this.DEBUG_LOG && console.log(`bsv-p2p: verack`);
      this.emitter.emit("verack");
    } else if (command === "inv") {
      const msg: any = Inv.read(payload);
      this.DEBUG_LOG &&
        console.log(
          `bsv-p2p: inv`,
          Object.keys(msg)
            .filter((k: string) => msg[k].length > 0)
            .map((k: string) => `${k}: ${msg[k].length}`)
            .join(", ")
        );
      this.emit("inv", msg);
      const { blocks, txs } = msg;
      if (blocks.length > 0) {
        this.emit("block_hashes", { ticker, node, hashes: blocks });
      }
      if (this.listenerCount("transactions") > 0) {
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
            const results = listenBlocks(txs);
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
      }
    } else if (command === "block") {
      if (!stream) {
        const block = Block.fromBuffer(payload);
        block.options = { validate };
        this.DEBUG_LOG &&
          console.log(`bsv-p2p: block`, block.getHash().toString("hex"));
        if (this.listenerCount("transactions") > 0) {
          block.getTransactionsAsync((params) => {
            this.emit("transactions", { ...params, ticker, node });
          });
        }
        const blockHash = block.getHash();
        const { header, size } = block;
        const startDate = +new Date();
        let height: number | undefined;
        try {
          height = block.getHeight();
        } catch (err) {}
        this.emitter.emit(`block_${blockHash.toString("hex")}`, {
          ticker,
          blockHash: block.getHash(),
          header,
          height,
          size,
          startDate,
        });
        this.emit("block", { block, ticker, node });
      }
    } else if (command === "tx") {
      const transaction = Transaction.fromBuffer(payload);
      this.DEBUG_LOG && console.log(`bsv-p2p: tx`, transaction);
      this.emit("transactions", {
        ticker,
        node,
        finished: true,
        transactions: [[0, transaction, 0, transaction.length]],
      });
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
      this.emit(`alert`, { ticker, node, payload });
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
      this.emitter.emit("addr", { ticker, node, addrs });
      this.emit("addr", { ticker, node, addrs });
    } else if (command === "getheaders") {
      this.DEBUG_LOG && console.log(`bsv-p2p: getheaders`);
      this.emit(`getheaders`, { ticker, node });
    } else if (command === "sendcmpct") {
      this.DEBUG_LOG &&
        console.log(`bsv-p2p: sendcmpct ${payload.toString("hex")}`);
      this.emit(`sendcmpct`, { ticker, node, payload });
    } else if (command === "sendheaders") {
      this.DEBUG_LOG && console.log(`bsv-p2p: sendheaders`);
      this.emit(`sendheaders`, { ticker, node, payload });
    } else {
      this.DEBUG_LOG &&
        console.log(
          `bsv-p2p: Unknown command ${command}, ${payload?.toString("hex")} ${
            payload?.length
          } bytes`
        );
      this.emit(`unknown_msg`, { ticker, node, command, payload });
    }
    this.emit("message", { ticker, node, command, payload });

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
        } = this;
        const host = node.split(":")[0];
        const port = Number(node.split(":")[1]) || 8333;
        this.DEBUG_LOG && console.log(`bsv-p2p: Connecting to ${host}:${port}`);
        const timeout = setTimeout(
          () => reject(`timeout`),
          this.timeoutConnect
        );
        socket.on("connect", () => {
          this.DEBUG_LOG &&
            console.log(`bsv-p2p: Connected to ${host}:${port}`);
          const payload = Version.write({
            ticker,
            version,
            user_agent,
            start_height,
            mempoolTxs,
            options,
          });
          this.sendMessage("version", payload, true);
          this.emit("connect", { ticker, node });
        });
        socket.on("error", (error: any) => {
          this.DEBUG_LOG && console.error(`bsv-p2p: Socket error`, error);
          this.emit("error_socket", { ticker, node, error });
          this.disconnect(this.autoReconnect);
          clearTimeout(timeout);
          reject(`disconnected`);
        });
        socket.on("end", () => {
          this.DEBUG_LOG &&
            console.warn(`bsv-p2p: Socket disconnected ${node}`);
          this.disconnect(this.autoReconnect);
          clearTimeout(timeout);
          reject(`disconnected`);
        });
        socket.on("data", (data: any) => {
          // this.DEBUG_LOG && console.log(`bsv-p2p: data`, data.toString('hex'))
          try {
            if (buffers.downloadingBlock) {
              this.streamBlock(data);
            } else {
              buffers.length += data.length;
              buffers.data.push(data);
            }

            if (buffers.length >= buffers.needed) {
              this.readMessage(Buffer.concat(buffers.data));
            }
          } catch (error: any) {
            const buffer = Buffer.concat(buffers.data);
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
              error,
              magic,
              extmsg,
              buffer,
            });
            this.disconnect(this.autoReconnect); // TODO: Recover!
          }
        });
        this.emitter.once(`connected`, () => {
          clearTimeout(timeout);
          this.connected = true;
          resolve();
          this.emit(`connected`, { ticker, node });
        });
        let connectVrack = false;
        let connectVersion = false;
        const isConnected = () => {
          if (connectVrack && connectVersion) {
            this.emitter.emit(`connected`);
          }
        };
        this.emitter.once("verack", () => {
          connectVrack = true;
          isConnected();
        });
        this.emitter.once("version", () => {
          connectVersion = true;
          isConnected();
        });

        socket.connect(port, host);
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
        data: [],
        needed: 0,
        length: 0,
        chunkNum: 0,
        block: new Block({ validate: this.validate }),
        downloadingBlock: false,
      };

      delete this.promiseConnect;
      this.emitter.removeAllListeners("disconnected");

      const { ticker, node, disconnects } = this;
      this.emit("disconnected", { ticker, node, disconnects });

      if (autoReconnect) {
        setTimeout(() => this.connect().catch(() => {}), 2000); // Wait 2 seconds before reconnecting
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
    const headers: Header[] = await this.emitter.wait(
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
    if (!timeoutSeconds) {
      timeoutSeconds = this.stream ? 30 : 60 * 10; // Wait at least 30 seconds to start streaming block. 10 minutes otherwise
    }
    const results: GetBlockReturn = await this.emitter.wait(
      `block_${hash}`,
      [`notfound_block_${hash}`, `reject_${hash}`],
      timeoutSeconds
    );
    return results;
  }

  getBlocks(blocks: Buffer[]) {
    // blocks is an array of 32 byte Buffer block hashes
    const payload = GetData.write({ blocks });
    this.sendMessage("getdata", payload);
  }

  async broadcastTx(transaction: Transaction, timeoutSeconds: number = 60 * 1) {
    const [result] = await this.broadcastTxs([transaction], timeoutSeconds);
    if (result.status === "rejected") {
      throw Error(result.reason);
    } else {
      return result.value;
    }
  }

  async broadcastTxs(
    transactions: Transaction[],
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
    const payload = GetData.write({ txs });
    this.sendMessage("getdata", payload);
  }

  async getAddr(timeoutSeconds: number = 60 * 2) {
    // 2 minute default timeout
    this.sendMessage("getaddr", null);
    const result: { ticker: string; node: string; addrs: ReadAddress[] } =
      await this.emitter.wait("addr", null, timeoutSeconds);
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
