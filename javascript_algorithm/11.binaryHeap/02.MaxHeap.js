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

// 反向对比
function reverseCompare(callback) {
  return (a, b) => callback(b, a)
}

// 交换值
function swap(arr, a, b) {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp 
}

class MaxHeap{
  constructor(compareFn = defaultCompare) {
    this.heap = []
    this.compareFn = compareFn
    this.reverseCompare = reverseCompare
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

  size() {
    return this.heap.length
  }

  isEmpty() {
    return this.size() <= 0
  }

  clear() {
    this.heap = []
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  insert(value) {
    if(value !== null) {
      const index = this.heap.length
      this.heap.push(value)
      this.siftUp(index)
      return true
    }
    return false
  }

  siftUp(index) {
    let parent = this.getParentIndex(index)
    while(index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THEN) {
      swap(this.heap, parent, index)
      index = parent
      parent = this.getParentIndex(index)
    }
  }

  // 下移
  siftDown(index) {
    let element = index
    let left = this.getLeftIndex(index)
    let right = this.getRightIndex(index)
    let size = this.size()

    if(left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THEN) {
      element = left
    }

    if(right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THEN) {
      element = right
    }

    if(element !== index) {
      swap(this.heap, index, element)
      this.siftDown(element)
    }
  }
}

const maxHeap = new MaxHeap(); 
maxHeap.insert(2); 
maxHeap.insert(3); 
maxHeap.insert(4); 
maxHeap.insert(5); 
maxHeap.insert(1); 
console.log(maxHeap);
console.log('Heap size: ', maxHeap.size()); // 5 
console.log('Heap min value: ', maxHeap.findMinimum()); // 5

// 堆化
function heapify(array) {
  // 判断参数是否存在
  if(array) {
    this.heap = array
  }
  // 求中间的index
  const maxIndex = Math.floor(this.size() / 2) - 1
  // 遍历下移
  for(let i = 0; i <= maxIndex; i++) {
    this.siftDown(i)
  }
  return this.heap
}

// 堆排序
function sortHeap(array) {
  let heapSize = array.length
  // 用数组创建一个最大堆用作源数据
  this.buildMaxHeap(array)
  // 遍历堆
  while(heapSize > -1) {
    // 将堆的首项与尾项互换
    swap(array, 0, --heapSize)
    // 对数组堆化
    heapify(array)
  }
}

// 创建最大的堆
function buildMaxHeap(array) {
  for(let i = Math.floor(array.length / 2) - 1; i >= 0; i++) {
    heapify(array, i, array.length, compareFn)
  }
  return array
}