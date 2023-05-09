import { Block, Header, Transaction } from "bsv-minimal";
import TypedEventEmitter from "./TypedEventEmitter";
import { GetData, Inv, Reject, Version } from "../messages";
import { NetAddress } from "../messages/address";

export type PeerEmitter = TypedEventEmitter<{
  block_chunk: ({
    node,
    port,
    num,
    started,
    finished,
    transactions,
    header,
    ticker,
    chunk,
    blockHash,
    height,
    size,
    txCount,
    startDate,
  }: {
    node: string;
    port: number;
    num: number;
    started: boolean;
    finished: boolean;
    transactions: [number, Transaction, number, number][];
    header: Header;
    ticker: string;
    chunk: Buffer;
    blockHash: Buffer;
    height?: number;
    size: number;
    txCount: number;
    startDate: number;
  }) => void;

  transactions: ({
    node,
    port,
    started,
    finished,
    transactions,
    header,
    ticker,
    height,
    size,
    txCount,
    startDate,
  }: {
    node: string;
    port: number;
    started?: boolean;
    finished?: boolean;
    transactions: [number, Transaction, number, number][];
    header?: Header;
    ticker: string;
    height?: number;
    size?: number;
    txCount?: number;
    startDate?: number;
    bytesRemaining?: number;
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
    block,
    ticker,
    node,
    port,
  }: {
    block: Block;
    ticker: string;
    node: string;
    port: number;
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
