import fs from 'node:fs/promises'
let filehadnle = await fs.open('./data/2.txt')
let ws=filehadnle.createWriteStream();
ws.write('1');
ws.on('drain',function () {
  console.log("内存干了");
});
ws.end()