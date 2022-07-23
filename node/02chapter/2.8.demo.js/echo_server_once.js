const net = require('net')

net.createServer(socket => {
  socket.once('data', data => {
    console.log(data);
    socket.write(data)
  })
}).listen(8888)