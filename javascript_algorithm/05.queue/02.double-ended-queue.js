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
    let str = `${this.queue[this.lowestCount]}`
    for(let i = this.lowestCount + 1; i < this.count; i++) {
      str = `${str},${this.queue[i]}`
    }
    return str
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
}