// 定义节点类
class Node {
  constructor(key) {
    // 定义节点值
    this.key = key
    // 左侧子节点的引用
    this.left = null
    // 右侧子节点的引用
    this.right = null
  }
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THEN: 1
}

// 用于比较节点值是否相等
function defaultCompare(a, b) {
  if(a === b) {
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THEN
}

// 定义二叉树类
class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    // 定义根节点
    this.root = null
  }

  // 向二叉树添加元素
  insert(key) {
    // 判断根节点是否为null
    if(this.root === null) {
      // 如果为node则，直接将根据key创建节点赋值给根节点
      this.root = new Node(key)
    } else {
      // 否则查找适合的节点位置
      this.insertNode(this.root, key)
    }
  }

  // 查找适合的节点位置，插入节点
  insertNode(node, key) {
    // 判断需要插入的key是否比当前节点值小
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果key比当前节点值小，则向左节点赋值
      // 判断左节点是否为null，如果为null则直接将key创建的节点赋值给左节点
      if(node.left === null) {
        node.left = new Node(key)
      } else {
        // 如果左节点不为null，则递归查找合适的位置插入节点
        this.insertNode(node.left, key)
      }
    } else {
      // 如果key比当前节点值大，则向右节点赋值
      // 判断右节点是否为null，如果为null则直接将key创建的节点赋值给右节点
      if(node.right === null) {
        node.right = new Node(key)
      } else {
        // 如果右节点不为null，则递归查找合适的位置插入节点
        this.insertNode(node.right, key)
      }
    }
  }

  // 中序排序
  // 中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，
  // 也就是以从最小到最大的顺序访问所有节点。
  // 中序遍历的一种应用就是对树进行排序操作
  // callback用来定义对遍历到每个节点进行的操作
  // 这种模式也叫访问者模式
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }

  // 遍历每个节点，并进行操作
  inOrderTraverseNode(node, callback) {
    // 判断当前的节点是否为null,如果不为null，则继续执行
    if(node !== null) {
      // 递归左节点
      this.inOrderTraverseNode(node.left, callback)
      // 操作当前的节点
      callback(node)
      // 递归右节点
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  // 先序遍历
  // 先序遍历是以优先于后代节点的顺序访问每个节点的。
  // 先序遍历的一种应用是打印一个结构化的文档
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback) {
    if(node !== null) {
      callback(node)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  // 后序遍历
  // 后序遍历则是先访问节点的后代节点，再访问节点本身。
  // 后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode(node, callback) {
    if(node !== null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node)
    }
  }

  // 查找最小值
  min() {
    return this.minNode(this.root)
  }

  minNode(node) {
    let current = node
    // 对于二叉树搜索树而言，左侧的节点比右侧的节点小
    // 因此只需要遍历左侧树，找到最左侧的节点即可
    while(current !== null && current.left !== null) {
      current = current.left
    }
    return current
  }

  // 查找最大值
  max() {
    return this.maxNode(this.root)
  }

  maxNode(node) {
    let current = node
    // 对于二叉树搜索树而言，右侧的节点比左侧的节点大
    // 因此只需要遍历右侧树，找到最右侧的节点即可
    while(current !== null && current.right !== null) {
      current = current.right
    }
    return current
  }

  // 判断树结构是否包含某个值
  search(key) {
    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if(node === null) {
      return false
    }
    // 判断key是否比当前值小
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THEN) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  // 移除某个节点
  remove(key) {
    this.root = this.removeNode(this.root, key)
  }

  removeNode(node, key) {
    if(node === null) {
      return null
    }
    // 如果需要删除的key比当前节点小
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 则递归左节点查找需要删除的节点
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THEN) {
      // 如果需要删除的key比当前的节点大
      // 则递归右节点查找需要删除的节点
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      // 如果节点的key等于需要删除的key
      if(node.key === key) {
        // 删除的叶子节点
        if(node.left === null && node.right === null) {
          node = null
          return node
        } else if (node.left === null && node.right != null) {
          // 如果删除的节点没有左节点, 只有右节点
          node = node.right
          return node
        } else if (node.right === null && node.left !== null) {
           // 如果删除的节点没有右节点, 只有左节点
          node = node.left
          return node
        } else {
          // 如果删除的节点有左右节点
          // 查找右节点最小的key
          const aux = this.minNode(node.right, key)
          // 将最小的key替换需要删除的节点
          node.key = aux.key
          // 删除最小的key
          this.removeNode(node.right, aux.key)
          // 返回新的node
          return node
        }
      }
    }
  }
}

const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

console.log(tree);

console.log("------------------------------------------------------");

const printNode = node => console.log(node.key)

tree.inOrderTraverse(printNode)

console.log("------------------------------------------------------");

tree.preOrderTraverse(printNode)

console.log("------------------------------------------------------");

tree.postOrderTraverse(printNode)

console.log("------------------------------------------------------");

console.log(tree.min());
console.log(tree.max());

console.log("------------------------------------------------------");

console.log(tree.search(1));
console.log(tree.search(8));