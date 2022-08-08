// 基于对象模拟栈结构
class Stack {
  constructor() {
    this.count = 0
    this.stack = {}
  }
  // 添加数据操作
  push(element) {
    this.stack[this.count] = element
    this.count++
  }
  // 检查栈顶是否为空
  isEmpty() {
    return this.count === 0
  }
  // 返回数据数量
  size() {
    return this.count
  }
  // 移除操作
  pop() {
    if(this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.stack[this.count]
    delete this.stack[this.count]
    return result
  }
  // 取出栈顶的值
  peek() {
    if(this.isEmpty()) {
      return undefined
    }
    return this.stack[this.count - 1]
  }
  // 清空栈
  clear() {
    this.stack = {}
    this.count = 0
  }
  // 打印数据结构
  toString() {
    if(this.isEmpty()) {
      return ''
    }
    return Object.values(this.stack).join(',')
  }
}

const stack = new Stack()

console.log(stack.isEmpty());

stack.push(5)
stack.push(8)

console.log(stack);

console.log(stack.peek());

console.log(stack.toString());