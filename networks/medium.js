const fetch = require('node-fetch')
const { log, logError } = require('../utils')

const fetchMedium = async () => {
    const url = 'https://medium.com/oceanprotocol?format=json'
    const start = Date.now()
    const response = await fetch(url)

    if (response.status !== 200) {
        logError(`Non-200 response code from Medium: ${response.status}`)
        return null
    }

    const responseText = await response.text()
    const json = await JSON.parse(responseText.replace('])}while(1);</x>', ''))
    const { collection } = json.payload

    const followers = collection.metadata.followerCount

    log(
        'Re-fetched Medium. ' +
        `Total: ${followers} followers. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return { followers }
}

module.exports = fetchMedium
