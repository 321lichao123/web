const net = require('net')

net.createServer(socket => {
  socket.on('data', data => {
    console.log(data.toString());
    socket.write(data.toString())
  })
}).listen(8888)