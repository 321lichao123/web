// const currency = require('./currency')

// console.log(currency.canadianToUs(50));

// console.log(currency.USToCanadian(30));

const Currency = require('./currency')

const currency = new Currency(0.91)

console.log(currency.canadianToUs(50));

console.log(currency.USToCanadian(30));