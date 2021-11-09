import axios from 'axios'
import { log, logError } from '../utils'

export default async function fetchMedium() {
  const url = 'http://medium.com/oceanprotocol?format=json'
  const start = Date.now()
  const response = await axios.get(url)

  if (response.status !== 200) {
    logError(`Non-200 response code from Medium: ${response.status}`)
    return null
  }

  const responseText = response.data
  const json = await JSON.parse(responseText.replace('])}while(1);</x>', ''))
  const { collection } = json.payload

  const followers = collection.metadata.followerCount

  log(
    '✓ Medium. ' +
      `Total: ${followers} followers. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { followers }
}
