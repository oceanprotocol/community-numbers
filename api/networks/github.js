import fetch from 'node-fetch'
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
  const response = await fetch(url, options)

  if (response.status !== 200) {
    logError(`Non-200 response code from GitHub: ${response.status}`)
    return null
  }

  const jsonRepos = await response.json()

  const starsArray = []
  const contribArray = []

  jsonRepos.forEach(async (item) => {
    starsArray.push(item.stargazers_count)

    const responseContrib = await fetch(
      `https://api.github.com/orgs/oceanprotocol/${item.name}/stats/contributors`,
      options
    )
    const jsonContrib = await responseContrib.json()
    contribArray.push(jsonContrib.total)
  })

  const stars = arrSum(starsArray)
  const repositories = jsonRepos.length
  const contributors = arrSum(contribArray)

  log(
    '✓ GitHub. ' +
      `Total: ${repositories} public projects with a total of ${stars} stargazers & ${contributors} contributors. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { stars, repositories, contributors }
}
