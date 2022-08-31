const countingSort = arr => {
  // 如果数组的长度小于2则不需要排序
  if(arr.length < 2) {
    return arr
  }
  // 找出数组的最大值
  const maxValue = findMaxValue(arr)
  // 根据最大值创建固定的数组长度
  const count = new Array(maxValue + 1)
  // 遍历数组,先count数组添加元素
  for(let i = 0; i < arr.length; i++) {
    const element = arr[i]
    // 如果数组中没有这个项则将其element赋值为count的索引
    if(!count[element]) {
      count[element] = 0
    }
    count[element]++
  }
  // 用于计数，是有用想通项
  let countIndex = 0
  for(let i = 0; i < count.length; i++) {
    let element = count[i]
    // 如果当前element大于1则表示原数组用多个想通的项
    while(element > 0) {
      // 对相同的项，则将索引累加赋值相同的值
      arr[countIndex++] = i
      element--
    }
  }
  return arr
}

const findMaxValue = arr => {
  let max = 0
  for(let i = 0; i < arr.length; i++) {
    if(max < arr[i]) {
      max = arr[i]
    }
  }
  return max
}

const newArray = countingSort([3, 5, 1, 8, 5, 7, 2]);
console.log(newArray, '----2222');