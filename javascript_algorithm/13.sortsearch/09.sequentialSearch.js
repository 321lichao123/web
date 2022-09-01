const DOES_NOT_EXIST = -1

const defaultEquals = (a, b) => {
  return a === b
}

const sequentialSearch = (array, value, equalsFn = defaultEquals) => {
  for(let i = 0; i < array.length; i++) {
    if(equalsFn(value, array[i])) {
      return i
    }
  }
  return DOES_NOT_EXIST
}