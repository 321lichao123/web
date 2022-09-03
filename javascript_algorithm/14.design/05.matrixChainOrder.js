// 相连矩阵相乘
const matrixChainOrder = p => {
  // 获取矩阵的个数
  let n = p.length
  // 定义一个二维数组
  let m = []
  // 初始化二维数组
  for(let i = 0; i <= n; i++) {
    m[i] = []
    m[i][i] = 0
  }
  // 从二维数组的斜边遍历
  for(let l = 2; l < n; l++) {
    // 矩阵的纵轴的遍历
    for(let i = 1; i <= (n - l) + 1; i++) {
      // 计算矩阵的横轴
      const j = (i + l) - 1
      m[i][j] = Number.MAX_SAFE_INTEGER
      // 计算当前i~j矩阵的分割k
      for(let k = i; k <= j - 1; k++) {
        // 计算m[i][j]的值
        const q = m[i][k] + m[k + 1][j] + (p[i - 1]* p[k] * p[j])
        // 比较当前的计算值与之前的对比
        if(q < m[i][j]) {
          // 如果最前的小于现在的计算值，则将之前的赋值给当前的数组位置
          m[i][j] = q
        }
      }
    }
  }
  return m[1][n - 1]
}

const p = [10, 100, 5, 50, 1]; 
console.log(matrixChainOrder(p));