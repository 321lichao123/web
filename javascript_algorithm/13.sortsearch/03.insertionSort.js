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


// 插入排序
// 插入排序每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了。接着，
// 它和第二项进行比较——第二项是应该待在原位还是插到第一项之前呢？这样，头两项就已正确
// 排序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢），以此类推
// 排序小型数组时，此算法比选择排序和冒泡排序性能要好
const insertionSort = (arr, compareFn = defaultCompare) => {
  // 获取数组的长度
  const { length } = arr
  // 定义一个临时变量
  let temp
  // 遍历数组
  // 假定一项已经排序，因此用1开始遍历
  for(let i = 1; i < length; i++) {
    // 定义一个索引的临时变量
    let j = i
    // 将当前项赋值给临时变量
    temp = arr[i]
    // 循环判断比较判断当前项的位置
    while(j > 0 && compareFn(arr[j - 1], temp) === Compare.BIGGER_THEN) {
      // 如果前一项比当前项大
      // 将当前项的前一项跟当前项交换
      arr[j] = arr[j - 1]
      // 对临时索引变量递减，寻找当前项的合适位置
      j--
    }
    // 将临时变量赋值给arr[j]
    arr[j] = temp
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
const newArray = insertionSort(array);
console.log(newArray, '----2222');