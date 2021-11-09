import axios from 'axios'
import { log, logError, arrSum } from '../utils'

// Request options for all fetch calls
const options = {
  headers: {
    // For getting topics, see note on https://developer.github.com/v3/search/
    // Accept: 'application/vnd.github.mercy-preview+json'
    Accept: 'application/vnd.github.preview'
  }
}

//
// Fetch all public GitHub repos
//
export default async function fetchGitHubRepos() {
  const url =
    'https://api.github.com/orgs/oceanprotocol/repos?type=public&per_page=200'
  const start = Date.now()
  const response = await axios.get(url, options)

  if (response.status !== 200) {
    logError(`Non-200 response code from GitHub: ${response.status}`)
    return null
  }

  const json = response.data
  const numbers = json.map((item) => item.stargazers_count)
  const stars = arrSum(numbers)
  const repositories = json.length

  log(
    '✓ GitHub. ' +
      `Total: ${repositories} public projects with a total of ${stars} stargazers. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { stars, repositories }
}
