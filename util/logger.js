/* eslint-disable no-console */
const chalk = require('chalk')

const log = text => console.log(text)
const logError = text => console.error(chalk.bold.red(text))

module.exports = { log, logError }
