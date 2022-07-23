const net = require('net')
const events = require('events')

const channel = new events.EventEmitter()
channel.client = {}
channel.subscriptions = {}
channel.on('join', function(id, client) {
  this.client[id] = client
  this.subscriptions[id] = (senderId, message) => {
    if(id !== senderId) {
      this.client[id].write(message)
    }
  }
  this.on('broadcast', this.subscriptions[id])
})
net.createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`
  channel.emit('join', id, client)
  // 监听teInet发送消息事件
  client.on('data', data => {
    data = data.toString()
    console.log(data, '---data');
    if(data === 'shutdown\r\n') {
      console.log(data, '---');
      channel.emit('shutdown')
    }
    channel.emit('broadcast', id, data)
  })
  // 监听teInet关闭事件
  client.on('close', (id) => {
    console.log(id, '---close');
    channel.emit('leave', id)
  })
  /// 监听teInet关闭聊天事件
  client.on('shutdown', () => {
    console.log('shutdown');
    channel.emit('broadcast', '', 'The serve has shut down. \n')
    channel.removeAllListeners('broadcast')
  })
}).listen(8888)

channel.on('leave', function(id, client) {
  channel.removeListener('broadcast', this.subscriptions[id])
  channel.emit('broadcast', id, `${id} has leave the chatRoom \n`)
})
