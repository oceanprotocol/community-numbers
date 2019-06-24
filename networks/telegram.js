const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { log, logError } = require('../utils')

const fetchTelegram = async () => {
    const urlCommunity = 'https://t.me/oceanprotocol_community/?pagehidden=false'
    const start = Date.now()
    const responseCommunity = await fetch(urlCommunity)

    if (responseCommunity.status !== 200) {
        logError(`Non-200 response code from Telegram: ${responseCommunity.status}`)
        return null
    }
    const bodyCommunity = await responseCommunity.text()
    const dataCommunity = await cheerio.load(bodyCommunity, { normalizeWhitespace: true })

    let infoCommunity = dataCommunity('.tgme_page_extra').text()
    infoCommunity = infoCommunity.replace(' members', '').replace(' ', '').replace(' ', '')
    const membersCommunity = parseInt(infoCommunity)

    log(
        `Re-built telegram cache. ` +
        `Total: ${membersCommunity} oceanprotocol_community members. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    const urlNews = 'https://t.me/oceanprotocol/?pagehidden=false'
    const responseNews = await fetch(urlNews)

    if (responseNews.status !== 200) {
        logError(`Non-200 response code from Telegram: ${responseNews.status}`)
        return null
    }
    const bodyNews = await responseNews.text()
    const dataNews = await cheerio.load(bodyNews, { normalizeWhitespace: true })

    let infoNews = dataNews('.tgme_page_extra').text()
    infoNews = infoNews.replace(' members', '').replace(' ', '').replace(' ', '')
    const membersNews = parseInt(infoNews)

    log(
        `Re-built telegram cache. ` +
        `Total: ${membersCommunity} oceanprotocol_community members. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return { community: membersCommunity, news: membersNews }
}

module.exports = fetchTelegram
