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

// 广度优先搜索
const breadthFristSearch = (graph, startVertex, callback) => {

}

class Queue {
  constructor() {
    
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