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

const getBountiesNetwork = async () => {
    const response = await fetch('https://api.bounties.network/bounty/?search=ocean%20protocol&bountyStage=1&platform=bounties-network')

    if (response.status !== 200) {
        logError(`Non-200 response code from Bounties Network: ${response.status}`)
        return null
    }

    const bountiesNetwork = await response.json()

    return bountiesNetwork.results.length
}

const getTotal = async () => {
    const response = await fetch('https://api.bounties.network/bounty/?search=ocean%20protocol')

    if (response.status !== 200) {
        logError(`Non-200 response code from Bounties Network: ${response.status}`)
        return null
    }

    const allBounties = await response.json()

    return allBounties.count
}

const fetchBounties = async () => {
    const start = Date.now()
    const gitcoin = await getGitcoin()
    const bountiesNetwork = await getBountiesNetwork()
    const total = await getTotal()

    log(
        'Re-built bounties cache. ' +
        `Total: ${total} bounties. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return {
        gitcoin,
        bountiesNetwork,
        total
    }
}

module.exports = fetchBounties
