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

const swap = (arr, a, b) => {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

// 原始版冒泡排序
const bubbleSort = (arr, compareFn = defaultCompare) => {
  const { length } = arr
  for(let i = 0; i < length; i++) {
    for(let j = 0; j < length - 1; j++) {
      if(compareFn(arr[j], arr[j + 1]) === Compare.BIGGER_THEN) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}

// 改良版冒泡排序
const modifiedBubbleSort = (arr, compareFn = defaultCompare) => {
  const { length } = arr
  for(let i = 0; i < length; i++) {
    // 去除已经比较后的值
    for(let j = 0; j < length - 1 - i; j++) {
      if(compareFn(arr[j], arr[j + 1]) === Compare.BIGGER_THEN) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
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
// const newArray = bubbleSort(array);
const newArray = modifiedBubbleSort(array);
console.log(newArray, '----2222');