const fetch = require('node-fetch')
const { log, logError, arrSum } = require('../utils')

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
const fetchGitHubRepos = async () => {
    const url = 'https://api.github.com/orgs/oceanprotocol/repos?type=public&per_page=200'
    const start = Date.now()
    const response = await fetch(url, options)

    if (response.status !== 200) {
        logError(`Non-200 response code from GitHub: ${response.status}`)
        return null
    }

    const json = await response.json()

    const numbers = []

    json.map(item => {
        if (item.stargazers_count) {
            return numbers.push(item.stargazers_count)
        }
        return null
    })

    const stars = arrSum(numbers)
    const repositories = json.length

    log(
        'Re-built github cache. ' +
        `Total: ${repositories} public projects with a total of ${stars} stargazers. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return { stars, repositories }
}

module.exports = fetchGitHubRepos
