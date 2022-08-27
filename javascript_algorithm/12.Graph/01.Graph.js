function defaultToString(key) {
  if(key === null) {
    return 'NULL'
  }
  if (key === undefined) {
    return 'UNDEFINED'
  }
  if (typeof key === 'string' && key instanceof String) {
    return `${key}`
  }
  return key.toString()
}

const Colors = { 
  WHITE: 0,  // 表示顶点没有被访问
  GREY: 1,  // 表示顶点已经被访问了，但并没有被探索过
  BLACK: 2  // 表示顶点被访问且完全被探索过
 }

// 初始化顶点的颜色
const initializeColor = vertices => {
  const color = {}
  for(let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE
  }
  return color
}

const printVertex = value => console.log('Visited vertex:' + value);

// 广度优先搜索
const breadthFristSearch = (graph, startVertex, callback) => {
  // 获取顶点的数量
  let vertices = graph.getVertices()
  // 获取相连顶点的数量
  let adjList = graph.getAdjList()
  // 初始化顶点的颜色
  const colors = initializeColor(vertices)
  // 创建队列
  let queue = new Queue()
  // 将顶点添加到队列中
  queue.enqueue(startVertex)
  // 遍历队列，访问各个顶点
  while(!queue.isEmpty()) {
    // 取出第一个顶点
    const u = queue.dequeue()
    // 将第一个顶点的颜色设置为灰色
    colors[u] = Colors.GREY
    // 获取各个顶点的相连顶点
    const neighbors = adjList.get(u)
    // 遍历顶点相连的顶点
    for(let i = 0; i < neighbors.length; i++) {
      // 获取每个顶点
      const w = neighbors[i]
      // 判断顶点是否是白色
      if(colors[w] === Colors.WHITE) {
        // 如果是白色，将顶点颜色只会灰色，并添加到队列中
        colors[w] = Colors.GREY
        queue.enqueue(w)
      }
    }
    // 遍历结束将当前节点置为黑色
    colors[u] = Colors.BLACK
    // 如果回调函数存在则执行回调函数
    if(callback) {
      callback(u)
    }
  }
}

// 最短路径
const BFS = (graph, startVertex) => {
  // 获取图的顶点
  let vertices = graph.getVertices()
  // 获取各个顶点相连的顶点
  let adjList = graph.getAdjList()
  // 初始化各个顶点的颜色
  let colors = initializeColor(vertices)
  // 创建一个变量用来保存各个顶点之间的距离
  let distances = {}
  // 创建一个对象用来保存各个顶点之前的顶点
  let predecessors = {}
  // 创建队列
  const queue = new Queue()
  // 将开始顶点添加到队列中
  queue.enqueue(startVertex)
  // 遍历各个顶点对其的距离进行初始化
  for(let i = 0; i < vertices.length; i++) {
    const u = vertices[i]
    distances[u] = 0
    predecessors[u] = null
  }
  // 遍历队列
  while(!queue.isEmpty()) {
    // 取出第一个顶点
    const u = queue.dequeue()
    // 获取这个顶点的相连的顶点
    const neighbors = adjList.get(u)
    // 将当前的节点置灰
    colors[u] = Colors.GREY
    // 遍历相连的顶点
    for(let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      // 判断当前相连的顶点是否是白色的
      if(colors[w] === Colors.WHITE) {
        // 如果当前的顶点是白色，则将这个顶点添加到队列中
        // 并将顶点的颜色置为灰色
        // 并将这个顶点与顶点的距离加1
        colors[w] = Colors.GREY
        distances[w] = distances[u] + 1
        predecessors[w] = u
        queue.enqueue(w)
      }
      // 将当前的顶点只会黑色
      colors[u] = Colors.BLACK
    }
  }
  // 返回各个顶点的距离
  return {
    distances,
    predecessors
  }
}

