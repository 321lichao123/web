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

const bucketSort = (arr, bucketSize = 5) => {
  if(arr.length < 2) {
    return arr
  }
  const buckets = createBucket(arr, bucketSize)
  return sortBucket(buckets)
}

const createBucket = (arr, bucketSize) => {
  // 找出数组中最大值和最小值
  let minValue = arr[0]
  let maxValue = arr[0]
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] < minValue) {
      minValue = arr[i]
    } else if (arr[i] > maxValue) {
      maxValue = arr[i]
    }
  }
  //  创建桶的数量
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  let buckets = []
  // 初始化每个桶，创建矩阵
  for(let i = 0; i < bucketCount; i++) {
    buckets[i] = []
  }
  // 遍历数组，将每一项放入合适的桶中
  for(let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - minValue) / bucketSize)
    buckets[bucketIndex].push(arr[i])
  }
  return buckets
}

const sortBucket = (buckets) => {
  let sortedArr = []
  for(let i = 0; i < buckets.length; i++) {
    if(buckets[i] !== null) {
      insertionSort(buckets[i])
      sortedArr.push(...buckets[i])
    }
  }
  return sortedArr
}

const insertionSort = (arr, compareFn = defaultCompare) => {
  const { length } = arr
  let temp
  for(let i = 1; i < length; i++) {
    let j = i
    temp = arr[j]
    while(j > 0 && compareFn(arr[j - 1], temp) === Compare.BIGGER_THEN) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = temp
  }
  return arr
}

const arr = bucketSort([5, 4, 3, 2, 6, 1, 7, 10, 9, 8])

console.log(arr);