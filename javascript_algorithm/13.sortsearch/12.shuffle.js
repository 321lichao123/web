const swap = (arr, i, j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const shuffle = array => {
  for(let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    swap(array, i, randomIndex)
  }
  return array
}

console.log(shuffle([1, 2, 3, 4, 5]));