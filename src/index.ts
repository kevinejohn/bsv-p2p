import EventEmitter from "events";
import Net from "net";
import Crypto from "crypto";
import { Block, Transaction } from "bsv-minimal";
import {
  Message,
  Headers,
  Inv,
  Version,
  GetData,
  Reject,
  Address,
} from "./messages";
import { MAGIC_NUMS, MAX_PER_MSG, VERSIONS } from "./config";
import { GetHeadersOptions } from "./messages/headers";

export interface PeerOptions {
  node: string;
  ticker: string;
  stream?: boolean;
  validate?: boolean;
  autoReconnect?: boolean;
  disableExtmsg?: boolean;
  DEBUG_LOG?: boolean;
  /** 4 byte Buffer */
  magic?: Buffer;
  version?: number;
  user_agent?: string;
  mempoolTxs?: boolean;
}

export default class Peer extends EventEmitter {
  node: string;
  ticker: string;
  magic: Buffer;
  version: number;
  user_agent?: string;
  mempoolTxs: boolean;
  stream: boolean;
  validate: boolean;
  autoReconnect: boolean;
  disableExtmsg: boolean;
  connected: boolean;
  listenTxs: boolean | ((txs: Buffer[]) => Promise<Buffer[]>);
  listenBlocks: boolean;
  extmsg: boolean;
  disconnects: number;
  timeoutConnect: number;
  timeoutHeaders: number;
  DEBUG_LOG: boolean;
  promises: Record<string, { reject: (reason?: any) => void }>;
  internalEmitter: EventEmitter;
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
  promiseGetHeaders?: Promise<Buffer[]>;

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
    mempoolTxs = true,
  }: PeerOptions) {
    super();
    this.setMaxListeners(0);
    this.magic = magic;
    this.version = version;
    this.user_agent = user_agent;
    this.mempoolTxs = mempoolTxs;

    this.node = node;
    this.ticker = ticker;
    this.stream = stream;
    this.validate = validate;
    this.autoReconnect = autoReconnect;
    this.disableExtmsg = disableExtmsg;
    this.connected = false;
    this.listenTxs = false;
    this.listenBlocks = false;
    this.extmsg = false;
    this.disconnects = 0;
    this.timeoutConnect = 1000 * 30; // 30 seconds
    this.timeoutHeaders = 1000 * 30; // 30 seconds
    this.DEBUG_LOG = DEBUG_LOG;
    this.promises = {};
    this.internalEmitter = new EventEmitter();
    this.internalEmitter.setMaxListeners(0);
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

  streamBlock(chunk: Buffer, start = false) {
    const { buffers, ticker, validate, node } = this;
    let stream;
    if (start) {
      buffers.chunkNum = 0;
      buffers.downloadingBlock = true;
      buffers.block = new Block({ validate });
      stream = buffers.block.addBufferChunk(chunk);
    } else {
      stream = buffers.block.addBufferChunk(chunk);
    }
    if (!stream.header) return;
    const {
      finished,
      started,
      transactions,
      bytesRemaining,
      header,
      height,
      size,
      txCount,
    } = stream;

    this.emit("transactions", { ...stream, node, ticker });
    const blockHash = header.getHash();
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
    });
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

      this.internalEmitter.emit(`block_${blockHash.toString("hex")}`, {
        ticker,
        blockHash,
        header,
        height,
        size,
      });
    }
  }

  async readMessage(buffer: Buffer): Promise<void> {
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
    try {
      const message = Message.read({ buffer, magic, extmsg });
      const { command, payload, end, needed } = message;
      buffers.needed = needed;

      if (stream && command === "block") {
        this.streamBlock(payload, true);
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
        this.internalEmitter.emit(`pong_${nonce}`);
        this.emit("pong", { ticker, node });
      } else if (command === "headers") {
        const { headers, txs } = Headers.parseHeaders(payload);
        this.DEBUG_LOG &&
          console.log(`bsv-p2p: Received ${headers.length} headers`);
        this.internalEmitter.emit("headers", headers);
        this.emit(`headers`, { ticker, node, headers, txs });
      } else if (command === "version") {
        this.sendMessage("verack", null, true);
        const version = Version.read(payload);
        this.DEBUG_LOG && console.log(`bsv-p2p: version`, version);
        if (!this.disableExtmsg) this.extmsg = version.version >= 70016; // Enable/disable extension messages based on node version
        this.internalEmitter.emit("version");
        this.emit("version", { ticker, node, version });
      } else if (command === "verack") {
        this.DEBUG_LOG && console.log(`bsv-p2p: verack`);
        this.internalEmitter.emit("verack");
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
            if (typeof listenTxs === "function") {
              this.getTxs(await listenTxs(txs));
            } else {
              this.getTxs(txs);
            }
          }
          if (listenBlocks && blocks.length > 0) {
            this.getBlocks(blocks);
          }
        }
      } else if (command === "block") {
        if (!stream) {
          const block = Block.fromBuffer(payload);
          block.options = { validate };
          this.DEBUG_LOG &&
            console.log(`bsv-p2p: block`, block.getHash().toString("hex"));
          if (this.listenerCount("transactions") > 0) {
            await block.getTransactionsAsync((params) => {
              this.emit("transactions", { ...params, ticker, node });
            });
          }
          const hash = block.getHash().toString("hex");
          this.internalEmitter.emit(`block_${hash}`, block);
          this.emit("block", { block, ticker, node });
        }
      } else if (command === "tx") {
        const transaction = Transaction.fromBuffer(payload);
        this.DEBUG_LOG && console.log(`bsv-p2p: tx`, transaction);
        this.emit("transactions", {
          ticker,
          node,
          finished: true,
          transactions: [[0, transaction]],
        });
      } else if (command === "notfound") {
        const notfound = Inv.read(payload);
        this.DEBUG_LOG && console.log("bsv-p2p: notfound", notfound);
        notfound.blocks.map((hash) =>
          this.internalEmitter.emit(`notfound_block_${hash.toString("hex")}`)
        );
        this.emit(`notfound`, notfound);
      } else if (command === "alert") {
        this.DEBUG_LOG && console.log(`bsv-p2p: alert ${payload.toString()}`);
        this.emit(`alert`, { ticker, node, payload });
      } else if (command === "getdata") {
        const msg = GetData.read(payload);
        msg.txs.map((hash) => {
          this.internalEmitter.emit(`getdata_tx_${hash.toString("hex")}`);
        });
        this.emit(`getdata`, msg);
      } else if (command === "reject") {
        const msg = Reject.read(payload);
        this.DEBUG_LOG && console.log(`bsv-p2p: reject`, msg);
        this.emit(`reject`, msg);
        // this.internalEmitter.emit(`reject`, msg);
      } else if (command === "addr") {
        const addrs = Address.readAddr(payload);
        this.DEBUG_LOG && console.log(`bsv-p2p: addr`, addrs);
        this.emit("addr", { ticker, node, addr: addrs, addrs });
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
        return this.readMessage(remainingBuffer);
      }
    } catch (error) {
      this.DEBUG_LOG && console.log(`bsv-p2p: ERROR`, error);
      this.emit("error_message", { ticker, node, error });
      this.disconnect(this.autoReconnect); // TODO: Recover!
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
            mempoolTxs,
            options,
          });
          this.sendMessage("version", payload, true);
          this.emit("connect", { ticker, node });
        });
        socket.on("error", (error: any) => {
          this.DEBUG_LOG && console.log(`bsv-p2p: Socket error`, error);
          this.emit("error_socket", { ticker, node, error });
          this.disconnect(this.autoReconnect);
          clearTimeout(timeout);
          reject(`disconnected`);
        });
        socket.on("end", () => {
          this.DEBUG_LOG && console.log(`bsv-p2p: Socket disconnected ${node}`);
          this.disconnect(this.autoReconnect);
          clearTimeout(timeout);
          reject(`disconnected`);
        });
        socket.on("data", (data: any) => {
          // this.DEBUG_LOG && console.log(`bsv-p2p: data`, data.toString('hex'))
          buffers.length += data.length;
          if (buffers.downloadingBlock) {
            this.streamBlock(data);
          } else {
            buffers.data.push(data);
          }

          if (buffers.length >= buffers.needed) {
            return this.readMessage(Buffer.concat(buffers.data));
          }
        });
        this.internalEmitter.once(`connected`, () => {
          clearTimeout(timeout);
          this.connected = true;
          resolve();
          this.emit(`connected`, { ticker, node });
        });
        let connectVrack = false,
          connectVersion = false;
        const isConnected = () => {
          if (connectVrack && connectVersion) {
            this.internalEmitter.emit(`connected`);
          }
        };
        this.internalEmitter.once("verack", () => {
          connectVrack = true;
          isConnected();
        });
        this.internalEmitter.once("version", () => {
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
      this.DEBUG_LOG && console.log(`bsv-p2p: Disconnected from ${this.node}`);
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

      delete this.promiseGetHeaders;
      delete this.promiseConnect;

      this.internalEmitter.removeAllListeners();
      Object.keys(this.promises).map((key) =>
        this.promises[key].reject(`disconnected`)
      );
      this.promises = {};

      const { ticker, node, disconnects } = this;
      this.emit("disconnected", { ticker, node, disconnects });

      if (autoReconnect) {
        setTimeout(() => this.connect().catch(() => {}), 2000); // Wait 2 seconds before reconnecting
      }
    }
  }
  getHeaders({
    from,
    to,
  }: {
    from: GetHeadersOptions["from"];
    to: GetHeadersOptions["to"];
  }) {
    if (!this.promiseGetHeaders) {
      this.promiseGetHeaders = new Promise((resolve, reject) => {
        try {
          const { version } = this;
          const payload = Headers.getheaders({ from, to, version });
          this.sendMessage("getheaders", payload);
          let timeout: NodeJS.Timeout;
          const onSuccess = (headers: any) => {
            clearTimeout(timeout);
            delete this.promiseGetHeaders;
            resolve(headers);
          };
          timeout = setTimeout(() => {
            delete this.promiseGetHeaders;
            this.internalEmitter.removeListener("headers", onSuccess);
            reject(Error(`timeout`));
          }, this.timeoutHeaders);
          this.internalEmitter.once("headers", onSuccess);
          this.promises.getHeaders = { reject };
        } catch (err) {
          delete this.promiseGetHeaders;
          reject(err);
        }
      });
    }
    return this.promiseGetHeaders;
  }
  getMempool() {
    this.sendMessage("mempool", null);
  }
  getBlock(hash: Buffer | string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (Buffer.isBuffer(hash)) {
          this.getBlocks([hash]);
          hash = hash.toString("hex");
        } else {
          this.getBlocks([Buffer.from(hash, "hex")]);
        }
        const onReject = () => reject(Error(`Not found`));
        this.internalEmitter.once(`notfound_block_${hash}`, onReject);
        this.internalEmitter.once(`block_${hash}`, (params) => {
          this.internalEmitter.removeListener(
            `notfound_block_${hash}`,
            onReject
          );
          resolve(params);
        });
        this.promises[hash] = { reject };
      } catch (err) {
        reject(err);
      }
    });
  }
  getBlocks(blocks: Buffer[]) {
    const payload = GetData.write({ blocks });
    this.sendMessage("getdata", payload);
  }
  broadcastTx(transaction: Transaction) {
    return this.broadcastTxs([transaction]);
  }
  broadcastTxs(transactions: Transaction[]) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (transactions.length > MAX_PER_MSG)
          return reject(Error(`Too many transactions (${MAX_PER_MSG} max)`));

        const txs = transactions.map((t) => t.getHash());
        const payload = Inv.write({ txs });
        let txid = "";
        for (const tx of transactions) {
          txid = tx.getTxid();
          this.internalEmitter.once(`getdata_tx_${txid}`, () => {
            delete this.promises[txid];
            this.sendMessage("tx", tx.toBuffer());
            resolve();
          });
        }

        this.sendMessage("inv", payload);
        this.promises[txid] = { reject };
      } catch (err) {
        reject(err);
      }
    });
  }
  getTxs(txs: Buffer[]) {
    if (txs.length === 0) return;
    const payload = GetData.write({ txs });
    this.sendMessage("getdata", payload);
  }

  getAddr() {
    this.sendMessage("getaddr", null);
  }
  ping() {
    return new Promise((resolve, reject) => {
      try {
        const nonce = Crypto.randomBytes(8);
        const id = nonce.toString("hex");
        const date = +new Date();
        this.sendMessage("ping", nonce);
        this.promises[id] = { reject };
        this.internalEmitter.once(`pong_${id}`, () => {
          delete this.promises[id];
          resolve(+new Date() - date);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  listenForTxs(listenTxs = true) {
    this.listenTxs = listenTxs;
  }
  listenForBlocks() {
    this.listenBlocks = true;
  }
}
