// 数组模拟栈的结构
class Stack {
  constructor() {
    this.stack = []
  }
  // 模拟栈的添加操作
  push(element) {
    this.stack.push(element)
  }
  // 移除操作
  pop() {
    return this.stack.pop()
  }
  // 查看栈顶操作
  peek() {
    return this.stack[this.stack.length - 1]
  }
  // 检查栈是否为空
  isEmpty() {
    return this.stack.length === 0
  }
  // 清空栈
  clear() {
    this.stack = []
  }
}

const stack = new Stack()

console.log(stack.isEmpty());

stack.push(5)
stack.push(8)

console.log(stack);


module.exports = Stack
