class Set {
  constructor() {
    this.items = {}
  }

  // 判断集合是否包含某个元素
  has(element) {
    // Object 原型有 hasOwnProperty 方法。该方法返回一个表明对象是否具有特定属性的布尔值。
    // in 运算符则返回表示对象在原型链上是否有特定属性的布尔值。

    return Object.prototype.hasOwnProperty.call(this.items, element)
  }

  // 添加元素
  add(element) {
    if(!this.has(element)) {
      // 添加一个 element 的时候，把它同时作为键和值保存，因为这样有利于查找该元素
      this.items[element] = element
      return true
    }
    return false
  }

  // 删除某个元素
  delete(element) {
    if(this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }

  clear() {
    this.items = {}
  }

  size() {
    // 有兼容性问题
    // return Object.keys(this.items).length
    // 没有兼容性问题
    let count = 0
    for(let key in this.items) {
      // 检查它们是否是对象自身的属性
      if(this.items.hasOwnProperty(key)) {
        count++
      }
    }
    return count
  }

  values() {
    // 有兼容性问题
    // return Object.values(this.items)
    // 没有兼容性问题
    let values = []
    for(let key in this.items) {
      if(this.items.hasOwnProperty(key)) {
        values.push(this.items[key])
      }
    }
    return values
  }

  // 合并其他集合
  union(otherSet) {
    let resultSet = new Set()
    this.values().forEach(value => resultSet.add(value))
    otherSet.values().forEach(value => resultSet.add(value))
    return resultSet
  }

  // 交集
  intersection(otherSet) {
    let resultSet = new Set()
    let values = this.values()
    let otherSetValues = otherSet.values()
    let bigValues = values
    let smallValues = otherSetValues
    if(bigValues.length - smallValues.length < 0) {
      bigValues = otherSetValues
      smallValues = values
    }
    for(let i = 0; i < smallValues.length; i++) {
      if(otherSet.has(values[i])) {
        resultSet.add(values[i])
      }
    }
    return resultSet
  }

  // 差集
  difference(otherSet) {
    let resultSet = new Set()
    this.values().forEach(value => {
      if(!otherSet.has(value)) {
        resultSet.add(value)
      }
    })
    return resultSet
  }

  // 子集
  isSubSet(otherSet) {
    if(otherSet.size() < this.size()) {
      return false
    }
    this.values().every(value => {
      if(!otherSet.has(value)) {
        return false
      }
    })
    return true
  }
}

let set = new Set()
set.add(1)
set.add(2)

console.log(set);

let set2 = new Set()
set2.add(3)
set2.add(4)

let resultSet = set.union(set2)

console.log(resultSet);

let insterSet = set.intersection(resultSet)

console.log(insterSet);

