/* eslint-disable no-console */
const chalk = require('chalk')

const log = text => console.log(text)
const logError = text => console.error(chalk.bold.red(text))

const arrSum = arr => arr.reduce((a, b) => a + b, 0)

module.exports = { log, logError, arrSum }
