# node API的笔记本
## File System

> The node:fs module enables interacting with the file system in a way modeled on standard POSIX functions
>
> Fs 模块支持以模仿标准 POSIX 函数的方式与文件系统进行交互 

To use the promise-based APIs: 

可以使用基于promise的API

```js
import * as fs from 'node:fs/prmoise'
```

To use the callback and sync APIs: 

也可以使用回调函数和异步的API

```js
import * as fs from 'node:fs'
```

All file system operations have synchronous, callback, and promise-based forms, and are accessible using both CommonJS syntax and ES6 Modules (ESM). 

所有文件系统操作都具有同步、回调和基于promise的形式，并且可以使用 CommonJS 语法和 ES6模块(ESM)进行访问。 

### Promise example

Promise-based operations return a promise that is fulfilled when the asynchronous operation is complete. 

基于promise的操作返回在异步操作完成时实现的promise对象

```js
import { unlink } from 'node:fs/promises';

try {
  await unlink('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (error) {
  console.error('there was an error:', error.message);
}
```

### Callback example

The callback form takes a completion callback function as its last argument and invokes the operation asynchronously. The arguments passed to the completion callback depend on the method, but the first argument is always reserved for an exception. If the operation is completed successfully, then the first argument is `null` or `undefined` .

回调形式接受一个完成回调函数作为其最后一个参数，并异步调用该操作。传递给完成回调的参数取决于方法，但是第一个参数总是为异常保留。如果操作成功完成，则第一个参数为` null `或`undefined`  

