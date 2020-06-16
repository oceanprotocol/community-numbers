const fetch = require('node-fetch')
const { log, logError } = require('../utils')

const getGitcoin = async () => {
    const response = await fetch('https://gitcoin.co/api/v0.1/bounties/?&org=oceanprotocol')

    if (response.status !== 200) {
        logError(`Non-200 response code from Gitcoin: ${response.status}`)
        return null
    }

    const total = await response.json()
    const open = total.filter((item) => item.is_open === true)

    return { total: total.length, open: open.length }
}

const fetchBounties = async () => {
    const start = Date.now()
    const { total, open } = await getGitcoin()

    log(
        'Re-fetched bounties. ' +
        `Total: ${total} bounties. Open: ${open} bounties. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return { open, total }
}

module.exports = fetchBounties
