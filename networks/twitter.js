const fetch = require('node-fetch')
const { log, logError } = require('../utils')

const fetchTwitter = async () => {
    const url = 'https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=oceanprotocol'
    const start = Date.now()
    const response = await fetch(url)

    if (response.status !== 200) {
        logError(`Non-200 response code from Twitter: ${response.status}`)
        return null
    }

    const json = await response.json()
    const followers = json[0].followers_count

    log(
        'Re-fetched Twitter. ' +
        `Total: ${followers} followers. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return { followers }
}

module.exports = fetchTwitter
