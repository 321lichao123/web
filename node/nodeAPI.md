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

