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

  // 通过索引删除链表中的元素
  removeAt(index) {
    // 检查越界值
    if(index >= 0 && index < this.count) {
      // 定义临时变量保存头节点
      let current = this.head
      // 如果删除链表的第一项
      if(index === 0) {
        this.head = current.next
      } else {
        // 如果链表不止一个值
        // 定义一个临时变量保存要删除索引前面的链表结构
        // let previous;
        // 遍历链表
        // for(let i = 0; i < index; i++) {
        //   previous = current
        //   current = current.next
        // }
        // 将需要current.next赋值给previous.next 跳过current从而达到删除数据
        // previous.next = current.next
        // 重构之后的代码
        let previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
        this.count--
      }
      return current.element
    }
    return undefined
  }

  // 在指定位置插入元素
  insert(element, index) {
    if(index >= 0 && index < this.count) {
      let current;
      let node = new Node(element)
      // 如果在第一项前插入节点
      if(index === 0) {
        // 将链表的第一项赋值给临时变量
        current = this.head
        // 将临时变量赋值给node.next，让其node的next指向原来的头节点
        node.next = current
        // 在将node节点赋值给head
        this.head = node
      } else {
        // 获取索引的前一个节点
        let previous = this.getElementAt(index - 1)
        // 使用临时变量保存需要插入的下个节点
        current = previous.next
        // 将previous.next赋值给node.next,让node指向下面的链表
        node.next = current
        // 在将node赋值给previous.next让其指向node，从而达到插入数据
        previous.next = node
      }
      this.count++
      return true
    }
  }

  // 返回元素的索引
  indexOf(element) {
    let current = this.head
    for(let i = 0; i < this.count && current != null; i++) {
      if(this.equals(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  // 通过元素删除链表的元素
  // 只能删除第一个元素
  remove(element) {
    let index = this.indexOf(element)
    return this.removeAt(index)
  }
  
  // 判断链表是否为空
  isEmpty() {
    return this.count === 0
  }

  // 返回链表的长度
  size() {
    return this.count
  }

  // 获取头元素
  getHead() {
    return this.head
  }

  // 打印链表
  toString() {
    if(this.head == null) {
      return ''
    }
    let str = `${this.head.element}`
    let current = this.head.next
    for(let i = 1; i < this.count && current != null; i++) {
      str = `${str},${current.element}`
      current = current.next
    }
    return str
  }

  // 获取指定索引的节点
  getElementAt(index) {
    if(index >= 0 && index < this.count) {
      let node = this.head
      for(let i = 0; i < index && node !== null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

}

const link = new LinkedList()

link.push(5)
link.push(8)
link.push(10)
link.push(12)
// let removeAtItem = link.removeAt(1)
link.insert(7, 2)
// let indexItem = link.indexOf(7)
// let remove = link.remove(10)

// console.log(link);
// console.log(removeAtItem);
// console.log(link);
// console.log(indexItem);
// console.log(remove);
// console.log(link);
console.log(link.toString());