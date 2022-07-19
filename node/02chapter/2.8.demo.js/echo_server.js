const net = require('net')

net.createServer(socket => {
  socket.on('data', data => {
    console.log(JSON.parse(data))
    socket.write(data)
  })
}).listen(8888)