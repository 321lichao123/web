const INF = Number.MAX_SAFE_INTEGER

// 防止出现环
const find = (i, parent) => {
  // 如果当前索引存在，则更新当前索引
  while(parent[i]) {
    i = parent[i]
  }
  // 否则返回当前的索引
  return i
}

const union = (i, j, parent) => {
  // 如果u v不相等则表示不是同一条边添加到SMT中
  if(i !== j) {
    parent[j] = i
    return true
  }
  // 否则就是统一条边
  return false
}

// 初始化图的各个顶点的之间的权重
const initializeCost = graph => {
  let cost = []
  const { length } = graph
  // 遍历初始化，每个顶点的
  for(let i = 0; i < length; i++) {
    cost[i] = []
    for(let j = 0; j < length; j++) {
      // 判断每个顶点是否为0
      // 如果是最大值则将其置为无穷大
      if(graph[i][j] === 0) {
        cost[i][j] = INF
      } else {
        cost[i][j] = graph[i][j]
      }
    }
  }
  return cost
}

const kruskal = graph => {
  const { length } = graph
  // 定义MST的结果数组
  let parent = []
  // 定义变量控制循环的跳出的条件
  let ne = 0
  let a;
  let b;
  let u;
  let v;
  const cost = initializeCost(graph)
  while(ne < length - 1) {
    // 遍历找出最小的顶点
    for(let i = 0, min = INF; i < length; i++) {
      for(let j = 0; j < length; j++) {
        if(cost[i][j] < min) {
          // 如果当前的顶点小于最小值，则更新min
          min = cost[i][j]
          // 保存当前的顶点的位置
          a = u = i
          b = v = j
        }
      }
    }
    // 检查 MST 中是否已存在这条边，以避免环路
    u = find(u, parent)
    v = find(v, parent)
    // 如果 u 和 v 是不同的边，则将其加入 MST
    if(union(u, v, parent)) {
      ne++
    }
    // 从列表中移除这些边，以免重复计算
    cost[a][b] = cost[b][a] = INF;
  }
  return parent
}


const graph = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0]
];


const parent = kruskal(graph);

console.log('Edge   Weight');
for (i = 1; i < graph.length; i++) {
  console.log(parent[i] + ' - ' + i + '   ' + graph[i][parent[i]]);
}