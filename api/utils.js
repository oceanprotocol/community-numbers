import oauth1a from 'oauth-1.0a'
import crypto from 'crypto'
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

const CONSUMERKEY = 'tzOlj9Tzhh16QZS1hKZHjJuj1'
const CONSUMERSECRET = '9HEmhjp6ZnRFWjisg8A6Z2IOXIZqkESaSWgIGEDqbuw4fHILLM'
const TOKENKEY = '154621635-qvE6cD5Ypr8zfk0gnGTsrzysw06VRZxUyF0d2kyM'
const TOKENSECRET = 'ij7DoC00Nux7ICClZJuyM3v8pP11gAsGP6ehDxAMhlTHw'

class Oauth1Helper {
  static getAuthHeaderForRequest(request) {
    const oauth = oauth1a({
      consumer: { key: CONSUMERKEY, secret: CONSUMERSECRET },
      signature_method: 'HMAC-SHA1',
      // eslint-disable-next-line camelcase
      hash_function(base_string, key) {
        return crypto
          .createHmac('sha1', key)
          .update(base_string)
          .digest('base64')
      }
    })

    const authorization = oauth.authorize(request, {
      key: TOKENKEY,
      secret: TOKENSECRET
    })

    return oauth.toHeader(authorization)
  }
}

module.exports = { log, logError, arrSum, Oauth1Helper }
