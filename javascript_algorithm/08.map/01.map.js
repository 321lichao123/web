
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

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

class Map {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  // 判断一个键是否存在字典里
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null
  }
  
  // 向字典中添加数据
  set(key, value) {
    if(key != null && value != null) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }

  // 从字典中移除一个值
  remove(key) {
    if(this.hasKey(key)) {
      delete this.table[key]
      return true
    }
    return false
  }

  // 从字典中检索一个值
  get(key) {
    // 第一种方法
    // 缺点：会获取两次 key 的字符串以及访问两次 table 对象
    // if(this.hasKey(key)) {
    //   return this.table[key]
    // }
    // return undefined
    // 第二种方法
    const valuepair = this.table[key]
    return valuepair == null ? undefined : valuepair.value
  }

}