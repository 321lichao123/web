const DoublyLinkedList = require('./02.doublyLinkedList')

class StackLinkedList {
  constructor() {
    this.item = new DoublyLinkedList()
  }

  push(element) {
    this.item.push(element)
  }

  pop() {
    if(this.isEmpty()) {
      return undefined
    }
    return this.item.removeAt(this.size() - 1)
  }

  isEmpty() {
    return this.item.count === 0
  }

  size() {
    return this.item.count
  }

  peek() {
    if(this.isEmpty()) {
      return undefined
    }
    return this.item.getElementAt(this.size() - 1).element
  }

  clear() {
    this.item.clear()
  }

  toString() {
    this.item.toString()
  }
}