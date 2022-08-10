// 创建节点类
class Node {
  constructor(element) {
    // 节点值
    this.element = element
    // 指向下个节点的引用
    this.next = undefined
  }
}

// 判断两个值是否相等
function defaultEquals(a, b) {
  return a === b
}

// 定义链表的类
class LinkedList {
  constructor(equals = defaultEquals) {
    // 用于计数
    this.count = 0
    // 定义头数据
    this.head = undefined
    // 定义两个节点是否相等
    this.equals = equals
  }
  
  // 向链表中添加数据
  push(element) {
    // 创建节点
    let node = new Node(element)
    let current
    // 判断当前链表是否没有数据
    if(this.head == null) {
      // 如果没有数据，则直接将node赋值给头节点
      this.head = node
    } else {
      // 否则循环遍历找到尾节点添加数据
      current = this.head
      while(current.next != null) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }
}

const link = new LinkedList()

link.push(5)
link.push(8)

console.log(link);