[bsv-p2p](../README.md) / default

# Class: default

## Hierarchy

- `TypedEventEmitter`<{ `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }, `this`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [DEBUG\_LOG](default.md#debug_log)
- [autoReconnect](default.md#autoreconnect)
- [autoReconnectWait](default.md#autoreconnectwait)
- [buffers](default.md#buffers)
- [connectOptions](default.md#connectoptions)
- [connected](default.md#connected)
- [disableExtmsg](default.md#disableextmsg)
- [disconnects](default.md#disconnects)
- [emitter](default.md#emitter)
- [extmsg](default.md#extmsg)
- [listenBlocks](default.md#listenblocks)
- [listenTxs](default.md#listentxs)
- [magic](default.md#magic)
- [mempoolTxs](default.md#mempooltxs)
- [node](default.md#node)
- [port](default.md#port)
- [promiseConnect](default.md#promiseconnect)
- [segwit](default.md#segwit)
- [socket](default.md#socket)
- [start\_height](default.md#start_height)
- [stream](default.md#stream)
- [ticker](default.md#ticker)
- [timeoutConnect](default.md#timeoutconnect)
- [user\_agent](default.md#user_agent)
- [validate](default.md#validate)
- [version](default.md#version)

### Methods

- [addListener](default.md#addlistener)
- [broadcastTx](default.md#broadcasttx)
- [broadcastTxs](default.md#broadcasttxs)
- [connect](default.md#connect)
- [disconnect](default.md#disconnect)
- [emit](default.md#emit)
- [eventNames](default.md#eventnames)
- [fetchMempoolTxs](default.md#fetchmempooltxs)
- [fetchNewBlocks](default.md#fetchnewblocks)
- [getAddr](default.md#getaddr)
- [getBlock](default.md#getblock)
- [getBlocks](default.md#getblocks)
- [getHeaders](default.md#getheaders)
- [getMaxListeners](default.md#getmaxlisteners)
- [getMempool](default.md#getmempool)
- [getTxs](default.md#gettxs)
- [listenerCount](default.md#listenercount)
- [listeners](default.md#listeners)
- [off](default.md#off)
- [on](default.md#on)
- [once](default.md#once)
- [ping](default.md#ping)
- [prependListener](default.md#prependlistener)
- [prependOnceListener](default.md#prependoncelistener)
- [rawListeners](default.md#rawlisteners)
- [readMessage](default.md#readmessage)
- [removeAllListeners](default.md#removealllisteners)
- [removeListener](default.md#removelistener)
- [sendMessage](default.md#sendmessage)
- [setMaxListeners](default.md#setmaxlisteners)
- [streamBlock](default.md#streamblock)

## Constructors

### constructor

• **new default**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`PeerOptions`](../interfaces/PeerOptions.md) |

#### Overrides

(EventEmitter as new () &#x3D;\&gt; PeerEmitter).constructor

#### Defined in

[index.ts:83](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L83)

## Properties

### DEBUG\_LOG

• **DEBUG\_LOG**: `boolean`

#### Defined in

[index.ts:69](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L69)

___

### autoReconnect

• **autoReconnect**: `boolean`

#### Defined in

[index.ts:60](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L60)

___

### autoReconnectWait

• **autoReconnectWait**: `number`

#### Defined in

[index.ts:61](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L61)

___

### buffers

• **buffers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block` | `default` |
| `chunkNum` | `number` |
| `data` | `Buffer`[] |
| `downloadingBlock` | `boolean` |
| `length` | `number` |
| `needed` | `number` |

#### Defined in

[index.ts:71](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L71)

___

### connectOptions

• `Optional` **connectOptions**: `VersionOptions`

#### Defined in

[index.ts:80](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L80)

___

### connected

• **connected**: `boolean`

#### Defined in

[index.ts:63](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L63)

___

### disableExtmsg

• **disableExtmsg**: `boolean`

#### Defined in

[index.ts:62](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L62)

___

### disconnects

• **disconnects**: `number`

#### Defined in

[index.ts:67](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L67)

___

### emitter

• **emitter**: `default`

#### Defined in

[index.ts:70](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L70)

___

### extmsg

• **extmsg**: `boolean`

#### Defined in

[index.ts:66](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L66)

___

### listenBlocks

• `Optional` **listenBlocks**: (`hashes`: `Buffer`[]) => `Buffer`[] \| `Promise`<`Buffer`[]\>

#### Type declaration

▸ (`hashes`): `Buffer`[] \| `Promise`<`Buffer`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `hashes` | `Buffer`[] |

##### Returns

`Buffer`[] \| `Promise`<`Buffer`[]\>

#### Defined in

[index.ts:65](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L65)

___

### listenTxs

• `Optional` **listenTxs**: (`txids`: `Buffer`[]) => `Buffer`[] \| `Promise`<`Buffer`[]\>

#### Type declaration

▸ (`txids`): `Buffer`[] \| `Promise`<`Buffer`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `txids` | `Buffer`[] |

##### Returns

`Buffer`[] \| `Promise`<`Buffer`[]\>

#### Defined in

[index.ts:64](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L64)

___

### magic

• **magic**: `Buffer`

#### Defined in

[index.ts:52](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L52)

___

### mempoolTxs

• **mempoolTxs**: `boolean`

#### Defined in

[index.ts:57](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L57)

___

### node

• **node**: `string`

#### Defined in

[index.ts:49](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L49)

___

### port

• **port**: `number`

#### Defined in

[index.ts:50](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L50)

___

### promiseConnect

• `Optional` **promiseConnect**: `any`

#### Defined in

[index.ts:81](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L81)

___

### segwit

• `Optional` **segwit**: `boolean`

#### Defined in

[index.ts:55](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L55)

___

### socket

• `Optional` **socket**: ``null`` \| `Socket`

#### Defined in

[index.ts:79](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L79)

___

### start\_height

• `Optional` **start\_height**: `number`

#### Defined in

[index.ts:56](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L56)

___

### stream

• **stream**: `boolean`

#### Defined in

[index.ts:58](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L58)

___

### ticker

• **ticker**: `string`

#### Defined in

[index.ts:51](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L51)

___

### timeoutConnect

• **timeoutConnect**: `number`

#### Defined in

[index.ts:68](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L68)

___

### user\_agent

• `Optional` **user\_agent**: `string`

#### Defined in

[index.ts:54](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L54)

___

### validate

• **validate**: `boolean`

#### Defined in

[index.ts:59](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L59)

___

### version

• **version**: `number`

#### Defined in

[index.ts:53](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L53)

## Methods

### addListener

▸ **addListener**<`E`\>(`event`, `listener`): [`default`](default.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | { `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`] |

#### Returns

[`default`](default.md)

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).addListener

#### Defined in

[types/TypedEventEmitter.ts:24](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L24)

___

### broadcastTx

▸ **broadcastTx**(`transaction`, `timeoutSeconds?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `default` |
| `timeoutSeconds` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:659](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L659)

___

### broadcastTxs

▸ **broadcastTxs**(`transactions`, `timeoutSeconds?`): `Promise`<`PromiseSettledResult`<`void`\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactions` | `default`[] |
| `timeoutSeconds` | `number` |

#### Returns

`Promise`<`PromiseSettledResult`<`void`\>[]\>

#### Defined in

[index.ts:668](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L668)

___

### connect

▸ **connect**(`options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| `VersionOptions` |

#### Returns

`any`

#### Defined in

[index.ts:454](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L454)

___

### disconnect

▸ **disconnect**(`autoReconnect?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `autoReconnect` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[index.ts:571](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L571)

___

### emit

▸ **emit**<`E`\>(`event`, `...args`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `...args` | `Parameters`<{ `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`]\> |

#### Returns

`boolean`

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).emit

#### Defined in

[types/TypedEventEmitter.ts:37](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L37)

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).eventNames

#### Defined in

[types/TypedEventEmitter.ts:42](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L42)

___

### fetchMempoolTxs

▸ **fetchMempoolTxs**(`filterTxids`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filterTxids` | (`txids`: `Buffer`[]) => `Buffer`[] \| `Promise`<`Buffer`[]\> |

#### Returns

`void`

#### Defined in

[index.ts:723](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L723)

___

### fetchNewBlocks

▸ **fetchNewBlocks**(`filterBlocks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filterBlocks` | (`hashes`: `Buffer`[]) => `Buffer`[] \| `Promise`<`Buffer`[]\> |

#### Returns

`void`

#### Defined in

[index.ts:731](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L731)

___

### getAddr

▸ **getAddr**(`timeoutSeconds?`): `Promise`<{ `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeoutSeconds` | `number` |

#### Returns

`Promise`<{ `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }\>

#### Defined in

[index.ts:701](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L701)

___

### getBlock

▸ **getBlock**(`hash`, `timeoutSeconds?`): `Promise`<[`GetBlockReturn`](../README.md#getblockreturn)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` \| `Buffer` |
| `timeoutSeconds?` | `number` |

#### Returns

`Promise`<[`GetBlockReturn`](../README.md#getblockreturn)\>

#### Defined in

[index.ts:627](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L627)

___

### getBlocks

▸ **getBlocks**(`blocks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `blocks` | `Buffer`[] |

#### Returns

`void`

#### Defined in

[index.ts:648](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L648)

___

### getHeaders

▸ **getHeaders**(`«destructured»`): `Promise`<`default`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `from?` | `Buffer` \| `Buffer`[] |
| › `timeoutSeconds?` | `number` |
| › `to?` | `Buffer` |

#### Returns

`Promise`<`default`[]\>

#### Defined in

[index.ts:603](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L603)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).getMaxListeners

#### Defined in

[types/TypedEventEmitter.ts:47](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L47)

___

### getMempool

▸ **getMempool**(): `void`

#### Returns

`void`

#### Defined in

[index.ts:623](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L623)

___

### getTxs

▸ **getTxs**(`txs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `txs` | `Buffer`[] |

#### Returns

`void`

#### Defined in

[index.ts:690](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L690)

___

### listenerCount

▸ **listenerCount**<`E`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

#### Returns

`number`

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).listenerCount

#### Defined in

[types/TypedEventEmitter.ts:45](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L45)

___

### listeners

▸ **listeners**<`E`\>(`event`): { `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

#### Returns

{ `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`][]

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).listeners

#### Defined in

[types/TypedEventEmitter.ts:44](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L44)

___

### off

▸ **off**<`E`\>(`event`, `listener`): [`default`](default.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | { `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`] |

#### Returns

[`default`](default.md)

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).off

#### Defined in

[types/TypedEventEmitter.ts:33](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L33)

___

### on

▸ **on**<`E`\>(`event`, `listener`): [`default`](default.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | { `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`] |

#### Returns

[`default`](default.md)

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).on

#### Defined in

[types/TypedEventEmitter.ts:25](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L25)

___

### once

▸ **once**<`E`\>(`event`, `listener`): [`default`](default.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | { `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`] |

#### Returns

[`default`](default.md)

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).once

#### Defined in

[types/TypedEventEmitter.ts:26](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L26)

___

### ping

▸ **ping**(`timeoutSeconds?`): `Promise`<`number`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timeoutSeconds` | `number` | `30` |

#### Returns

`Promise`<`number`\>

#### Defined in

[index.ts:713](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L713)

___

### prependListener

▸ **prependListener**<`E`\>(`event`, `listener`): [`default`](default.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | { `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`] |

#### Returns

[`default`](default.md)

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).prependListener

#### Defined in

[types/TypedEventEmitter.ts:27](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L27)

___

### prependOnceListener

▸ **prependOnceListener**<`E`\>(`event`, `listener`): [`default`](default.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | { `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`] |

#### Returns

[`default`](default.md)

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).prependOnceListener

#### Defined in

[types/TypedEventEmitter.ts:28](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L28)

___

### rawListeners

▸ **rawListeners**<`E`\>(`event`): { `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

#### Returns

{ `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`][]

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).rawListeners

#### Defined in

[types/TypedEventEmitter.ts:43](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L43)

___

### readMessage

▸ **readMessage**(`buffer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Buffer` |

#### Returns

`void`

#### Defined in

[index.ts:236](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L236)

___

### removeAllListeners

▸ **removeAllListeners**<`E`\>(`event?`): [`default`](default.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `E` |

#### Returns

[`default`](default.md)

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).removeAllListeners

#### Defined in

[types/TypedEventEmitter.ts:34](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L34)

___

### removeListener

▸ **removeListener**<`E`\>(`event`, `listener`): [`default`](default.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"version"`` \| ``"transactions"`` \| ``"headers"`` \| ``"block"`` \| ``"block_chunk"`` \| ``"ping"`` \| ``"pong"`` \| ``"inv"`` \| ``"block_hashes"`` \| ``"notfound"`` \| ``"alert"`` \| ``"getdata"`` \| ``"reject"`` \| ``"addr"`` \| ``"getheaders"`` \| ``"sendcmpct"`` \| ``"sendheaders"`` \| ``"unknown_msg"`` \| ``"message"`` \| ``"connect"`` \| ``"connected"`` \| ``"disconnected"`` \| ``"error_socket"`` \| ``"error_message"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | { `addr`: (`__namedParameters`: { `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `alert`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block`: (`__namedParameters`: { `block`: `default` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `block_chunk`: (`__namedParameters`: { `blockHash`: `Buffer` ; `chunk`: `Buffer` ; `finished`: `boolean` ; `header`: `default` ; `height?`: `number` ; `node`: `string` ; `num`: `number` ; `port`: `number` ; `size`: `number` ; `startDate`: `number` ; `started`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount`: `number`  }) => `void` ; `block_hashes`: (`__namedParameters`: { `hashes`: `Buffer`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connect`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `connected`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `disconnected`: (`__namedParameters`: { `disconnects`: `number` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_message`: (`__namedParameters`: { `buffer`: `Buffer` ; `error`: `Error` ; `extmsg`: `boolean` ; `magic`: `Buffer` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `error_socket`: (`__namedParameters`: { `error`: `Error` ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `getdata`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[] ; `witness_blocks`: `Buffer`[] ; `witness_txs`: `Buffer`[]  }) => `void` ; `getheaders`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `headers`: (`__namedParameters`: { `headers`: `default`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `txs`: `number`[]  }) => `void` ; `inv`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `message`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `notfound`: (`msg`: { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  }) => `void` ; `ping`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `pong`: (`__namedParameters`: { `node`: `string` ; `nonce`: `string` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `reject`: (`msg`: `ReadRejectResult`) => `void` ; `sendcmpct`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `sendheaders`: (`__namedParameters`: { `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `transactions`: (`__namedParameters`: { `bytesRemaining?`: `number` ; `finished?`: `boolean` ; `header?`: `default` ; `height?`: `number` ; `node`: `string` ; `port`: `number` ; `size?`: `number` ; `startDate?`: `number` ; `started?`: `boolean` ; `ticker`: `string` ; `transactions`: [`number`, `default`, `number`, `number`][] ; `txCount?`: `number`  }) => `void` ; `unknown_msg`: (`__namedParameters`: { `command`: `string` ; `node`: `string` ; `payload`: `Buffer` ; `port`: `number` ; `ticker`: `string`  }) => `void` ; `version`: (`__namedParameters`: { `node`: `string` ; `port`: `number` ; `ticker`: `string` ; `version`: { `addr_from`: `NetAddress` ; `addr_recv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `segwit`: `boolean` = false; `services`: `Buffer` ; `start_height`: `number` ; `timestamp`: `number` ; `user_agent`: `string` ; `version`: `number`  }  }) => `void`  }[`E`] |

#### Returns

[`default`](default.md)

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).removeListener

#### Defined in

[types/TypedEventEmitter.ts:35](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L35)

___

### sendMessage

▸ **sendMessage**(`command`, `payload`, `force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `command` | `string` | `undefined` |
| `payload` | ``null`` \| `Buffer` | `undefined` |
| `force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[index.ts:145](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L145)

___

### setMaxListeners

▸ **setMaxListeners**(`maxListeners`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxListeners` | `number` |

#### Returns

[`default`](default.md)

#### Inherited from

(EventEmitter as new () =\> PeerEmitter).setMaxListeners

#### Defined in

[types/TypedEventEmitter.ts:48](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L48)

___

### streamBlock

▸ **streamBlock**(`chunk`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `Buffer` |

#### Returns

`void`

#### Defined in

[index.ts:164](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L164)
