const Compare = {
  LESS_THAN: -1,
  BIGGER_THEN: 1
}

function defaultCompare(a, b) {
  if(a === b) {
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THEN
}

function defaultEquals(a, b) {
  return a === b
}

class Node{
  constructor(element) {
    this.element = element
    this.next = undefined
  }
}

class SortedLinkedList {
  constructor(equals = defaultEquals, compareFn = defaultCompare) {
    this.head = undefined
    this.equals = equals
    this.compareFn = compareFn
    this.count = 0
  }

  sortInset(element, index) {
    if(index >= 0 && index <= this.count) {
      let node = new Node(element)
      if(index === 0) {
        this.head = node
      } else {
        let previous = this.getElementAt(index - 1)
        node.next = previous.next
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }

  insert(element, index = 0) {
    // 如果为空则调用父级的insert插入元素
    if(this.isEmpty()) {
      return this.sortInset(element, 0)
    }
    // 通过对比获取比element小的前一个节点的索引值
    const props = this.getIndexNextSortedElement(element)
    // 获取索引通过调用父级的insert插入节点
    return this.sortInset(element, props)
  }

  isEmpty() {
    return this.count === 0
  }

  size() {
    return this.count
  }

  toString() {
    if(this.head === null) {
      return ''
    }
    let str = `${this.head.element}`
    let current = this.head.next
    for(let i = 1; i < this.count; i++) {
      str = `${str},${current.element}`
      current = current.next
    }
    return str
  }

  // 获取需要插入的索引值
  getIndexNextSortedElement(element) {
    let current = this.head
    let i = 0
    for(; i < this.size(); i++) {
      // 比较节点值与传入的值的大小
      const comp = this.compareFn(element, current.element)
      // 如果参数比当前节点的值小，则返回当前的索引
      if(comp === Compare.LESS_THAN) {
        return i
      }
      current = current.next
    }
    // 否则返回最大的索引，也就是this.count
    return i
  }

  getElementAt(index) {
    if(index >= 0 && index < this.count) {
      let current = this.head
      for(let i = 0; i < index && current != null; i++) {
        current = current.next
      }
      return current
    }
    return -1
  }
  
}

const link = new SortedLinkedList()

link.insert(5)
link.insert(10)
link.insert(15)
link.insert(20)

console.log(link.toString());

link.insert(18)

console.log(link.toString());