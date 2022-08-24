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
}