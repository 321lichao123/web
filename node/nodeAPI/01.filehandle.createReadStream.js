import fs from 'node:fs/promises';

let filehandle;
try {
  filehandle = await fs.open('./data/input.txt', 'r')
  let stream = filehandle.createReadStream()
  stream.on('data', data => {
    console.log(data.toString());
  })

  stream.on('end', () => {
    console.log('文件读取结束');
  })
} catch(error) {
  console.log(error)
} finally {
  filehandle?.close()
}