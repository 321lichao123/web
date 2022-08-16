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

class DoublyLinkedList {
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

  // 向链表结尾添加元素添加
  push(element) {
    let node = new Node(element)
    // 如果head为null，则表示没有数据
    if(this.head == null) {
      // 则直接将node节点赋值给head和tail
      this.head = node
      this.tail = node
    } else {
      let current = this.head
      while(current.next != null) {
        current = current.next
      }
      current.next = node
      node.prev = current
    }
    this.count++
  }

  // 插入新的元素
  insert(element, index) {
    // 判断索引是否越界
    if(index >= 0 && index <= this.count) {
      // 定义一个临时变量保存头节点
      let current = this.head
      // 根据参数创建node节点
      let node = new Node(element)
      // 如果index为0则表示在头节点前添加元素
      if(index === 0) {
        // 判断头节点是否为空
        if(this.head == null) {
          // 如果头节点为空则将node节点直接赋值给头节点和尾节点
          this.head = node
          this.tail = node
        } else {
          // 如果头节点不为空
          // 将node.next 指定头节点
          node.next = this.head
          // 将原来的头节点head.prev指向node节点
          current.prev = node
          // 就node节点赋值给原来的head
          this.head = node
        }
      } else if (index === this.count) {
        // 如果index等于this.count表示在链表的最后一项添加元素
        // 将链表的尾节点赋值给临时变量
        current = this.tail
        // 将node赋值给尾节点tail.next
        current.next = node
        // 将node节点的node.prev指向尾节点
        node.prev = current
        // 将尾节点重新赋值
        this.tail = node
      } else {
        // 获取索引前一个节点
        const previous = this.getElementAt(index - 1)
        // 使用临时变量保存下个节点
        current = previous.next
        // 让node.next指向原来的下个节点
        node.next = current
        // current.pre指向node
        current.prev = node
        // 让previous.next指向node
        previous.next = node
        // 让node.prev指向previous
        node.prev = previous
      }
      this.count++
      return true
    }
    return false
  }

  // 根据索引删除指定的元素
  removeAt(index) {
    // 判断是否越界
    if(index >= 0 && index < this.count) {
      // 将头节点赋值给临时变量
      let current = this.head
      // index为0则表示删除头节点
      if(index === 0) {
        // 将头节点的next直接赋值给this.head
        this.head = current.next
        // 如果只有一个节点
        if(this.count === 1) {
          // 则将尾节点赋值为undefiend
          this.tail = undefined
        } else {
          // 否则将头节点的prev赋值为undefined
          this.head.prev = undefined
        }
      } else if(index === this.count - 1) {
        // 如果删除最后一项
        // 将尾节点赋值给临时变量
        current = this.tail
        // 将尾节点的前指向赋值给tail
        this.tail = current.prev
        // 将赋值后的尾节点next置为undefined
        this.tail.next = undefined
      } else {
        // 获取删除的当前项节点
        current = this.getElementAt(index)
        // 将当前项的前节店赋值给临时变量
        let previous = current.prev
        // 将当前项的后节点赋值给临时变量
        let next = current.next
        // 将previous.next指向当前项的下个节点
        previous.next = next
        // 将next.prev指向当前项的前节点
        next.prev = previous
      }
      this.count--
      return true
    }
    return false
  }

  // 打印链表
  toString(){
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
      for(let i = 0; i < index; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }
}

let doublyLinkedList = new DoublyLinkedList()

doublyLinkedList.push(5)
doublyLinkedList.push(10)
doublyLinkedList.push(15)
doublyLinkedList.push(20)
doublyLinkedList.insert(16, 2)

console.log(doublyLinkedList);
console.log(doublyLinkedList.toString());