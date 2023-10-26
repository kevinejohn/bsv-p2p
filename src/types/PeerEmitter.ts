import { Block, Header, Transaction, TxIndex } from "bsv-minimal";
import TypedEventEmitter from "./TypedEventEmitter";
import { GetData, Inv, Reject, Version } from "../messages";
import { NetAddress } from "../messages/address";

export type PeerEmitter = TypedEventEmitter<{
  block_chunk: ({
    blockHash,
    header,
    chunk,
    node,
    port,
    ticker,
    started,
    finished,
    blockSize,
    height,
    startDate,
    txCount,
  }: {
    blockHash: Buffer;
    header: Header;
    chunk: Buffer;
    node: string;
    port: number;
    started: boolean;
    finished: boolean;
    ticker: string;
    blockSize: number;
    height?: number;
    startDate: number;
    txCount: number;
  }) => void;

  tx_mempool: ({
    node,
    port,
    ticker,
    tx,
  }: {
    node: string;
    port: number;
    ticker: string;
    tx: Transaction;
  }) => void;

  tx_block: ({
    node,
    port,
    ticker,
    header,
    blockHash,
    txs,
    started,
    finished,
    height,
    blockSize,
    startDate,
    txCount,
  }: {
    node: string;
    port: number;
    ticker: string;
    blockHash: Buffer;
    header: Header;
    txs: TxIndex[];
    started: boolean;
    finished: boolean;
    height?: number;
    blockSize: number;
    startDate: number;
    txCount: number;
  }) => void;

  ping: ({
    ticker,
    node,
    port,
  }: {
    ticker: string;
    node: string;
    port: number;
  }) => void;

  pong: ({
    ticker,
    node,
    port,
    nonce,
  }: {
    ticker: string;
    node: string;
    port: number;
    nonce: string;
  }) => void;

  headers: ({
    ticker,
    node,
    port,
    headers,
    txs,
  }: {
    ticker: string;
    node: string;
    port: number;
    headers: Header[];
    txs: number[];
  }) => void;

  version: ({
    ticker,
    node,
    port,
    version,
  }: {
    ticker: string;
    node: string;
    port: number;
    version: ReturnType<typeof Version.read>;
  }) => void;

  inv: (msg: ReturnType<typeof Inv.read>) => void;

  block_hashes: ({
    ticker,
    node,
    port,
    hashes,
  }: {
    ticker: string;
    node: string;
    port: number;
    hashes: Buffer[];
  }) => void;

  block: ({
    header,
    blockHash,
    block,
    ticker,
    node,
    port,
    blockSize,
    height,
    startDate,
    txCount,
  }: {
    header: Header;
    blockHash: Buffer;
    block: Block;
    ticker: string;
    node: string;
    port: number;
    blockSize: number;
    height?: number;
    startDate: number;
    txCount: number;
  }) => void;

  notfound: (msg: ReturnType<typeof Inv.read>) => void;

  alert: ({
    ticker,
    node,
    port,
    payload,
  }: {
    ticker: string;
    node: string;
    port: number;
    payload: Buffer;
  }) => void;

  getdata: (msg: ReturnType<typeof GetData.read>) => void;

  reject: (msg: ReturnType<typeof Reject.read>) => void;

  addr: ({
    ticker,
    node,
    port,
    addrs,
  }: {
    ticker: string;
    node: string;
    port: number;
    addrs: NetAddress[];
  }) => void;

  getheaders: ({
    ticker,
    node,
    port,
  }: {
    ticker: string;
    node: string;
    port: number;
  }) => void;

  sendcmpct: ({
    ticker,
    node,
    port,
    payload,
  }: {
    ticker: string;
    node: string;
    port: number;
    payload: Buffer;
  }) => void;

  sendheaders: ({
    ticker,
    node,
    port,
    payload,
  }: {
    ticker: string;
    node: string;
    port: number;
    payload: Buffer;
  }) => void;

  unknown_msg: ({
    ticker,
    node,
    port,
    payload,
    command,
  }: {
    ticker: string;
    node: string;
    port: number;
    payload: Buffer;
    command: string;
  }) => void;

  message: ({
    ticker,
    node,
    port,
    payload,
    command,
  }: {
    ticker: string;
    node: string;
    port: number;
    payload: Buffer;
    command: string;
  }) => void;

  connect: ({
    ticker,
    node,
    port,
  }: {
    ticker: string;
    node: string;
    port: number;
  }) => void;

  connected: ({
    ticker,
    node,
    port,
  }: {
    ticker: string;
    node: string;
    port: number;
  }) => void;

  disconnected: ({
    ticker,
    node,
    port,
    disconnects,
  }: {
    ticker: string;
    node: string;
    port: number;
    disconnects: number;
  }) => void;

  error_socket: ({
    ticker,
    node,
    port,
    error,
  }: {
    ticker: string;
    node: string;
    port: number;
    error: Error;
  }) => void;

  error_message: ({
    ticker,
    node,
    port,
    error,
    magic,
    extmsg,
    buffer,
  }: {
    ticker: string;
    node: string;
    port: number;
    error: Error;
    magic: Buffer;
    extmsg: boolean;
    buffer: Buffer;
  }) => void;
}>;
