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

// 归并排序
// 是一种分而治之算法。其思想是将原始数组切分成较小的数组，直到每个小数组只
// 有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组
const mergeSort = (arr, compareFn = defaultCompare) => {
  // 判断数组长度是否大于1
  if(arr.length > 1) {
    // 获取数组长度
    const { length } = arr
    // 计算数组的中间索引
    const middle = Math.floor(length / 2)
    // 分割数组，并递归分割数组
    const left = mergeSort(arr.slice(0, middle), compareFn)
    const right = mergeSort(arr.slice(middle), compareFn)
    // 在合并数组
    arr = merge(left, right, compareFn)
  }
  return arr
}

const merge = (left, right, compareFn) => {
  // 定义用来迭代左边数组、右边数组的索引和返回合并数组
  let i = 0
  let j = 0
  let result = []
  // 遍历左右数组，并比较两个数组那个值小添加到结果数组中
  while(i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++])
  }
  // 将剩余的数组中的数据合并到结果数组中
  // 如果i小于左边的数组长度，则表示左边数组还有剩余没有添加到结果数组中，否则右边没有添加完
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
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
const newArray = mergeSort(array);
console.log(newArray, '----2222');