class Deque {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.queue = {}
  }
  // 判断是否为空
  isEmpty() {
    return this.lowestCount === this.count
  }
  // 双端队列的长度
  size() {
    return this.count - this.lowestCount
  }
  // 清空双端队列
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
    return Object.values(this.queue).join(',')
  }
  // 向双端队列后面添加元素
  addBack(element) {
    this.queue[this.count] = element
    this.count++
  }
  // 向双端队列前面添加元素
  addFront(element) {
    if(this.isEmpty()) {
      this.addBack()
    } else if (this.lowestCount > 0) {
      this.lowestCount--
      this.queue[this.lowestCount] = element
    } else {
      // 将队列的数据全部向后移动一位
      for(let i = this.count; i > 0; i--) {
        this.queue[i] = this.queue[i - 1]
      }
      this.queue[0] = element
      this.lowestCount = 0
      this.count++
    }
  }
  // 删除双端队列的第一个元素
  removeFront() {
    if(this.isEmpty()) {
      return undefined
    }
    const result = this.queue[this.lowestCount]
    delete this.queue[this.lowestCount]
    this.lowestCount = Object.keys(this.queue)[0]
    return result
  }
  // 删除双端队列的最后一个元素
  removeBack() {
    if(this.isEmpty()) {
      return undefined
    }
    const result = this.queue[this.count]
    delete this.queue[this.count]
    this.count--
    return result
  }
  // 获取双端队列的栈顶元素
  peekFront() {
    if(this.isEmpty()) {
      return undefined
    }
    return this.queue(this.lowestCount)
  }
  // 获取双端队列的最后元素
  peekBack() {
    if(this.isEmpty()) {
      return undefined
    }
    return this.queue[this.count]
  }
}

const queue = new Deque()
console.log(queue.size());

queue.addBack('John')
queue.addBack('Jack')

console.log(queue.toString());

queue.addBack('Camila')
console.log(queue.toString());

console.log(queue.size());
console.log(queue.isEmpty());

queue.removeFront()

console.log(queue.toString());

module.exports = Deque