const printPath = (vertices, pathA) => {
  // 定义源头顶点
  let fromVertex = vertices[0]
  // 遍历其他顶点
  for(let i = 1; i < vertices.length; i++) {
    // 定义一个变量接受其他顶点
    let toVertex = vertices[i]
    // 定义一个栈来接受顶点直接路径
    let path = new Stack()
    // 遍历其他是源顶点的顶点
    for(let v = toVertex; v != fromVertex; v = pathA.predecessors[v]) {
      path.push(v)
    }
    // 将源顶点添加到栈中
    path.push(fromVertex)
    // 从栈中取出节点
    let s = path.pop()
    // 遍历取出顶点
    while(!path.isEmpty()) {
      s = s + ' - ' + path.pop()
    }
    console.log(s);
  }
}

// 深度优先搜索
const depthFirstSearch = (graph, callback) => {
  // 获取图的各个顶点
  let vertices = graph.getVertices()
  // 获取各个顶点的相连的顶点
  let adjList = graph.getAdjList()
  // 初始化各个顶点的颜色
  let colors = initializeColor(vertices)
  // 遍历节点数组
  for(let i = 0; i < vertices.length; i++) {
    const u = vertices[i]
    // 判断当前的节点是否是白色
    if(colors[u] === Colors.WHITE) {
      // 如果当前的节点是白色则沿着这个先继续遍历
      depthFirstSearchVisit(u, colors, adjList, callback)
    }
  }
}

const depthFirstSearchVisit = (u, colors, adjList, callback) => {
  // 将当前的节点置灰,表示已经访问了
  colors[u] = Colors.GREY
  // 如果有回调则执行回调
  if(callback) {
    callback(u)
  }
  // 获取当前顶点的相连节点
  const neighbors = adjList.get(u)
  // 遍历相连节点
  for(let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i]
    if(colors[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, colors, adjList, callback)
    }
  }
  // 将当前的节点置为黑色
  colors[u] = Colors.BLACK
}

const DFS = (graph) => {
  // 获取顶点
  let vertices = graph.getVertices()
  // 获取个顶点相连的顶点
  let adjList = graph.getAdjList()
  // 初始化各顶点的颜色
  let colors = initializeColor(vertices)
  // 表示发现顶点的时间
  let d = {}
  // 表示完成顶点探索的时间
  let f = {}
  // 表示顶点回溯的顶点
  let p = {}
  let time = {count: 0}
  // 遍历顶点，初始化各个顶点的
  for(let i = 0; i < vertices.length; i++) {
    const u = vertices[i]
    d[u] = 0
    f[u] = 0
    p[u] = null
  }
  // 遍历各个顶点
  for(let i = 0; i < vertices.length; i++) {
    // 判断当前的顶点是否是白色
    const u = vertices[i]
    if(colors[u] === Colors.WHITE) {
      // 访问当前顶点下的所有顶点
      DFSVisit(u, colors, d, f, p, time, adjList)
    }
  }
  return {
    discovery: d, 
    finished: f, 
    predecessors: p
  }
}

const DFSVisit = (u, colors, d, f, p, time, adjList) => {
  // 标记当前的已经访问的顶点颜色为灰色
  colors[u] = Colors.GREY
  // 记录当前访问的时间
  d[u] = ++time.count
  // 获取当前顶点的相邻顶点
  const neighbors = adjList.get(u)
  // 遍历相连顶点
  for(let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i]
    if(colors[w] === Colors.WHITE) {
      // 记录相连顶点的回溯顶点
      p[w] = u
      // 递归访问当前的顶点下的所有顶点
      DFSVisit(w, colors, d, f, p, time, adjList)
    }
  }
  // 将当前节点颜色只会黑色表示已经探索完当前的节点
  colors[u] = Colors.BLACK
  // 记录探索完这个顶点的时间
  f[u] = ++time.count
}

// 打印拓扑图
const printDAG = (result, vertices) => {
  const finishedTime = result.finished
  let str = ''
  for(let i = 0; i < vertices.length; i++) {
    let max = 0
    let maxName = null
    if(finishedTime[vertices[i]] > max) {
      max = finishedTime[vertices[i]]
      maxName = vertices[i]
    }
    str += ' - ' + maxName
    delete finishedTime[maxName]
  }
  return str
}

