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

所有文件系统操作都具有同步、回调和基于承诺的表单，并且可以使用 CommonJS 语法和 ES6模块(ESM)进行访问。 