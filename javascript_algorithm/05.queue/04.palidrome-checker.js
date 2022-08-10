const Deque = require('./02.double-ended-queue')

const palidromeChecker = aString => {
  if(!aString || !aString.length) {
    return false
  }
  let deque = new Deque()
  let lowerString = aString.toLowerCase().split(' ').join(' ')
  for(let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i))
  }
  let isEqual = true
  while(deque.size() > 1 && isEqual) {
    let firstChar = deque.removeFront()
    let lastChar = deque.removeBack()
    if(firstChar !== lastChar) {
      isEqual = false
    }
  }
  return isEqual
}

console.log(palidromeChecker('a'));
console.log(palidromeChecker('aa'));