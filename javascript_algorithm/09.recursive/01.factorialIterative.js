function factorialIterative(n) {
  if (n === 1 || n === 0) {
    return 1
  }
  return n * factorialIterative(n - 1)
}

console.log(factorialIterative(5));


// 斐波那契数
// 0、1、1、2、3、5、8、13、21、34
//  2 由 1 + 1 得到，数 3 由 1 + 2 得到，数 5 由 2 + 3 得到，以此类推
// 斐波那契数列的定义如下:
// 位置 0 的斐波那契数是零
// 1 和 2 的斐波那契数是 1
// n（此处 n > 2）的斐波那契数是（n  1）的斐波那契数加上（n  2）的斐波那契数


// 迭代求斐波那契数
function fibonacciIterative(n) {
  // 斐波那契数前三个数是0、1、1是固定
  if (n < 1) return 0
  if (n <= 2) return 1
  // 定义三个变量，分别代表累加的第一个数、累加的第二个数、和
  let fib1 = 0
  let fib2 = 1
  let fibn = n
  // 从第三个数开始遍历
  for (let i = 2; i <= n; i++) {
    // 对前两个数进行累加
    fibn = fib1 + fib2
    // 将第二个累加数赋值给第一个累加数，用于下次的累加
    fib1 = fib2
    // 将和赋值给第二个累加数，用于下次累加
    fib2 = fibn
  }
  return fibn
}

console.log(fibonacciIterative(9));

// 迭代求斐波那契数
function fibonacci(n) {
  if (n < 1) return 0
  if (n <= 2) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(9));

// 记忆法求斐波那契数
function fibonacciMemoization(n) {
  const memo = [0, 1]; // {1} 
  const fibonacci = (n) => {
    if (memo[n] != null) return memo[n]; // {2} 
    return memo[n] = fibonacci(n - 1) + fibonacci(n - 2); // {3} 
  };
  return fibonacci;
}

console.log(fibonacciMemoization()(9));