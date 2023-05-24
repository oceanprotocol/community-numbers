import axios from 'axios'
import fs from 'fs'
import { log, logError, Oauth1Helper } from '../utils'
import jsonDb from '../../jsonDb.json'

export default async function fetchTwitter() {
  const url = 'https://api.twitter.com/2/users/me?user.fields=public_metrics'
  const start = Date.now()

  let followers = 0

  const { twitter } = jsonDb

  const currentTimestamp = Math.floor(Date.now() / 1000)
  const oneDay = 60 * 60 * 24
  const compareDatesBoolean = currentTimestamp - twitter.lastFetch > oneDay
  if (!compareDatesBoolean) return { followers: twitter.followers }

  const request = {
    url,
    method: 'GET'
  }

  const authHeader = await Oauth1Helper.getAuthHeaderForRequest(request)
  const response = await axios.get(url, { headers: authHeader })

  if (response.status !== 200) {
    logError(`Non-200 response code from Twitter: ${response.status}`)
    return null
  }

  if (response.data.data.public_metrics.followers_count === undefined)
    return null

  followers = response.data.data.public_metrics.followers_count

  var stream = fs.createWriteStream('jsonDb.json')
  const saveData = {
    twitter: {
      followers,
      lastFetch: currentTimestamp
    }
  }
  stream.once('open', function (fd) {
    stream.write(JSON.stringify(saveData))
    stream.end()
  })

  log(
    '✓ Twitter. ' +
      `Total: ${followers} followers. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { followers }
}
