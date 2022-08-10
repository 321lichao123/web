// 对象模拟队列

class Queue {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.queue = {}
  }
  // 添加元素
  enqueue(element) {
    this.queue[this.count] = element
    this.count++
  }
  // 删除元素
  dequeue() {
    if(this.isEmpty()) {
      return undefined
    }
    const result = this.queue[this.lowestCount]
    this.lowestCount++
    return result
  }
  // 判断队列是否为空
  isEmpty() {
    return this.lowestCount === this.count
  }
  // 返回栈顶数据
  peek() {
    if(this.isEmpty()) {
      return undefined
    }
    return this.queue[this.lowestCount]
  }
  // 返回队列的长度
  size() {
    return this.count - this.lowestCount
  }
  // 清空队列
  clear() {
    this.count = 0
    this.lowestCount = 0
    this.queue = {}
  }
  // 打印
  toString() {
    if(this.isEmpty()) {
      return ''
    }
    let str = `${this.queue[this.lowestCount]}`
    for(let i = this.lowestCount + 1; i < this.count; i++) {
      str = `${str},${this.queue[i]}`
    }
    return str
  }
}

const queue = new Queue()

queue.enqueue('zhangsan')
queue.enqueue('lisi')

console.log(queue.toString());

module.exports = Queue
