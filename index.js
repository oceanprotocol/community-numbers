const ms = require('ms')
const { logError } = require('./utils')

const fetchGitHubRepos = require('./networks/github')
const fetchBounties = require('./networks/bounties')
const fetchMedium = require('./networks/medium')
const fetchTwitter = require('./networks/twitter')
const fetchTelegram = require('./networks/telegram')

let cacheGithub = null
let cacheBounties = null
let cacheMedium = null
let cacheTwitter = null
let cacheTelegram = null

//
// Create the response
//
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')

    try {
        if (!cacheGithub || Date.now() - cacheGithub.lastUpdate > ms('5m')) {
            cacheGithub = await fetchGitHubRepos()
        }

        if (!cacheBounties || Date.now() - cacheBounties.lastUpdate > ms('5m')) {
            cacheBounties = await fetchBounties()
        }

        if (!cacheMedium || Date.now() - cacheMedium.lastUpdate > ms('5m')) {
            cacheMedium = await fetchMedium()
        }

        if (!cacheTwitter || Date.now() - cacheTwitter.lastUpdate > ms('5m')) {
            cacheTwitter = await fetchTwitter()
        }

        if (!cacheTelegram || Date.now() - cacheTelegram.lastUpdate > ms('5m')) {
            cacheTelegram = await fetchTelegram()
        }
    } catch (error) {
        logError(error.message)
    }

    res.end(JSON.stringify({
        github: cacheGithub,
        bounties: cacheBounties,
        medium: cacheMedium,
        twitter: cacheTwitter,
        telegram: cacheTelegram
    }))
}
