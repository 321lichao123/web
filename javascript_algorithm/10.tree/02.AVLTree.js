class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.rigth = null
  }
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THEN: 1
}

function defaultCompare(a, b) {
  if(a === b) {
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THEN
}

// 计算节点的高度
function getNodeHeight(node) {
  if(node === null) {
    return -1
  }
  return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.rigth)) + 1
}

// 平衡因子的数值
const BalanceFactor = {
  UNBALANCED_RIGHT: 1, 
  SLIGHTLY_UNBALANCED_RIGHT: 2, 
  BALANCED: 3, 
  SLIGHTLY_UNBALANCED_LEFT: 4, 
  UNBALANCED_LEFT: 5
}

class AVLTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.root = null
  }

  // 计算节点的平衡因子
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.rigth)
    switch(heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }

  // 左-左（LL）：向右的单旋转
  // 这种情况出现于节点的左侧子节点的高度大于右侧子节点的高度时，
  // 并且左侧子节点也是平衡或左侧较重的
  rotationLL(node) {
    // 获取需要移动节点的左节点
    let temp = node.left
    // 将临时的左节点赋值给移动node.right
    node.rigth = temp.left
    // 在将整个节点赋值给临时节点的右边
    temp.rigth = node
    // 返回最新的树结构
    return temp
  }

  // 右-右（RR）：向左的单旋转
  rotationRR(node) {
    // 获取需要移动节点的右节点
    let temp = node.rigth
    // 将临时的左节点赋值给node.right
    node.rigth = temp.left
    // 就node节点赋值给临时节点的左边
    temp.left = node
    // 返回最新的树结构
    return node
  }

  // 左-右（LR）：向右的双旋转
  // 这种情况出现于左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重
  // 我们可以对左侧子节点进行左旋转来修复，这样会形成左左的情况，
  // 然后再对不平衡的节点进行一个右旋转来修复
  rotationLR(node) {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }

  // 右-左（RL）：向左的双旋转
  // 这种情况出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点左侧较重
  // 在这种情况下我们可以对右侧子节点进行右旋转来修复，这样会形成右-右的情况，
  // 然后我们再对不平衡的节点进行一个左旋转来修复
  rotationRL(node) {
    node.right = this.rotationLL(node.right); 
    return this.rotationRR(node);
  }

  insert(key) {
    this.root = this.insertNode(this.root, key)
  }

  insertNode(node, key) {
    // 判断插入的位置
    if(node === null) {
      return new Node(key)
    } else if(this.compareFn(key, node.key) ===  Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key)
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THEN) {
      node.right = this.insertNode(node.right, key)
    } else {
      return node
    }
    // 判断插入的文件是否需要平衡树
    const balanceFactor = this.getBalanceFactor(node)
    if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if(this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node)
      } else {
        return this.rotationLR(node)
      }
    } else if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if(this.compareFn(key, node.right.key) === Compare.BIGGER_THEN) {
        node = this.rotationRR(node)
      } else {
        return this.rotationRL(node)
      }
    }
    return node
  }

  remove(node, key) {
    if(node === null) {
      return false
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.remove(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THEN) {
      node.right = this.remove(node.right, key)
      return node
    } else {
      if(node.left === null && node.right === null) {
        node = null
        return node
      } else if (node.left !== null && node.right === null) {
        node = node.left
        return node
      } else if (node.right !== null && node.left === null) {
        node = node.right
        return node
      } else {
        const aux = this.minNode(node.right)
        node.key = aux.key
        this.remove(node.right, aux.key)
        return node
      }
    }
  }

  removeNode(key) {
    let node = this.remove(this.root, key)
    if(node === null) {
      return node
    }
    const balanceFactor = this.getBalanceFactor(node)
    if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left)
      if(balanceFactorLeft === BalanceFactor.BALANCE || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationLL(node)
      }
      if(balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left)
      }
    } else if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right)
      if(balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationRR(node)
      }
      if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right)
      }
    }
    return node
  }

  minNode(node) {
    let current = node
    while(current !== null && current.left !== null) {
      current = current.left
    }
    return current
  }
}