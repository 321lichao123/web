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

const quickSort = (array, compareFn = defaultCompare) => {
  return quick(array, 0, array.length, compareFn)
}

const quick = (array, left, right, compareFn) => {
  let index
  if(array.length > 1) {
    index = partition(array, left, right, compareFn)
    if(index > left) {
      quick(array, left, index - 1, compareFn)
    }
    if(index < right) {
      quick(array, index, right, compareFn)
    }
  }
  return array
}

const partition = (array, left, right, compareFn) => {
  const piovt = array[Math.floor((left + right) / 2)]
  let i = left
  let j = right
  while(i <= j) {
    while(compareFn(array[i], piovt) === Compare.LESS_THAN) {
      i++
    }
    while(compareFn(array[j], piovt) === Compare.BIGGER_THEN) {
      j--
    }
    if(i <= j) {
      swap(array, i, j)
      i++
      j--
    }
  }
  return array
}

// 二分搜索
// 这个算法要求被搜索的数据结构已排序
const binarySearch = (array, value, compareFn = defaultCompare) => {
  // 排序数组
  const sortArr = quickSort(array)
  // 定义左右指针
  let low = 0
  let high = array.length - 1
  // 判断左指针是否小于等与右指针
  while(lessOrEquals(low, high, compareFn)) {
    // 计算中间索引
    let mid = Math.floor((low + high) / 2)
    // 获取中间索引的值
    const element = sortArr[mid]
    // 判断中间值是否比value小
    if(compareFn(element, value) === Compare.LESS_THAN) {
      // 如果中间值比value小则表明value在mid的右边
      // 所以将low改成mid + 1（中间索引右移一位）
      low = mid + 1
    } else if (compareFn(element, value) === Compare.BIGGER_THEN) {
      // 如果中间值比value大则表明value在mid的左边
      // 所以将high改成mid - 1（中间索引左移一位）
      high = mid - 1
    } else {
      return mid
    }
  }
  return DOES_NOT_EXIST
}

const lessOrEquals = (low, high, compareFn) => {
  const reuslt = compareFn(low, high)
  return reuslt === Compare.LESS_THAN || reuslt === Compare.EQUALS
}

const index = binarySearch([8, 7, 6, 5, 4, 3, 2, 1], 2)
console.log(index);
