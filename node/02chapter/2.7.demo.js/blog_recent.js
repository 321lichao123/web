const http = require('http')
const fs = require('fs')

// 第一种写法：
// http.createServer((req, res) => {
//   if(req.url = '/') {
//     fs.readFile('./title.json', (err1, data) => {
//       if(err1) {
//         console.log(err1);
//         return res.end('Server Error')
//       }
//       const title = JSON.parse(data)
//       fs.readFile('./template.html', (err2, data2) => {
//         if(err2) {
//           console.log(err2);
//           return res.end('Server Error')
//         }
//         const html = data2.toString()
//         const newHtml = html.replace('%', title.join('</li><li>'))
//         res.writeHead(200, {'Content-Type': 'text/html'})
//         res.end(newHtml)
//       })
//     })
//   }
// }).listen(80, () => {
//   console.log('server running at http://127.0.0.1');
// })

// 第二种写法
http.createServer((req, res) => {
  if(req.url === '/') {
    getTitle(res)
  }
}).listen(80, () => {
  console.log('server running at http://127.0.0.1');
})

function getTitle(res) {
  fs.readFile('./title.json', (err, data) => {
    if(err) {
      return handleError(err, res)
    }
    getHtml(res, JSON.parse(data))
  })
}

function getHtml(res, jsonData) {
  fs.readFile('./template.html', (err, data) => {
    if(err) {
      return handleError(err, res)
    }
    const html = data.toString()
    formatHtml(res, jsonData, html)
  })
}

function formatHtml(res, jsonData, html) {
  const newHtml = html.replace('%', jsonData.join('</li><li>'))
  res.end(newHtml)
}

function handleError(err, res) {
  console.log(err);
  res.end('Server Error')
}