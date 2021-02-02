import fetch from 'node-fetch'
import { log, logError, arrSum } from '../utils'

// Request options for all fetch calls
const options = {
  headers: {
    // For getting topics, see note on https://developer.github.com/v3/search/
    // Accept: 'application/vnd.github.mercy-preview+json'
    Accept: 'application/vnd.github.preview',
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
}

function getContributors(contributors) {
  const filtered = contributors
    // filter out duplicate contributions based on author.login
    .filter(
      (v, i, a) => a.findIndex((t) => t.author.login === v.author.login) === i
    )
    .map((item) => item)

  return filtered.length
}

//
// Fetch all public GitHub repos
//
export default async function fetchGitHubRepos() {
  const url =
    'https://api.github.com/orgs/oceanprotocol/repos?type=public&per_page=100'
  const start = Date.now()
  const response = await fetch(url, options)

  if (response.status !== 200) {
    logError(`Non-200 response code from GitHub: ${response.status}`)
    return null
  }

  const jsonRepos = await response.json()
  // filter out forks from public repos
  const jsonReposCleaned = jsonRepos.filter((repo) => repo.fork === false)

  const starsArray = []
  const contribArray = []

  for (let index = 0; index < jsonReposCleaned.length; index++) {
    const item = jsonReposCleaned[index]

    starsArray.push(item.stargazers_count)

    const responseContrib = await fetch(
      `https://api.github.com/repos/oceanprotocol/${item.name}/stats/contributors`,
      options
    )
    const jsonContrib = await responseContrib.json()
    jsonContrib && contribArray.push(jsonContrib[0])
  }

  const stars = arrSum(starsArray)
  const repositories = jsonReposCleaned.length
  const contributors = getContributors(contribArray)

  log(
    '✓ GitHub. ' +
      `Total: ${repositories} public projects with a total of ${stars} stargazers & ${contributors} contributors. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { stars, repositories, contributors }
}
