const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { log, logError } = require('../util/logger')

const fetchTelegram = async () => {
    const url = 'https://t.me/OceanProtocolCommunity/?pagehidden=false'
    const start = Date.now()
    const response = await fetch(url)

    if (response.status !== 200) {
        logError(`Non-200 response code from Twitter: ${response.status}`)
        return null
    }

    const body = await response.text()
    const data = await cheerio.load(body, { normalizeWhitespace: true })

    let info = data('.tgme_page_extra').text()
    info = info.replace(' members', '').replace(' ', '').replace(' ', '')
    const members = parseInt(info)

    log(
        `Re-built telegram cache. ` +
        `Total: ${members} members. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return { members }
}

module.exports = fetchTelegram
