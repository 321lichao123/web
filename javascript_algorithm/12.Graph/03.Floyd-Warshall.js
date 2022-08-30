const INF = Infinity

const floydWarshall = graph => {
  // 定义数组用来保存各个顶点的路径
  const dist = []
  const length = graph.length
  // 遍历图
  for(let i = 0; i < length; i++) {
    // 初始化各个顶点的路径
    dist[i] = []
    // 遍历图的各个顶点，计算各个顶点路径的距离
    for(let j = 0; j < length; j++) {
      if(i === j) {
        // 如果i等于j则表示是相同的顶点,初始化成0
        dist[i][j] = 0
      } else if (!isFinite(graph[i][j])) {
        // 判断两个顶点是否存在边
        // 如果不存在则设置为无穷大
        dist[i][j] = INF
      } else {
        dist[i][j] = graph[i][j]
      }
    }
  }
  // 遍历计算各个顶点的巨鹿
  for(let k = 0; k < length; k++) {
    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length; j++) {
        if(dist[k][j] + dist[i][k] < dist[i][j]) {
          dist[i][j] = dist[k][j] + dist[i][k]
        }
      }
    }
  }
  return dist
}

const graph = [
  [INF, 2, 4, INF, INF, INF],
  [INF, INF, 2, 4, 2, INF],
  [INF, INF, INF, INF, 3, INF],
  [INF, INF, INF, INF, INF, 2],
  [INF, INF, INF, 3, INF, 2],
  [INF, INF, INF, INF, INF, INF]
];

dist = floydWarshall(graph);

let s = '';
for (let i = 0; i < dist.length; ++i) {
  s = '';
  for (var j = 0; j < dist.length; ++j) {
    if (dist[i][j] === INF) s += 'INF ';
    else s += dist[i][j] + '   ';
  }
  console.log(s);
}