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

class HashTable{
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  loseloseHashTable(key) {
    if(typeof key === 'number') {
      return key
    }
    const strKey = this.toStrFn(key)
    let hash = 0
    for(let i = 0; i < strKey.length; i++) {
      hash += strKey[i].charCodeAt(0)
    }
    return hash % 37
  }

  hashCode(key) {
    return this.loseloseHashTable(key)
  }

  hasKey(key) {
    return this.table[this.hashCode(key)] != null
  }

  put(key, value) {
    if(key != null && value != null) {
      let position = this.hashCode(key)
      if(!this.table[position]) {
        this.table[position] = new ValuePair(key, value)
      } else {
        let index = position + 1
        while(this.table[index] != null) {
          index++
        }
        this.table[index] = new ValuePair(key, value)
      }
      return true
    }
    return false
  }

  get(key) {
    let position = this.hashCode(key)
    if(this.table[position]) {
      if(this.table[position].key === key) {
        return this.table[position].value
      } else {
        let index = position + 1
        while(this.table[index] && this.table[index].key !== key) {
          index++
        }
        if(this.table[index] && this.table[index].key === key) {
          return this.table[index].value
        }
      }
    }
    return undefined
  }

  remove(key) {
    
  }
  
  getKeys() {
    const keys = []
    for(let key in this.table) {
      if(this.hasKey(key)) {
        keys.push(key)
      }
    }
    return keys
  }

  size() {
    return this.getKeys().length
  }

  isEmpty() {
    return this.size() === 0
  }

  toString() {
    if(this.isEmpty() === 0) {
      return ''
    }
    // let keys = this.getKeys().map(Number)
    let keys = Object.keys(this.table).map(Number)
    let str = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for(let i = 1; i < keys.length; i++) {
      str = `${str},{${keys[i]} => ${this.table[keys[0]]}}`
    }
    return str
  }

}


const hash = new HashTable(); 
hash.put('Ygritte', 'ygritte@email.com'); 
hash.put('Jonathan', 'jonathan@email.com'); 
hash.put('Jamie', 'jamie@email.com'); 
hash.put('Jack', 'jack@email.com'); 
hash.put('Jasmine', 'jasmine@email.com'); 
hash.put('Jake', 'jake@email.com'); 
hash.put('Nathan', 'nathan@email.com'); 
hash.put('Athelstan', 'athelstan@email.com'); 
hash.put('Sue', 'sue@email.com'); 
hash.put('Aethelwulf', 'aethelwulf@email.com'); 
hash.put('Sargeras', 'sargeras@email.com');

console.table(hash.toString());

console.log(hash.get('Jake'));