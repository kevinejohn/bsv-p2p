[**bsv-p2p**](../README.md)

***

[bsv-p2p](../README.md) / default

# Class: default

Defined in: [index.ts:65](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L65)

## Extends

- `TypedEventEmitter`\<\{ `addr`: (`__namedParameters`) => `void`; `alert`: (`__namedParameters`) => `void`; `block`: (`__namedParameters`) => `void`; `block_chunk`: (`__namedParameters`) => `void`; `block_hashes`: (`__namedParameters`) => `void`; `connect`: (`__namedParameters`) => `void`; `connected`: (`__namedParameters`) => `void`; `disconnected`: (`__namedParameters`) => `void`; `error_message`: (`__namedParameters`) => `void`; `error_socket`: (`__namedParameters`) => `void`; `getdata`: (`msg`) => `void`; `getheaders`: (`__namedParameters`) => `void`; `headers`: (`__namedParameters`) => `void`; `inv`: (`msg`) => `void`; `message`: (`__namedParameters`) => `void`; `notfound`: (`msg`) => `void`; `ping`: (`__namedParameters`) => `void`; `pong`: (`__namedParameters`) => `void`; `reject`: (`msg`) => `void`; `sendcmpct`: (`__namedParameters`) => `void`; `sendheaders`: (`__namedParameters`) => `void`; `tx_block`: (`__namedParameters`) => `void`; `tx_mempool`: (`__namedParameters`) => `void`; `unknown_msg`: (`__namedParameters`) => `void`; `version`: (`__namedParameters`) => `void`; \}, `this`\>

## Constructors

### Constructor

> **new default**(`__namedParameters`): `Peer`

Defined in: [index.ts:105](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L105)

#### Parameters

##### \_\_namedParameters

[`PeerOptions`](../interfaces/PeerOptions.md)

#### Returns

`Peer`

#### Overrides

`(EventEmitter as new () => PeerEmitter).constructor`

## Properties

### autoReconnect

> **autoReconnect**: `boolean`

Defined in: [index.ts:76](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L76)

***

### autoReconnectWait

> **autoReconnectWait**: `number`

Defined in: [index.ts:77](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L77)

***

### blockByteBuffer

> **blockByteBuffer**: `number`

Defined in: [index.ts:103](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L103)

***

### buffers

> **buffers**: `object`

Defined in: [index.ts:87](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L87)

#### blockDl

> **blockDl**: \{ `buffer`: `BufferChunksReader`; `date`: `number`; `obj`: `Block`; `size`: `number`; `started`: `boolean`; \} \| `undefined`

#### msgBuffer

> **msgBuffer**: `BufferChunksReader`

#### msgBytesNeeded

> **msgBytesNeeded**: `number`

***

### connected

> **connected**: `boolean`

Defined in: [index.ts:79](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L79)

***

### connectOptions?

> `optional` **connectOptions?**: `VersionOptions`

Defined in: [index.ts:101](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L101)

***

### DEBUG\_LOG

> **DEBUG\_LOG**: `boolean`

Defined in: [index.ts:85](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L85)

***

### disableExtmsg

> **disableExtmsg**: `boolean`

Defined in: [index.ts:78](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L78)

***

### disconnects

> **disconnects**: `number`

Defined in: [index.ts:83](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L83)

***

### emitter

> **emitter**: `CustomEvents`

Defined in: [index.ts:86](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L86)

***

### extmsg

> **extmsg**: `boolean`

Defined in: [index.ts:82](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L82)

***

### listenBlocks?

> `optional` **listenBlocks?**: (`hashes`) => `Buffer`\<`ArrayBufferLike`\>[] \| `Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

Defined in: [index.ts:81](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L81)

#### Parameters

##### hashes

`Buffer`\<`ArrayBufferLike`\>[]

#### Returns

`Buffer`\<`ArrayBufferLike`\>[] \| `Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

***

### listenTxs?

> `optional` **listenTxs?**: (`txids`) => `Buffer`\<`ArrayBufferLike`\>[] \| `Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

Defined in: [index.ts:80](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L80)

#### Parameters

##### txids

`Buffer`\<`ArrayBufferLike`\>[]

#### Returns

`Buffer`\<`ArrayBufferLike`\>[] \| `Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

***

### magic

> **magic**: `Buffer`

Defined in: [index.ts:69](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L69)

***

### mempoolTxs

> **mempoolTxs**: `boolean`

Defined in: [index.ts:74](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L74)

***

### node

> **node**: `string`

Defined in: [index.ts:66](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L66)

***

### port

> **port**: `number`

Defined in: [index.ts:67](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L67)

***

### promiseConnect?

> `optional` **promiseConnect?**: `any`

