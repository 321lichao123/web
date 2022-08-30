const INF = Number.MAX_SAFE_INTEGER

const minKey = (key, visited) => {
  let min = INF
  let minIndex = -1
  for(let i = 0; i < key.length; i++) {
    if(visited[i] === false && key[i] < min) {
      min = key[i]
      minIndex = i
    }
  }
  return minIndex
}

const prim = graph => {
  // 定义MST的结果数组
  let parent = []
  // 定义顶点的数组
  let key = []
  // 定义被访问的顶点的数组
  let visited = []
  let length = graph.length
  // 初始化各个顶底 的距离和被访问的状态
  for(let i = 0; i < length; i++) {
    key[i] = INF
    visited[i] = false
  }
  // 初始化跟顶点的状态和值
  parent[0] = -1 // 因为根节点没有节点指向它
  key[0] = 0
  // 遍历计算其他的顶点与根顶点的距离
  for(let i = 0; i < length - 1; i++) {
    // 求出最小的key顶点
    const u = minKey( key, visited)
    // 设置顶点的状态为true表示被访问了，放在再次访问
    visited[i] = true
    // 遍历
    for(let v = 0; v < length; v++) {
      // 当这个顶点没有被访问、图上是存在的、距离不是无限大的、这个距离比之前的小
      if(graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v]
      }
    }
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

const parent = prim(graph);

console.log('Edge   Weight');
for (let i = 1; i < graph.length; i++) {
  console.log(parent[i] + ' - ' + i + '   ' + graph[i][parent[i]]);
}