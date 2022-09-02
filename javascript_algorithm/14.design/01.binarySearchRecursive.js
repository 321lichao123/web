const Comapre = {
  LESS_THAN: -1,
  BIGGER_THEN: 1,
  EQUALS: 0
}

const DOES_NOT_EXIST = -1

const defaultCompare = (a, b) => {
  if(a === b) return Compare.EQUALS
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THEN
}

const swap = (array, a, b) => {
  let temp = array[a]
  array[a] = array[b]
  array[b] = temp
}

const quickSort = (array, comapreFn = defaultCompare) => {
  return quick(array, 0, array.length - 1, comapreFn)
}

const quick = (array, left, right, comapreFn) => {
  if(array.length < 2) {
    return array
  }
  let index = partition(array, left, right, comapreFn)
  if(left < index - 1) {
    partition(array, left, index - 1, comapreFn)
  }
  if(index < right) {
    partition(array, index, right, comapreFn)
  }
  return array
}

const partition = (array, left, right, comapreFn) => {
  const piovt = array[Math.floor(left + right) / 2]
  let i = left
  let j = right
  while(i <= j) {
    while(comapreFn(piovt, array[i]) === Compare.LESS_THAN) {
      i++
    }
    while(comapreFn(piovt, array[j]) === Compare.BIGGER_THEN) {
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

const binarySearchRecursive = (array, value, low, high, compareFn = defaultCompare) => {
  if(low <= high) {
    let mid = Math.floor((low + high) / 2)
    let element = array[mid]
    if(compareFn(array[element], value) === Compare.LESS_THAN) {
      binarySearchRecursive(array, value, mid + 1, high, compareFn)
    }else if(compareFn(array[element], value) === Compare.BIGGER_THEN) {
      binarySearchRecursive(array, value, low, mid - 1, compareFn)
    } else {
      return mid
    }
  }
  return DOES_NOT_EXIST
}

const binarySearch = (array, value, comapreFn = defaultCompare) => {
  const arr = quickSort(array)
  return binarySearchRecursive(array, value, 0, array.length - 1, comapreFn)
}