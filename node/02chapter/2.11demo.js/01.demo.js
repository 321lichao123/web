const async = require('async')

async.series([
  callback => {
    setTimeout(() => {
      console.log('I execute first');
      callback()
    }, 1000)
  },
  callback => {
    setTimeout(() => {
      console.log('I execute second');
      callback()
    }, 500)
  },
  callback => {
    setTimeout(() => {
      console.log('I execute thrid');
      callback()
    }, 100)
  },
])