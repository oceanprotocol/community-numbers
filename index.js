const ms = require('ms')
const { logError } = require('./utils')

const fetchGitHubRepos = require('./networks/github')
const fetchBounties = require('./networks/bounties')
const fetchMedium = require('./networks/medium')
const fetchTwitter = require('./networks/twitter')
const fetchTelegram = require('./networks/telegram')
const fetchDiscord = require('./networks/discord')

let cacheGithub = null
let cacheBounties = null
let cacheMedium = null
let cacheTwitter = null
let cacheTelegram = null
let cacheDiscord = null

//
// Create the response
//
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')

    try {
        /* eslint-disable require-atomic-updates */
        if (!cacheGithub || Date.now() - cacheGithub.lastUpdate > ms('5m')) {
            try {
                cacheGithub = await fetchGitHubRepos()
            } catch (error) {
                console.error(error.message)
            }
        }

        if (!cacheBounties || Date.now() - cacheBounties.lastUpdate > ms('5m')) {
            try {
                cacheBounties = await fetchBounties()
            } catch (error) {
                console.error(error.message)
            }
        }

        if (!cacheMedium || Date.now() - cacheMedium.lastUpdate > ms('5m')) {
            try {
                cacheMedium = await fetchMedium()
            } catch (error) {
                console.error(error.message)
            }
        }

        if (!cacheTwitter || Date.now() - cacheTwitter.lastUpdate > ms('5m')) {
            try {
                cacheTwitter = await fetchTwitter()
            } catch (error) {
                console.error(error.message)
            }
        }

        if (!cacheTelegram || Date.now() - cacheTelegram.lastUpdate > ms('5m')) {
            try {
                cacheTelegram = await fetchTelegram()
            } catch (error) {
                console.error(error.message)
            }
        }

        if (!cacheDiscord || Date.now() - cacheDiscord.lastUpdate > ms('5m')) {
            cacheDiscord = await fetchDiscord()
        }
        /* eslint-enable require-atomic-updates */
    } catch (error) {
        logError(error.message)
    }

    res.send({
        github: cacheGithub,
        bounties: cacheBounties,
        medium: cacheMedium,
        twitter: cacheTwitter,
        telegram: cacheTelegram,
        discord: cacheDiscord
    })
}
