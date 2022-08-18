
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

class Dictionary {
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

  // 获取所有的value值
  getValues() {
    const values = []
    for(let key in this.table) {
      // 使用hasKey 方法,因为对象的原型也会包含对象的其他属性
      if(this.hasKey(key)) {
        values.push(this.table[key])
      }
    }
    return values
  }

  // 获取所用的key
  getKeys() {
    const keys = []
    for(let key in this.table) {
      if(this.hasKey(key)) {
        keys.push(key)
      }
    }
    return keys
  }

  forEach() {
    let keys = this.getKeys()
    for(let i = 0; i < keys.length; i++) {
      // const reuslt = callback(keys[0])
    }
  }

  size() {
    return this.getKeys().length
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.table = {}
  }

  toString() {
    if(this.isEmpty()) {
      return ''
    }
    let keys = this.getKeys()
    let str = `${keys[0].toString()}`
    for(let i = 1; i < keys.length; i++) {
      str = `${str},${keys[i]}`
    }
    return str
  }
}

const dictionary = new Dictionary(); 
dictionary.set('Gandalf', 'gandalf@email.com'); 
dictionary.set('John', 'johnsnow@email.com'); 
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.hasKey('Gandalf'));
console.log(dictionary.size());

console.log(dictionary.getKeys()); 
console.log(dictionary.getValues()); 
console.log(dictionary.get('Tyrion'));