// import { Stack } from './01.stack-array'
const Stack = require('./01.stack-array')

// 进制的转换
function decimalToBinary(decNumber) {
  const stack = new Stack()
  let num = decNumber
  while(num > 0) {
    let rem = Math.floor(num % 2)
    stack.push(rem)
    num = Math.floor(num / 2)
  }
  let binaryString = ''
  while(!stack.isEmpty()) {
    binaryString += stack.pop().toString()
  }
  return binaryString
}

console.log(decimalToBinary(10));