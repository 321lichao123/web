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

// 选择排序
// 是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推
const selectionSort = (arr, compareFn = defaultCompare) => {
  // 获取数组 的长度
  const { length } = arr
  // 定义变量来记录最小值的缩影
  let minIndex
  // 第一层遍历控制迭代次数
  for(let i = 0; i < length; i++) {
    // 对minIndex赋值
    minIndex = i
    // 内循环比较当前值与最小值
    for(let j = i; j < length; j++) {
      // 比较两个值
      if(compareFn(arr[minIndex], arr[j]) === Compare.BIGGER_THEN) {
        // 如果minIndex的值比j大则将j赋值给minIndex
        minIndex = j
      }
    }
    // 如果minIndex不等于i则表示当前minIndex的值更小
    if(minIndex !== i) {
      swap(arr, i, minIndex)
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
const newArray = selectionSort(array);
console.log(newArray, '----2222');