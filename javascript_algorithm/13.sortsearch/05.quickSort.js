const Compare = {
  LESS_THAN: -1,
  BIGGER_THEN: 1,
  EQUALS: 0
}

const defaultCompare = (a, b) => {
  if(a === b) {
    return Compare.EQUALS
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THEN
}

const swap = (arr, i, j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// 快速排序
const quickSort = (arr, compareFn = defaultCompare) => {
  return quick(arr, 0, arr.length - 1, compareFn)
}

const quick = (arr, left, right, compareFn) => {
  // 用来分割数组的
  let index
  if(arr.length > 1) {
    // 获取数组的主元索引用来分割数组
    index = partition(arr, left, right, compareFn)
    // 如果左边的索引小于主元的索引则递归继续找出新的主元索引
    if(left < index - 1) {
      quick(arr, left, index - 1, compareFn)
    }
    // 如果右边的索引大于主元的索引则递归继续找出新的主元索引
    if(index < right) {
      quick(arr, index, right, compareFn)
    }
  }
  return arr
}

const partition = (arr, left, right, compareFn) => {
  // 获取中间值
  const piovt = arr[Math.floor((left + right) / 2)]
  // 定义两个指针
  let i = left
  let j = right
  while(i <= j) {
    // 遍历找出左边比中间值大的索引
    while(compareFn(arr[i], piovt) === Compare.LESS_THAN) {
      i++
    }
    // 遍历找出右边比中间值小的索引
    while(compareFn(arr[j], piovt) === Compare.BIGGER_THEN) {
      j--
    }
    // 如果i小于j，则交换两个值
    if(i <= j) {
      swap(arr, i, j)
      i++
      j--
    }
  }
  return i
}

function createNonSortedArray(){
  var array = [];
  for (let i = 5; i > 0; i--){
      array.push(i);
  }
  return array;
}

let array = createNonSortedArray()
console.log(array, '----1111');
const newArray = quickSort([3, 5, 1, 6, 4, 7, 2]);
console.log(newArray, '----2222');