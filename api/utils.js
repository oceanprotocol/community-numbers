/* eslint-disable no-console */
const chalk = require('chalk')

const log = (text) => console.log(text)
const logError = (text) => console.error(chalk.bold.red(text))

const arrSum = (arr) => {
  var sum = 0
  arr.forEach(function (v) {
    if (typeof v === 'object') sum += arrSum(v)
    else sum += v
  })
  return sum
}

module.exports = { log, logError, arrSum }
