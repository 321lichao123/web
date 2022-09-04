const minCoinChange = (coins, amount) => {
  // 用来保存适合的硬币
  let changes = []
  // 用来记录硬币的和
  let total = 0
  // 遍历硬币的种类
  for(let i = coins.length; i >= 0; i--) {
    const coin = coins[i]
    // 遍历判断当前硬币的是否符合
    while(total + coin <= amount) {
      // 如果符合添加到数组中
      changes.push(coin)
      // 对符合的硬币进行累加
      total += coin
    }
  }
  return changes
}

console.log(minCoinChange([1, 5, 10, 25], 36));