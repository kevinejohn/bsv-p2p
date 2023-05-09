[bsv-p2p](../README.md) / default

# Class: default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [DEBUG_LOG](default.md#debug_log)
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
- [start_height](default.md#start_height)
- [stream](default.md#stream)
- [ticker](default.md#ticker)
- [timeoutConnect](default.md#timeoutconnect)
- [user_agent](default.md#user_agent)
- [validate](default.md#validate)
- [version](default.md#version)
- [captureRejectionSymbol](default.md#capturerejectionsymbol)
- [captureRejections](default.md#capturerejections)
- [defaultMaxListeners](default.md#defaultmaxlisteners)
- [errorMonitor](default.md#errormonitor)

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
- [getEventListeners](default.md#geteventlisteners)
- [listenerCount](default.md#listenercount-1)
- [on](default.md#on-1)
- [once](default.md#once-1)
- [setMaxListeners](default.md#setmaxlisteners-1)

## Constructors

### constructor

• **new default**(`«destructured»`)

#### Parameters

| Name             | Type                                          |
| :--------------- | :-------------------------------------------- |
| `«destructured»` | [`PeerOptions`](../interfaces/PeerOptions.md) |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/index.ts:82](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L82)

## Properties

### DEBUG_LOG

• **DEBUG_LOG**: `boolean`

#### Defined in

[src/index.ts:68](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L68)

---

### autoReconnect

• **autoReconnect**: `boolean`

#### Defined in

[src/index.ts:59](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L59)

---

### autoReconnectWait

• **autoReconnectWait**: `number`

#### Defined in

[src/index.ts:60](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L60)

---

### buffers

• **buffers**: `Object`

#### Type declaration

| Name               | Type       |
| :----------------- | :--------- |
| `block`            | `default`  |
| `chunkNum`         | `number`   |
| `data`             | `Buffer`[] |
| `downloadingBlock` | `boolean`  |
| `length`           | `number`   |
| `needed`           | `number`   |

#### Defined in

[src/index.ts:70](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L70)

---

### connectOptions

• `Optional` **connectOptions**: `VersionOptions`

#### Defined in

[src/index.ts:79](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L79)

---

### connected

• **connected**: `boolean`

#### Defined in

[src/index.ts:62](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L62)

---

### disableExtmsg

• **disableExtmsg**: `boolean`

#### Defined in

[src/index.ts:61](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L61)

---

### disconnects

• **disconnects**: `number`

#### Defined in

[src/index.ts:66](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L66)

---

### emitter

• **emitter**: `default`

#### Defined in

[src/index.ts:69](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L69)

---

### extmsg

• **extmsg**: `boolean`

#### Defined in

[src/index.ts:65](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L65)

---

### listenBlocks

• `Optional` **listenBlocks**: (`hashes`: `Buffer`[]) => `Buffer`[] \| `Promise`<`Buffer`[]\>

#### Type declaration

▸ (`hashes`): `Buffer`[] \| `Promise`<`Buffer`[]\>

##### Parameters

| Name     | Type       |
| :------- | :--------- |
| `hashes` | `Buffer`[] |

##### Returns

`Buffer`[] \| `Promise`<`Buffer`[]\>

#### Defined in

[src/index.ts:64](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L64)

---

### listenTxs

• `Optional` **listenTxs**: (`txids`: `Buffer`[]) => `Buffer`[] \| `Promise`<`Buffer`[]\>

#### Type declaration

▸ (`txids`): `Buffer`[] \| `Promise`<`Buffer`[]\>

##### Parameters

| Name    | Type       |
| :------ | :--------- |
| `txids` | `Buffer`[] |

##### Returns

`Buffer`[] \| `Promise`<`Buffer`[]\>

#### Defined in

[src/index.ts:63](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L63)

---

### magic

• **magic**: `Buffer`

#### Defined in

[src/index.ts:51](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L51)

---

### mempoolTxs

• **mempoolTxs**: `boolean`

#### Defined in

[src/index.ts:56](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L56)

---

### node

• **node**: `string`

#### Defined in

[src/index.ts:48](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L48)

---

### port

• **port**: `number`

#### Defined in

[src/index.ts:49](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L49)

---

### promiseConnect

• `Optional` **promiseConnect**: `any`

#### Defined in

[src/index.ts:80](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L80)

---

### segwit

• `Optional` **segwit**: `boolean`

#### Defined in

[src/index.ts:54](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L54)

---

### socket

• `Optional` **socket**: `null` \| `Socket`

#### Defined in

[src/index.ts:78](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L78)

---

### start_height

• `Optional` **start_height**: `number`

#### Defined in

[src/index.ts:55](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L55)

---

### stream

• **stream**: `boolean`

#### Defined in

[src/index.ts:57](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L57)

---

### ticker

• **ticker**: `string`

#### Defined in

[src/index.ts:50](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L50)

---

### timeoutConnect

• **timeoutConnect**: `number`

#### Defined in

[src/index.ts:67](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L67)

---

### user_agent

• `Optional` **user_agent**: `string`

#### Defined in

[src/index.ts:53](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L53)

---

### validate

• **validate**: `boolean`

#### Defined in

[src/index.ts:58](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L58)

---

### version

• **version**: `number`

#### Defined in

[src/index.ts:52](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L52)

---

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](default.md#capturerejectionsymbol)

#### Inherited from

EventEmitter.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:322

---

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

EventEmitter.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:327

---

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

EventEmitter.defaultMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:328

---

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](default.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

EventEmitter.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:321

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](default.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name        | Type                           |
| :---------- | :----------------------------- |
| `eventName` | `string` \| `symbol`           |
| `listener`  | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](default.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:348

---

### broadcastTx

▸ **broadcastTx**(`transaction`, `timeoutSeconds?`): `Promise`<`void`\>

#### Parameters

| Name             | Type      |
| :--------------- | :-------- |
| `transaction`    | `default` |
| `timeoutSeconds` | `number`  |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/index.ts:658](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L658)

---

### broadcastTxs

▸ **broadcastTxs**(`transactions`, `timeoutSeconds?`): `Promise`<`PromiseSettledResult`<`void`\>[]\>

#### Parameters

| Name             | Type        |
| :--------------- | :---------- |
| `transactions`   | `default`[] |
| `timeoutSeconds` | `number`    |

#### Returns

`Promise`<`PromiseSettledResult`<`void`\>[]\>

#### Defined in

[src/index.ts:667](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L667)

---

### connect

▸ **connect**(`options?`): `any`

#### Parameters

| Name      | Type                            |
| :-------- | :------------------------------ |
| `options` | `undefined` \| `VersionOptions` |

#### Returns

`any`

#### Defined in

[src/index.ts:453](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L453)

---

### disconnect

▸ **disconnect**(`autoReconnect?`): `void`

#### Parameters

| Name            | Type      | Default value |
| :-------------- | :-------- | :------------ |
| `autoReconnect` | `boolean` | `false`       |

#### Returns

`void`

#### Defined in

[src/index.ts:570](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L570)

---

### emit

▸ **emit**(`eventName`, `...args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from "node:events";
const myEmitter = new EventEmitter();

// First listener
myEmitter.on("event", function firstListener() {
  console.log("Helloooo! first listener");
});
// Second listener
myEmitter.on("event", function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on("event", function thirdListener(...args) {
  const parameters = args.join(", ");
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners("event"));

myEmitter.emit("event", 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`Since`**

v0.1.26

#### Parameters

| Name        | Type                 |
| :---------- | :------------------- |
| `eventName` | `string` \| `symbol` |
| `...args`   | `any`[]              |

#### Returns

`boolean`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/@types/node/events.d.ts:610

---

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from "node:events";

const myEE = new EventEmitter();
myEE.on("foo", () => {});
myEE.on("bar", () => {});

const sym = Symbol("symbol");
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:673

---

### fetchMempoolTxs

▸ **fetchMempoolTxs**(`filterTxids`): `void`

#### Parameters

| Name          | Type                                                          |
| :------------ | :------------------------------------------------------------ |
| `filterTxids` | (`txids`: `Buffer`[]) => `Buffer`[] \| `Promise`<`Buffer`[]\> |

#### Returns

`void`

#### Defined in

[src/index.ts:722](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L722)

---

### fetchNewBlocks

▸ **fetchNewBlocks**(`filterBlocks`): `void`

#### Parameters

| Name           | Type                                                           |
| :------------- | :------------------------------------------------------------- |
| `filterBlocks` | (`hashes`: `Buffer`[]) => `Buffer`[] \| `Promise`<`Buffer`[]\> |

#### Returns

`void`

#### Defined in

[src/index.ts:730](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L730)

---

### getAddr

▸ **getAddr**(`timeoutSeconds?`): `Promise`<{ `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` }\>

#### Parameters

| Name             | Type     |
| :--------------- | :------- |
| `timeoutSeconds` | `number` |

#### Returns

`Promise`<{ `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string` }\>

#### Defined in

[src/index.ts:700](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L700)

---

### getBlock

▸ **getBlock**(`hash`, `timeoutSeconds?`): `Promise`<[`GetBlockReturn`](../README.md#getblockreturn)\>

#### Parameters

| Name              | Type                 |
| :---------------- | :------------------- |
| `hash`            | `string` \| `Buffer` |
| `timeoutSeconds?` | `number`             |

#### Returns

`Promise`<[`GetBlockReturn`](../README.md#getblockreturn)\>

#### Defined in

[src/index.ts:626](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L626)

---

### getBlocks

▸ **getBlocks**(`blocks`): `void`

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `blocks` | `Buffer`[] |

#### Returns

`void`

#### Defined in

[src/index.ts:647](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L647)

---

### getHeaders

▸ **getHeaders**(`«destructured»`): `Promise`<`default`[]\>

#### Parameters

| Name                | Type                   |
| :------------------ | :--------------------- |
| `«destructured»`    | `Object`               |
| › `from?`           | `Buffer` \| `Buffer`[] |
| › `timeoutSeconds?` | `number`               |
| › `to?`             | `Buffer`               |

#### Returns

`Promise`<`default`[]\>

#### Defined in

[src/index.ts:602](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L602)

---

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](default.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:525

---

### getMempool

▸ **getMempool**(): `void`

#### Returns

`void`

#### Defined in

[src/index.ts:622](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L622)

---

### getTxs

▸ **getTxs**(`txs`): `void`

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `txs` | `Buffer`[] |

#### Returns

`void`

#### Defined in

[src/index.ts:689](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L689)

---

### listenerCount

▸ **listenerCount**(`eventName`, `listener?`): `number`

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

**`Since`**

v3.2.0

#### Parameters

| Name        | Type                 | Description                              |
| :---------- | :------------------- | :--------------------------------------- |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |
| `listener?` | `Function`           | The event handler function               |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:619

---

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on("connection", (stream) => {
  console.log("someone connected!");
});
console.log(util.inspect(server.listeners("connection")));
// Prints: [ [Function] ]
```

**`Since`**

v0.1.26

#### Parameters

| Name        | Type                 |
| :---------- | :------------------- |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.listeners

#### Defined in

node_modules/@types/node/events.d.ts:538

---

### off

▸ **off**(`eventName`, `listener`): [`default`](default.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name        | Type                           |
| :---------- | :----------------------------- |
| `eventName` | `string` \| `symbol`           |
| `listener`  | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](default.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:498

---

### on

▸ **on**(`eventName`, `listener`): [`default`](default.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on("connection", (stream) => {
  console.log("someone connected!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from "node:events";
const myEE = new EventEmitter();
myEE.on("foo", () => console.log("a"));
myEE.prependListener("foo", () => console.log("b"));
myEE.emit("foo");
// Prints:
//   b
//   a
```

**`Since`**

v0.1.101

#### Parameters

| Name        | Type                           | Description            |
| :---------- | :----------------------------- | :--------------------- |
| `eventName` | `string` \| `symbol`           | The name of the event. |
| `listener`  | (...`args`: `any`[]) => `void` | The callback function  |

#### Returns

[`default`](default.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:380

---

### once

▸ **once**(`eventName`, `listener`): [`default`](default.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once("connection", (stream) => {
  console.log("Ah, we have our first user!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from "node:events";
const myEE = new EventEmitter();
myEE.once("foo", () => console.log("a"));
myEE.prependOnceListener("foo", () => console.log("b"));
myEE.emit("foo");
// Prints:
//   b
//   a
```

**`Since`**

v0.3.0

#### Parameters

| Name        | Type                           | Description            |
| :---------- | :----------------------------- | :--------------------- |
| `eventName` | `string` \| `symbol`           | The name of the event. |
| `listener`  | (...`args`: `any`[]) => `void` | The callback function  |

#### Returns

[`default`](default.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:410

---

### ping

▸ **ping**(`timeoutSeconds?`): `Promise`<`number`\>

#### Parameters

| Name             | Type     | Default value |
| :--------------- | :------- | :------------ |
| `timeoutSeconds` | `number` | `30`          |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/index.ts:712](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L712)

---

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](default.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener("connection", (stream) => {
  console.log("someone connected!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name        | Type                           | Description            |
| :---------- | :----------------------------- | :--------------------- |
| `eventName` | `string` \| `symbol`           | The name of the event. |
| `listener`  | (...`args`: `any`[]) => `void` | The callback function  |

#### Returns

[`default`](default.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:637

---

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](default.md)

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener("connection", (stream) => {
  console.log("Ah, we have our first user!");
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name        | Type                           | Description            |
| :---------- | :----------------------------- | :--------------------- |
| `eventName` | `string` \| `symbol`           | The name of the event. |
| `listener`  | (...`args`: `any`[]) => `void` | The callback function  |

#### Returns

[`default`](default.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:653

---

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from "node:events";
const emitter = new EventEmitter();
emitter.once("log", () => console.log("log once"));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners("log");
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on("log", () => console.log("log persistently"));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners("log");

// Logs "log persistently" twice
newListeners[0]();
emitter.emit("log");
```

**`Since`**

v9.4.0

#### Parameters

| Name        | Type                 |
| :---------- | :------------------- |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:569

---

### readMessage

▸ **readMessage**(`buffer`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `buffer` | `Buffer` |

#### Returns

`void`

#### Defined in

[src/index.ts:235](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L235)

---

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`default`](default.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `event?` | `string` \| `symbol` |

#### Returns

[`default`](default.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:509

---

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`default`](default.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log("someone connected!");
};
server.on("connection", callback);
// ...
server.removeListener("connection", callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from "node:events";
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log("A");
  myEmitter.removeListener("event", callbackB);
};

const callbackB = () => {
  console.log("B");
};

myEmitter.on("event", callbackA);

myEmitter.on("event", callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit("event");
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit("event");
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
import { EventEmitter } from "node:events";
const ee = new EventEmitter();

function pong() {
  console.log("pong");
}

ee.on("ping", pong);
ee.once("ping", pong);
ee.removeListener("ping", pong);

ee.emit("ping");
ee.emit("ping");
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name        | Type                           |
| :---------- | :----------------------------- |
| `eventName` | `string` \| `symbol`           |
| `listener`  | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](default.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:493

---

### sendMessage

▸ **sendMessage**(`command`, `payload`, `force?`): `void`

#### Parameters

| Name      | Type               | Default value |
| :-------- | :----------------- | :------------ |
| `command` | `string`           | `undefined`   |
| `payload` | `null` \| `Buffer` | `undefined`   |
| `force`   | `boolean`          | `false`       |

#### Returns

`void`

#### Defined in

[src/index.ts:144](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L144)

---

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](default.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

[`default`](default.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:519

---

### streamBlock

▸ **streamBlock**(`chunk`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `chunk` | `Buffer` |

#### Returns

`void`

#### Defined in

[src/index.ts:163](https://github.com/kevinejohn/bsv-p2p/blob/master/src/index.ts#L163)

---

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
import { getEventListeners, EventEmitter } from "node:events";

{
  const ee = new EventEmitter();
  const listener = () => console.log("Events are fun");
  ee.on("foo", listener);
  console.log(getEventListeners(ee, "foo")); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log("Events are fun");
  et.addEventListener("foo", listener);
  console.log(getEventListeners(et, "foo")); // [ [Function: listener] ]
}
```

**`Since`**

v15.2.0, v14.17.0

#### Parameters

| Name      | Type                                |
| :-------- | :---------------------------------- |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |
| `name`    | `string` \| `symbol`                |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.getEventListeners

#### Defined in

node_modules/@types/node/events.d.ts:296

---

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
import { EventEmitter, listenerCount } from "node:events";

const myEmitter = new EventEmitter();
myEmitter.on("event", () => {});
myEmitter.on("event", () => {});
console.log(listenerCount(myEmitter, "event"));
// Prints: 2
```

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name        | Type                 | Description          |
| :---------- | :------------------- | :------------------- |
| `emitter`   | `EventEmitter`       | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name       |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:268

---

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit("foo", "bar");
  ee.emit("foo", 42);
});

for await (const event of on(ee, "foo")) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from "node:events";
import process from "node:process";

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit("foo", "bar");
    ee.emit("foo", 42);
  });

  for await (const event of on(ee, "foo", { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

**`Since`**

v13.6.0, v12.16.0

#### Parameters

| Name        | Type                        | Description                              |
| :---------- | :-------------------------- | :--------------------------------------- |
| `emitter`   | `EventEmitter`              | -                                        |
| `eventName` | `string`                    | The name of the event being listened for |
| `options?`  | `StaticEventEmitterOptions` | -                                        |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:250

---

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from "node:events";
import process from "node:process";

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit("myevent", 42);
});

const [value] = await once(ee, "myevent");
console.log(value);

const err = new Error("kaboom");
process.nextTick(() => {
  ee.emit("error", err);
});

try {
  await once(ee, "myevent");
} catch (err) {
  console.error("error happened", err);
}
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from "node:events";

const ee = new EventEmitter();

once(ee, "error")
  .then(([err]) => console.log("ok", err.message))
  .catch((err) => console.error("error", err.message));

ee.emit("error", new Error("boom"));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from "node:events";

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log("event emitted!");
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Waiting for the event was canceled!");
    } else {
      console.error("There was an error", error.message);
    }
  }
}

foo(ee, "foo", ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit("foo"); // Prints: Waiting for the event was canceled!
```

**`Since`**

v11.13.0, v10.16.0

#### Parameters

| Name        | Type                        |
| :---------- | :-------------------------- |
| `emitter`   | `_NodeEventTarget`          |
| `eventName` | `string` \| `symbol`        |
| `options?`  | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:189

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name        | Type                        |
| :---------- | :-------------------------- |
| `emitter`   | `_DOMEventTarget`           |
| `eventName` | `string`                    |
| `options?`  | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:190

---

### setMaxListeners

▸ `Static` **setMaxListeners**(`n?`, `...eventTargets`): `void`

```js
import { setMaxListeners, EventEmitter } from "node:events";

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

**`Since`**

v15.4.0

#### Parameters

| Name              | Type                                    | Description                                                                     |
| :---------------- | :-------------------------------------- | :------------------------------------------------------------------------------ |
| `n?`              | `number`                                | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | (`EventEmitter` \| `_DOMEventTarget`)[] | -                                                                               |

#### Returns

`void`

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:311
