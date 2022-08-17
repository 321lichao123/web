class Node {
  constructor(element) {
    this.prev = undefined
    this.element = element
    this.next = undefined
  }
}

function defaultEquals(a, b) {
  return a === b
}

class CircularLinkedList {
  constructor(equals = defaultEquals) {
    // 用于计数
    this.count = 0
    // 设置链表的头节点
    this.head = undefined
    // 最后一个元素的引用
    this.tail = undefined
    // 判断值是否相等
    this.equals = equals
  }

  push(element) {
    let node = new Node(element)
    if(this.head == null) {
      this.head = node
      this.tail = node
    } else {
      let current = this.head
      while(current.next != null) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  insert(element, index) {
    // 判断index是否越界
    if(index >= 0 && index <= this.count) {
      let node = new Node(element)
      // 使用变量保存头节点
      let current = this.head
      // 链表第一项添加元素
      if(index === 0) {
        // 如果头节点为null，则表示链表为空
        if(this.head == null) {
          // 则直接将节点赋值给头节点
          this.head = node
          // 在将头节点赋值给node.next形成循环
          node.next = this.head
        } else {
          // 如果链表不为空
          // 则将原头节点赋值给node.next
          node.next = current
          // 获取最后一项
          current = this.getElementAt(this.size())
          // node赋值head，更新添加元素之后的头节点
          this.head = node
          // 将头节点赋值给最后一个节点的next形成循环
          current.next = this.head
        }
      } else {
        // 获取要插入元素的前一个节点
        let previous = this.getElementAt(index - 1)
        // 将previous.next赋值给node.next，从而将node与下个节点链接起来
        node.next = previous.next
        // 将node赋值给previous.next，从而将node与前一个几点关联起来
        previous.next = node
        // 错误的赋值
        // // 获取原节点的后一个节点
        // current = previous.next
        // // 将node赋值给previous.next
        // previous.next = node
        // // 将current.prev赋值给node
        // current.prev = node
      }
      this.count++
    }
    return false
  }

  removeAt(index) {
    // 判断index越界
    if(index >= 0 && index < this.count) {
      // 将头部赋值给临时变量
      let current = this.head
      // index为0则表示删除头元素
      if(index === 0) {
        // this.count为1则表示只有一个元素
        if(this.count === 1) {
          // 则直接将头节点赋值为null
          this.head = null
        } else {
          // 定了临时变量保存需要删除的头节点
          const remove = this.head
          // 获取最后一项
          current = this.getElementAt(this.count)
          // 将头节点重新赋值
          this.head = remove.next
          // 将最后一项的next指向新的头节点
          current.next = this.head
          // 返回需要删除的节点
          current = remove
        }
      } else {
        // 找到需要删除的元素前一个
        let previous = this.getElementAt(index - 1)
        // 临时变量保存签一下next的指向
        current = previous.next
        // 在赋值给前一个next
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return -1
  }

  size() {
    return this.count
  }

  toString() {
    if(this.head == null) {
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

  getElementAt(index) {
    if(index >= 0 && index < this.count) {
      let node = this.head
      for(let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }
}

const link = new CircularLinkedList()

link.push(5)
link.push(10)
link.push(15)
link.push(20)

console.log(link.toString());

link.insert(18, 2)

console.log(link.toString());

link.removeAt(3)
console.log(link.toString());
