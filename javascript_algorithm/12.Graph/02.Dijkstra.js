const INF = Number.MAX_SAFE_INTEGER

// 求两个数组中最小值
const minDistance = (dist, visited) => {
  let min = INF
  let minIndex = -1
  for(let i = 0; i < dist.length; i++) {
    if(visited[i] === false && dist[i] < min) {
      min = dist[i]
      minIndex = i
    }
  }
  return minIndex
}

const dijkstra = (graph, src) => {
  // 定义一个数组表示顶点之间的距离
  let dist = []
  // 定义一个数组表示顶点是否被访问
  let visited = []
  // 获取图的长度
  // const { length } = graph
  const length = graph.length
  // 遍历图，对各个顶点进行初始化
  for(let i = 0; i < length; i++) {
    dist[i] = INF
    visited[i] = false
  }
  // 设置源顶点的距离表示0
  dist[src] = 0
  // 遍历其他顶点
  for(let i = 0; i < length - 1; i++) {
    // 求出最小值的索引
    const u = minDistance(dist, visited)
    // 设置最小值对应的顶点被访问了
    visited[u] = true
    // 遍历图
    for(let v = 0; v < length; v++) {
      // 当这个顶点没有被访问、图上是存在的、距离不是无限大的、这个距离比之前的小
      if(!visited[v] && graph[u][v] !== 0 && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v]
      }
    }
  }
  return dist
}

var graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 2, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
]

const dist = dijkstra(graph, 0)

console.log(dist);

for(let i = 0; i < dist.length; i++) {
  console.log(i + '\t\t' + dist[i]);
}