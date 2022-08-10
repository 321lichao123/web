const Queue = require('./01.queue-object')

const hotPotato = (elementList, num) => {
  // 第一步定义队列
  const queue = new Queue()
  // 定义一个数组存储淘汰的学生
  const elimitatedList = []
  // 将elementList的数据添加到队列中
  for(let i = 0, len = elementList.length; i < len; i++) {
    queue.enqueue(elementList[i])
  }
  // 遍历队列，删除学生
  while(queue.size() > 1) {
    // 遍历指令长度删除指定的学生
    for(let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    elimitatedList.push(queue.dequeue())
  }
  // 返回结果
  return {
    elimitated: elimitatedList,
    winner: queue.dequeue()
  }
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']

const result = hotPotato(names, 7
  )

result.elimitated.forEach(name => {
  console.log(`${name}在击鼓传花中被淘汰`);
})

console.log(`胜利者是${result.winner}`);