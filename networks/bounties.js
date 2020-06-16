const fetch = require('node-fetch')
const { log, logError } = require('../utils')

const getGitcoin = async () => {
    const response = await fetch('https://gitcoin.co/api/v0.1/bounties/?&org=oceanprotocol&is_open=true')

    if (response.status !== 200) {
        logError(`Non-200 response code from Gitcoin: ${response.status}`)
        return null
    }

    const gitcoin = await response.json() // returns only open bounties by default

    return gitcoin.length
}

const fetchBounties = async () => {
    const start = Date.now()
    const gitcoin = await getGitcoin()

    log(
        'Re-built bounties cache. ' +
        `Total: ${gitcoin} bounties. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return { gitcoin }
}

module.exports = fetchBounties
