const http = require('http')

const serve = http.createServer((req, res) => {
  res.end('Hello World')
})

serve.listen('80', () => {
  console.log('serve running at http://127.0.0.1')
})