class Stack {
  constructor() {
    this.stack = []
  }

  push(element) {
    this.stack.push(element)
  }

  pop() {
    return this.stack.pop()
  }

  isEmpty() {
    return this.stack.length === 0
  }
}

class Queue {
  constructor() {
    this.queue = {}
    this.count = 0
    this.lowCount = 0
  }

  enqueue(element) {
    this.queue[this.count] = element
    this.count++
  }

  dequeue() {
    if(this.isEmpty()) {
      return undefined
    }
    const result = this.queue[this.lowCount]
    this.lowCount++
    return result
  }

  isEmpty() {
    return this.lowCount === this.count
  }
}

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  set(k, v) {
    if(k !== null && v !== null) {
      const key = this.toStrFn(k)
      this.table[key] = new ValuePair(k, v)
    }
    return false
  }

  get(k) {
    const valuepair = this.table[k]
    return valuepair ? valuepair.value : undefined
  }
}

class Graph {
  constructor(isDirected = false) {
    // 表示图是否有向
    this.isDirected = isDirected
    // 用来存储顶点
    this.vertices = []
    // 用来存储相连的顶点
    this.adjList = new Dictionary()
  }

  // 添加顶点
  addVertices(v) {
    // 判断图是否包含顶点
    if(!this.vertices.includes(v)) {
      // 将顶点添加顶点数组中
      this.vertices.push(v)
      // 创建这个顶点的相连的顶点字典表
      this.adjList.set(v, [])
    }
  }

  // 添加顶点之间的边
  addEdge(v, w) {
    // 判断v,w两个顶点是否在顶点数组中
    if(!this.vertices.includes(v)) {
      this.vertices.push(v)
    }
    if(!this.vertices.includes(w)) {
      this.vertices.push(w)
    }
    // 将w顶点添加v的相连顶点数组中
    this.adjList.get(v).push(w)
    // 判断图是不是有方向的
    // 如果没有方向则需要将v添加到w的相连节点数组中
    if(!this.isDirected) {
      this.adjList.get(w).push(v)
    }
  }

  // 返回顶点数据
  getVertices() {
    return this.vertices
  }

  // 返回相连顶点数据
  getAdjList() {
    return this.adjList
  }

  // 打印图
  toString() {
    let str = ''
    for(let i = 0; i < this.vertices.length; i++) {
      str += `${this.vertices[i]} ->`
      const neighbors = this.adjList.get(this.vertices[i])
      str += neighbors.join(' ')
      str += '\n'
    }
    return str
  }
}

const graph = new Graph()
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertices(myVertices[i])
}
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph.toString());

console.log("---------------------------------------------------");

console.log(breadthFristSearch(graph, myVertices[0], printVertex));

console.log("---------------------------------------------------");

const shortPathA = BFS(graph, myVertices[0])
console.log(shortPathA);

console.log("---------------------------------------------------");

printPath(myVertices, shortPathA)

console.log("---------------------------------------------------");

depthFirstSearch(graph, printVertex)

console.log("---------------------------------------------------");

console.log(DFS(graph));

console.log("---------------------------------------------------");

const graphDirected = new Graph(true)

const myVertices2 = ['A', 'B', 'C', 'D', 'E', 'F']; 
for (i = 0; i < myVertices2.length; i++) { 
  graphDirected.addVertices(myVertices2[i]); 
} 
graphDirected.addEdge('A', 'C'); 
graphDirected.addEdge('A', 'D'); 
graphDirected.addEdge('B', 'D'); 
graphDirected.addEdge('B', 'E'); 
graphDirected.addEdge('C', 'F'); 
graphDirected.addEdge('F', 'E'); 

const result = DFS(graphDirected);

console.log(result);

console.log("------------------------------------------");

console.log(printDAG(result, myVertices2))