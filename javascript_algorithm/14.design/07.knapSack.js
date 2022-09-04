const knapSack = (capacity, weights, values) => {
  // 获取物品的重量和价值的长度
  let n = values.length
  // 定义一个变量保存已经添加的重量
  let load = 0
  // 定义一个变量保存已经添加的价值
  let val = 0
  // 遍历
  for(let i = 0; i < n && load < capacity; i++) {
    // 判断当前的重量是否超出限制的重量
    if(weights[i] <= capacity - load) {
      // 如果不超出则累加重量和价值
      load += weights[i]
      val += values[i]
    } else {
      // 计算剩余的重量占当前物品的重量的比例计算价值
      const r = (capacity - load) / weights[i]
      val += r * values[i]
      load += weights[i]
    }
  }
  return val
}

const values = [3,4,5], 
weights = [2,3,4], 
capacity = 6;
console.log(knapSack(capacity, weights, values));