import axios from 'axios'
import { log, logError } from '../utils'

export default async function fetchTwitter() {
  const url =
    'https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=oceanprotocol'
  const start = Date.now()
  const response = await axios.get(url)

  if (response.status !== 200) {
    logError(`Non-200 response code from Twitter: ${response.status}`)
    return null
  }

  const json = response.data
  const followers = json[0].followers_count

  log(
    '✓ Twitter. ' +
      `Total: ${followers} followers. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { followers }
}
