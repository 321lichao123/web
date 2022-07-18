// const canadianDollar = 0.91

// function roundTwo(amount) {
//   return Math.round(amount * 100) / 100
// }
// exports.canadianToUs = cancadian => roundTwo(cancadian * canadianDollar)

// exports.USToCanadian = us => roundTwo(us / canadianDollar)

class Currency {
  constructor(canadianDollar) {
    this.canadianDollar = canadianDollar
  }

  roundTwo(amount) {
    return Math.round(amount * 100) / 100
  }

  canadianToUs(cancadian) {
    return this.roundTwo(cancadian * this.canadianDollar)
  }

  USToCanadian(us) {
    return this.roundTwo(us / this.canadianDollar)
  }
}

module.exports = Currency;