```js
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

The callback-based versions of the `node:fs` module APIs are preferable over the use of the promise APIs when maximal performance (both in terms of execution time and memory allocation) is required. 

当需要最大的性能(在执行时间和内存分配方面)时，基于回调的节点: fs 模块 API 优于promise API。

### Synchronous example

The synchronous APIs block the Node.js event loop and further JavaScript execution until the operation is complete. Exceptions are thrown immediately and can be handled using `try…catch`, or can be allowed to bubble up. 

同步 API 阻塞 Node.js 事件循环和进一步的 JavaScript 执行，直到操作完成。异常会立即抛出，可以使用 `try... catch` 或允许冒泡来处理。  

```js
import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```

### Promises API

The `fs/promises` API provides asynchronous file system methods that return promises.

fs/promise API提供了异步文件系统的方法并返回一个promise

The promise APIs use the underlying Node.js threadpool to perform file system operations off the event loop thread. These operations are not synchronized or threadsafe. Care must be taken when performing multiple concurrent modifications on the same file or data corruption may occur.

promise API 使用底层 Node.js 线程池在事件循环线程外执行文件系统操作。这些操作不同步或不是线程安全的。在对同一文件执行多个并发修改时必须小心，否则可能会发生数据损坏

#### Class:FileHandle

A <FileHandle> object is an object wrapper for a numeric file descriptor.

一个FileHandle对象是数字文件描述符的对象包装器

Instances of the <FileHandle> object are created by the `fsPromises.open()` method.

FileHandle实例对象是通过fsPromises.open()方法创建的

All <FileHandle> objects are <EventEmitter>s

所有的FileHandle对象都是EventEmitter对象

If a <FileHandle> is not closed using the `filehandle.close()` method, it will try to automatically close the file descriptor and emit a process warning, helping to prevent memory leaks. Please do not rely on this behavior because it can be unreliable and the file may not be closed. Instead, always explicitly close <FileHandle>s. Node.js may change this behavior in the future.

如果 < FileHandle > 没有使用 filehandle.close ()方法关闭，它将尝试自动关闭文件描述符并发出进程警告，以帮助防止内存泄漏。请不要依赖此行为，因为它可能是不可靠的，并且文件可能无法关闭。相反，总是显式地关闭 < FileHandle > s.Node.js 可能会在将来改变这种行为。

##### Event:'close'

The `'close'` event is emitted when the <FileHandle> has been closed and can no longer be used.

当 < FileHandle > 已关闭且不能再使用时，将发出“ close”事件。

##### filehandle.appendFile(data,[options])

- data: [<string>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures) | [<Buffer>](https://nodejs.org/api/buffer.html#class-buffer) | [<TypeBuffer>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DateView>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) | <AsyncIterable> | <Iterable> | [<Stream>](https://nodejs.org/api/stream.html#stream)

- options <Object> | <string>
  - encoding <string> | <null> **Default**: 'utf-8'

- Returns: <promise> Fulfills with undefined upon success

​       <promise>成功后以未定义的方式履行。

Alias of [`filehandle.writeFile()`](https://nodejs.org/api/fs.html#filehandlewritefiledata-options).

filehandle.writeFile()的别名方法

When operating on file handles, the mode cannot be changed from what it was set to with [`fsPromises.open()`](https://nodejs.org/api/fs.html#fspromisesopenpath-flags-mode). Therefore, this is equivalent to [`filehandle.writeFile()`](https://nodejs.org/api/fs.html#filehandlewritefiledata-options).

在文件回调操作时，不能将模式从 fsEconomes.open ()设置的模式更改为。因此，这等效于 filehandle.writeFile ()。

##### filehandle.chmod(mode)

- mode: <integer> the file mode bit mask 文件模式的位掩码
- Returns: <promise> Fulfills with `undefined` upon success. <promise>成功后以未定义的方式履行

Modifies the permissions on the file. See [`chmod(2)`](http://man7.org/linux/man-pages/man2/chmod.2.html).

修改文件的权限。参见 chmod (2)。

##### filehandle.close()

- Return: <promise> Fulfills with `undefined` upon success. <promise>成功后以未定义的方式履行

Closes the file handle after waiting for any pending operation on the handle to complete.

在等待回调上的任何未决操作完成后，；关闭文件回调。

```js
import { open } from 'node:fs/promise'
let filehandle
try {
    filehandle = await open('thefile.txt', 'r')
} finally {
    await filehandle.?close()
}
```

##### filehandle.createReadStream([options])

- options: <object>
  - encoding: <string> **Default**: null
  - autoClose: <boolean> **Default**:true
  - emitClose: <boolean> **Default**: true
  - start: <integer>
  - end: <integer> **Default**: Infinity
  - highWaterMark: <integer> **Default**: 64 * 1024
- Return: <fs.ReadStream>

Unlike the 16 KiB default `highWaterMark` for a [<stream.Readable>](https://nodejs.org/api/stream.html#class-streamreadable), the stream returned by this method has a default `highWaterMark` of 64 KiB.

与 < stream. Readable > 的16 KiB 默认 highWaterMark 不同，此方法返回的流的默认 highWaterMark 为64 KiB。

`options` can include `start` and `end` values to read a range of bytes from the file instead of the entire file. Both `start` and `end` are inclusive and start counting at 0, allowed values are in the [0, [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)] range. If `start` is omitted or `undefined`, `filehandle.createReadStream()` reads sequentially from the current file position. The `encoding` can be any one of those accepted by [<Buffer>](https://nodejs.org/api/buffer.html#class-buffer).

选项可以包括从文件而不是从整个文件读取字节范围的开始值和结束值。开始和结束都是包含的，开始计数为0，允许的值在[0，Number.MAX _ SAFE _ INTEGER ]范围内。如果省略或未定义 start，则 filehandle.createReadStream ()将从当前文件位置顺序读取。编码可以是 < Buffer > 接受的任何一种编码。

If the `FileHandle` points to a character device that only supports blocking reads (such as keyboard or sound card), read operations do not finish until data is available. This can prevent the process from exiting and the stream from closing naturally.

如果 FileHandle 指向只支持阻塞读取(如键盘或声卡)的字符设备，则直到数据可用时才完成读取操作。这可以防止进程退出和流自然关闭。

By default, the stream will emit a `'close'` event after it has been destroyed. Set the `emitClose` option to `false` to change this behavior.

默认情况下，流在被销毁后将发出一个“关闭”事件。将 emitClose 选项设置为 false 以更改此行为。

```js
import { open } from 'node:fs/promises';

const fd = await open('/dev/input/event0');
// Create a stream from some character device.
const stream = fd.createReadStream();
setTimeout(() => {
  stream.close(); // This may not close the stream.
  // Artificially marking end-of-stream, as if the underlying resource had
  // indicated end-of-file by itself, allows the stream to close.
  // This does not cancel pending read operations, and if there is such an
  // operation, the process may still not be able to exit successfully
  // until it finishes.
  stream.push(null);
  stream.read(0);
}, 100);
```

If `autoClose` is false, then the file descriptor won't be closed, even if there's an error. It is the application's responsibility to close it and make sure there's no file descriptor leak. If `autoClose` is set to true (default behavior), on `'error'` or `'end'` the file descriptor will be closed automatically.

如果 autoClose 为 false，那么即使出现错误，文件描述符也不会关闭。应用程序有责任关闭它，并确保没有文件描述符泄漏。如果 autoClose 设置为 true (默认行为) ，在“ error”或“ end”时，文件描述符将自动关闭。

An example to read the last 10 bytes of a file which is 100 bytes long:

读取文件最后10个字节(100个字节)的示例:

```js
import { open } from 'node:fs/promises';

const fd = await open('sample.txt');
fd.createReadStream({ start: 90, end: 99 });
```