Defined in: [index.ts:102](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L102)

***

### segwit?

> `optional` **segwit?**: `boolean`

Defined in: [index.ts:72](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L72)

***

### socket?

> `optional` **socket?**: `Socket` \| `null`

Defined in: [index.ts:100](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L100)

***

### start\_height?

> `optional` **start\_height?**: `number`

Defined in: [index.ts:73](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L73)

***

### ticker

> **ticker**: `string`

Defined in: [index.ts:68](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L68)

***

### timeoutConnect

> **timeoutConnect**: `number`

Defined in: [index.ts:84](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L84)

***

### user\_agent?

> `optional` **user\_agent?**: `string`

Defined in: [index.ts:71](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L71)

***

### validate

> **validate**: `boolean`

Defined in: [index.ts:75](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L75)

***

### version

> **version**: `number`

Defined in: [index.ts:70](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L70)

## Methods

### addListener()

> **addListener**\<`E`\>(`event`, `listener`): `this`

Defined in: [types/TypedEventEmitter.ts:24](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L24)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

##### listener

`object`\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).addListener`

***

### broadcastTx()

> **broadcastTx**(`transaction`, `timeoutSeconds?`): `Promise`\<`void`\>

Defined in: [index.ts:717](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L717)

#### Parameters

##### transaction

`Transaction`

##### timeoutSeconds?

`number` = `...`

#### Returns

`Promise`\<`void`\>

***

### broadcastTxs()

> **broadcastTxs**(`transactions`, `timeoutSeconds?`): `Promise`\<`PromiseSettledResult`\<`void`\>[]\>

Defined in: [index.ts:729](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L729)

#### Parameters

##### transactions

`Transaction`[]

##### timeoutSeconds?

`number` = `...`

#### Returns

`Promise`\<`PromiseSettledResult`\<`void`\>[]\>

***

### connect()

> **connect**(`options?`): `any`

Defined in: [index.ts:388](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L388)

#### Parameters

##### options?

`VersionOptions` \| `undefined`

#### Returns

`any`

***

### disconnect()

> **disconnect**(`autoReconnect?`): `void`

Defined in: [index.ts:637](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L637)

#### Parameters

##### autoReconnect?

`boolean` = `false`

#### Returns

`void`

***

### emit()

> **emit**\<`E`\>(`event`, ...`args`): `boolean`

Defined in: [types/TypedEventEmitter.ts:37](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L37)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

##### args

...`Parameters`\<`object`\[`E`\]\>

#### Returns

`boolean`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).emit`

***

### eventNames()

> **eventNames**(): (`string` \| `symbol`)[]

Defined in: [types/TypedEventEmitter.ts:42](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L42)

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

`(EventEmitter as new () => PeerEmitter).eventNames`

***

### fetchMempoolTxs()

> **fetchMempoolTxs**(`filterTxids`): `void`

Defined in: [index.ts:784](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L784)

#### Parameters

##### filterTxids

(`txids`) => `Buffer`\<`ArrayBufferLike`\>[] \| `Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

#### Returns

`void`

***

### fetchNewBlocks()

> **fetchNewBlocks**(`filterBlocks`): `void`

Defined in: [index.ts:792](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L792)

#### Parameters

##### filterBlocks

(`hashes`) => `Buffer`\<`ArrayBufferLike`\>[] \| `Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

#### Returns

`void`

***

### getAddr()

> **getAddr**(`timeoutSeconds?`): `Promise`\<\{ `addrs`: `NetAddress`[]; `node`: `string`; `port`: `number`; `ticker`: `string`; \}\>

Defined in: [index.ts:762](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L762)

#### Parameters

##### timeoutSeconds?

`number` = `...`

#### Returns

`Promise`\<\{ `addrs`: `NetAddress`[]; `node`: `string`; `port`: `number`; `ticker`: `string`; \}\>

***

### getBlock()

> **getBlock**(`hash`, `timeoutSeconds?`): `Promise`\<[`GetBlockReturn`](../type-aliases/GetBlockReturn.md)\>

Defined in: [index.ts:690](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L690)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

##### timeoutSeconds?

`number`

#### Returns

`Promise`\<[`GetBlockReturn`](../type-aliases/GetBlockReturn.md)\>

***

### getBlocks()

> **getBlocks**(`blocks`): `void`

Defined in: [index.ts:706](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L706)

#### Parameters

##### blocks

`Buffer`\<`ArrayBufferLike`\>[]

#### Returns

`void`

***

### getHeaders()

> **getHeaders**(`__namedParameters`): `Promise`\<`Header`[]\>

Defined in: [index.ts:666](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L666)

#### Parameters

##### \_\_namedParameters

###### from?

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

