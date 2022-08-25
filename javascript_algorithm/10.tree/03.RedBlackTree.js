const Colors = {
  RED: 1,
  BLACK: 0
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

class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.rigth = null
    this.color = Colors.RED
    this.parent = null
  }

  isRed() {
    return this.color === Colors.RED
  }
}

class RedBlackTree {
  constructor(compareFn = defaultCompare) {
    this.root = null
    this.compareFn = compareFn
  }

  // 左-左（LL）：向右的单旋转
  // 这种情况出现于节点的左侧子节点的高度大于右侧子节点的高度时，
  // 并且左侧子节点也是平衡或左侧较重的
  rotationLL(node) {
    // 获取需要移动节点的左节点
    let temp = node.left
    // 将临时的左节点赋值给移动node.right
    node.rigth = temp.left
    if(temp.rigth && temp.right.key) {
      temp.right.parent = node
    }
    temp.parent = node.parent
    if(!node.parent) {
      this.root = temp
    } else {
      if(node === node.parent.left) {
        node.parent.left = temp
      } else {
        node.parent.rigth = temp
      }
    }
    temp.rigth = node
    node.parent = temp
  }

  // 右-右（RR）：向左的单旋转
  rotationRR(node) {
    // 获取需要移动节点的右节点
    let temp = node.rigth
    // 将临时的左节点赋值给node.right
    node.rigth = temp.left
    if(temp.left && temp.left.key) {
      temp.parent.left = node
    }
    temp.parent = node.parent
    if(!node.parent) {
      this.root = temp
    } else {
      if(node === node.parent.left) {
        node.parent.left = temp
      } else {
        node.parent.rigth = temp
      }
    }
    temp.left = node
    node.parent = temp
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
    if(this.root === null) {
      this.root = new Node(key)
      this.root.color = Colors.BLACK
    } else {
      const newNode = this.insertNode(this.root, key)
      this.fixTreeProperties(newNode)
    }
  }

  insertNode(node, key) {
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(node.left === null) {
        node.left = new Node(key)
        node.left.parent = node
        return node.left
      } else {
        return this.insertNode(node.left, key)
      }
    } else if (node.rigth === null) {
      node.rigth = new Node(key)
      node.rigth.parent = node
      return node.rigth
    } else {
      return this.insertNode(node.rigth, key)
    }
  }

  fixTreeProperties(node) {
    // 判断当前的节点父节点存在、父节点的颜色是红色、当前节点也是红色
    while(node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK) {
      // 定义两个两个变量对父节点和祖父节点的引用
      let parent = node.parent
      let grandParent = parent.parent
      // 情况A: 父节点在左侧子节点
      if(grandParent && grandParent.left === parent) {
        // 获取叔叔节点，也就是父节点的另一个子节点
        let uncle = grandParent.rigth
        // 判断叔叔节点存在并且也是红色的
        if(uncle && uncle.color === Colors.RED) {
          // 将祖父节点设置为红色
          grandParent.color = Colors.RED
          // 将父节点和叔叔节点设置为黑色
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          // 更新节点
          node = grandParent
        } else {
          // 情形 2A：节点是右侧子节点——左旋转
          if(node === parent.rigth) {
            // 右-右旋转
            this.rotationRR(parent)
            // 并更新节点和父节点的引用
            node = parent
            node.parent = node
          }
          // 情形 3A：节点是左侧子节点——右旋转
          this.rotationLL(grandParent)
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      } else {
        // 情况B: 父节点在右侧子节点
        const uncle = grandParent.left
        if(uncle && uncle.color === Colors.RED) {
           // 将祖父节点设置为红色
           grandParent.color = Colors.RED
           // 将父节点和叔叔节点设置为黑色
           parent.color = Colors.BLACK
           uncle.color = Colors.BLACK
           // 更新节点
           node = grandParent
        } else {
          // 情形 2B：节点是左侧子节点——左旋转
          if(node === parent.left) {
            this.rotationLL(parent)
            node = parent
            parent = node.parent
          }
          // 情形 3B：节点是右侧子节点——左旋转
          this.rotationRR(grandParent); // {20} 
          parent.color = Colors.BLACK; 
          grandParent.color = Colors.RED; 
          node = parent;
        }
      }
    }
    // 将根节点设置为黑色
    return this.root.color = Colors.BLACK
  }
}