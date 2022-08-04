import fs from 'node:fs/promises'
let filehadnle = await fs.open()
let ws=filehadnle.createWriteStream('./data/2.txt');
ws.write('1');
ws.on('drain',function () {
  console.log("内存干了");
});
ws.end()