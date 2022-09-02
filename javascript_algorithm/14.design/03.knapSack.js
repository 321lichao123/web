const knapSack = (capacity, weights, values, n) => {
  // 创建一个数组保存各种情况
  let ks = []
  // 对其进行初始化
  for (let i = 0; i <= n; i++) {
    ks[i] = []
  }
  // 外层循环控制那个物品个数
  for (let i = 0; i <= n; i++) {
    // 内层循环是控制重量
    for (let w = 0; w <= capacity; w++) {
      // 如果个数或者重量为0，则将结果设置为0，添加到数组中
      if (w === 0 || i === 0) {
        ks[i][w] = 0
      } else if (weights[i - 1] <= w) {
        // 物品的重量必须小于限制的重量
        // 计算当前的值是否比前一个值大
        const a = values[i - 1] + ks[i - 1][w - weights[i - 1]] // 加上前一个循环已经添加的重量
        const b = ks[i - 1][w] // 去前一个循环的当前w的值
        // 如果大则将新的值填入，否则填入之前的值，保证数组的最后一项是最大值
        ks[i][w] = a > b ? a : b
      } else {
        // 如果不满足，则将请一个值赋值给后面的
        ks[i][w] = ks[i - 1][w]
      }
    }
  }
  return ks[n][capacity]
}

const values = [3, 4, 5],
  weights = [2, 3, 4],
  capacity = 5,
  n = values.length;
console.log(knapSack(capacity, weights, values, n))