###### timeoutSeconds?

`number` = `...`

###### to?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Promise`\<`Header`[]\>

***

### getMaxListeners()

> **getMaxListeners**(): `number`

Defined in: [types/TypedEventEmitter.ts:47](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L47)

#### Returns

`number`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).getMaxListeners`

***

### getMempool()

> **getMempool**(): `void`

Defined in: [index.ts:686](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L686)

#### Returns

`void`

***

### getTxs()

> **getTxs**(`txs`): `void`

Defined in: [index.ts:751](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L751)

#### Parameters

##### txs

`Buffer`\<`ArrayBufferLike`\>[]

#### Returns

`void`

***

### listenerCount()

> **listenerCount**\<`E`\>(`event`): `number`

Defined in: [types/TypedEventEmitter.ts:45](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L45)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

#### Returns

`number`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).listenerCount`

***

### listeners()

> **listeners**\<`E`\>(`event`): `object`\[`E`\][]

Defined in: [types/TypedEventEmitter.ts:44](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L44)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

#### Returns

`object`\[`E`\][]

#### Inherited from

`(EventEmitter as new () => PeerEmitter).listeners`

***

### off()

> **off**\<`E`\>(`event`, `listener`): `this`

Defined in: [types/TypedEventEmitter.ts:33](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L33)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

##### listener

`object`\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).off`

***

### on()

> **on**\<`E`\>(`event`, `listener`): `this`

Defined in: [types/TypedEventEmitter.ts:25](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L25)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

##### listener

`object`\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).on`

***

### once()

> **once**\<`E`\>(`event`, `listener`): `this`

Defined in: [types/TypedEventEmitter.ts:26](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L26)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

##### listener

`object`\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).once`

***

### ping()

> **ping**(`timeoutSeconds?`): `Promise`\<`number`\>

Defined in: [index.ts:774](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L774)

#### Parameters

##### timeoutSeconds?

`number` = `30`

#### Returns

`Promise`\<`number`\>

***

### prependListener()

> **prependListener**\<`E`\>(`event`, `listener`): `this`

Defined in: [types/TypedEventEmitter.ts:27](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L27)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

##### listener

`object`\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).prependListener`

***

### prependOnceListener()

> **prependOnceListener**\<`E`\>(`event`, `listener`): `this`

Defined in: [types/TypedEventEmitter.ts:28](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L28)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

##### listener

`object`\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).prependOnceListener`

***

### rawListeners()

> **rawListeners**\<`E`\>(`event`): `object`\[`E`\][]

Defined in: [types/TypedEventEmitter.ts:43](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L43)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

#### Returns

`object`\[`E`\][]

#### Inherited from

`(EventEmitter as new () => PeerEmitter).rawListeners`

***

### readMessage()

> **readMessage**(`buffer`): `void`

Defined in: [index.ts:181](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L181)

#### Parameters

##### buffer

`Buffer`

#### Returns

`void`

***

### removeAllListeners()

> **removeAllListeners**\<`E`\>(`event?`): `this`

Defined in: [types/TypedEventEmitter.ts:34](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L34)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event?

`E`

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).removeAllListeners`

***

### removeListener()

> **removeListener**\<`E`\>(`event`, `listener`): `this`

Defined in: [types/TypedEventEmitter.ts:35](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L35)

#### Type Parameters

##### E

`E` *extends* `"version"` \| `"block"` \| `"headers"` \| `"block_chunk"` \| `"tx_mempool"` \| `"tx_block"` \| `"ping"` \| `"pong"` \| `"inv"` \| `"block_hashes"` \| `"notfound"` \| `"alert"` \| `"getdata"` \| `"reject"` \| `"addr"` \| `"getheaders"` \| `"sendcmpct"` \| `"sendheaders"` \| `"unknown_msg"` \| `"message"` \| `"connect"` \| `"connected"` \| `"disconnected"` \| `"error_socket"` \| `"error_message"`

#### Parameters

##### event

`E`

##### listener

`object`\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).removeListener`

***

### sendMessage()

> **sendMessage**(`command`, `payload`, `force?`): `void`

Defined in: [index.ts:162](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L162)

#### Parameters

##### command

`string`

##### payload

`Buffer`\<`ArrayBufferLike`\> \| `null`

##### force?

`boolean` = `false`

#### Returns

`void`

***

### setMaxListeners()

> **setMaxListeners**(`maxListeners`): `this`

Defined in: [types/TypedEventEmitter.ts:48](https://github.com/kevinejohn/bsv-p2p/blob/master/src/types/TypedEventEmitter.ts#L48)

#### Parameters

##### maxListeners

`number`

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => PeerEmitter).setMaxListeners`
