const Compare = {
  LESS_THAN: -1,
  BIGGER_THEN: 1,
  EQUALS: 0
}


// 用于比较节点值是否相等
function defaultCompare(a, b) {
  if(a === b) {
    return Compare.EQUALS
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THEN
}

function swap(arr, a, b) {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp 
}

class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.heap = []
    this.compareFn = compareFn
  }

  // 获取左节点索引
  getLeftIndex(index) {
    return (2 * index) + 1
  }

  // 获取右节点索引
  getRightIndex(index) {
    return (2 * index) + 2
  }

  // 获取父节点索引
  getParentIndex(index) {
    if(index === 0) {
      return undefined
    }
    return Math.floor((index - 1) / 2)
  }

  // 返回二叉堆的长度
  size() {
    return this.heap.length
  }

  // 判断二叉堆是否为空
  isEmpty() {
    return this.size() <= 0
  }

  clear() {
    this.heap = []
  }

  // 返回最小值
  findMininum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  // 插入值
  insert(value) {
    // 判断插入的值是否是null
    if(value !== null) {
       const index = this.heap.length
      // 如果不是null,则直接插入到数组的最后面
      this.heap.push(value)
      // 判断插入的值跟父节点的值比较
      this.siftUp(index)
      return true
    }
    return false
  }

  // 上移操作
  siftUp(index) {
    // 获取父节点的索引
    let parent = this.getParentIndex(index)
    // 遍历比较子节点与父节点的值
    // 判断子节点是否比父节点大
    while(index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THEN) {
      // 交换子夫节点值
      swap(this.heap, parent, index)
      // 重新赋值index
      index = parent
      // 计算新的父节点索引值
      parent = this.getParentIndex(index)
    }
  }

  // 移除最小值
  extract() {
    // 如果堆为空，则直接返回undefined
    if(this.isEmpty()) {
      return undefined
    }
    // 如果堆只有一个值，则直接删除
    if(this.size() === 1) {
      this.heap.unshift()
    }
    // 需要移除的值
    const removeValue = this.heap[0]
    // 重新设置头部
    this.heap[0] = this.heap.pop()
    // 下移操作
    this.siftDown(0)
    // 返回删除的值
    return removeValue
  }

  // 下移操作
  siftDown(index) {
    let element = index
    // 获取左右节点索引
    let left = this.getLeftIndex(index)
    let right = this.getRightIndex(index)
    let size = this.size()
    // 判断当前元素与子节点的大小
    if(left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THEN) {
      // 如果当前元素比子节点小
      // 将左节点赋值给当前索引
      element = left
    }
    // 判断当前元素与右节点的大小
    if(right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THEN) {
      // 如果当前元素比子节点小
      // 将左节点赋值给当前索引
      element = right
    }
    // 排除与自己的对比
    if(element !== index) {
      // 交换值
      swap(this.heap, index, element)
      this.siftDown(element)
    }
  }
}

const heap = new MinHeap()

// heap.insert(2)
// heap.insert(3)
// heap.insert(4)
// heap.insert(5)
for (let i = 1; i < 10; i++) { 
  heap.insert(i); 
 }

console.log(heap);

// heap.insert(1)
console.log(heap.extract())

console.log(heap);