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

const defaultEquals = (a, b) => {
  return a === b
}

const defaultDiff = (a, b) => {
  return Number(a) - Number(b)
}

const biggerOrEquals = (a, b, compareFn) => {
  const reuslt = compareFn(a, b)
  return reuslt === Compare.BIGGER_THEN || reuslt === Compare.EQUALS
}

const lessOrEquals = (a, b, compareFn) => {
  const reuslt = compareFn(a, b)
  return reuslt === Compare.LESS_THAN || reuslt === Compare.EQUALS
}

const interpolationSearch = (array, value, compareFn = defaultCompare, equalsFn = defaultEquals, diffFn = defaultDiff) => {
  const { length } = array
  // 定义左右指针
  let low = 0
  let high = array.length - 1
  // 定义位置
  let position = -1
  let delta = -1
  // 遍历
  // 判断左指针小于右指针并且value要大于数组左边值且小于数组右边值
  while(
    low <= high &&
    biggerOrEquals(value, array[low], compareFn) &&
    lessOrEquals(value, array[high], compareFn)
  ) {
    delta = diffFn(value, array[low]) / diffFn(array[high], array[low])
    position = low + Math.floor((low + high) * delta)
    if(equalsFn(array[position], value)) {
      return position
    }
    if(compareFn(array[position], value) === Compare.LESS_THAN) {
      low = position + 1
    }
    if (compareFn(array[position], value) === Compare.BIGGER_THEN) {
      high = position - 1
    }
  }
  return DOES_NOT_EXIST
}

const index = interpolationSearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)
console.log(index);