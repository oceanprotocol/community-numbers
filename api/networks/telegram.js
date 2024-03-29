import axios from 'axios'
import { load } from 'cheerio'
import { log, logError } from '../utils'

export default async function fetchTelegram() {
  const urlCommunity = 'https://t.me/oceanprotocol_community/?pagehidden=false'
  const start = Date.now()
  const responseCommunity = await axios.get(urlCommunity)

  if (responseCommunity.status !== 200) {
    logError(`Non-200 response code from Telegram: ${responseCommunity.status}`)
    return null
  }
  const bodyCommunity = await responseCommunity.data
  const dataCommunity = await load(bodyCommunity, { normalizeWhitespace: true })

  let infoCommunity = dataCommunity('.tgme_page_extra').text()
  infoCommunity = infoCommunity
    .replace(' members', '')
    .replace(' ', '')
    .replace(' ', '')
  const community = parseInt(infoCommunity)

  log(
    '✓ Telegram. ' +
      `Total: ${community} oceanprotocol_community members. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  const urlNews = 'https://t.me/oceanprotocol/?pagehidden=false'
  const responseNews = await axios.get(urlNews)

  if (responseNews.status !== 200) {
    logError(`Non-200 response code from Telegram: ${responseNews.status}`)
    return null
  }
  const bodyNews = await responseNews.data
  const dataNews = await load(bodyNews, { normalizeWhitespace: true })

  let infoNews = dataNews('.tgme_page_extra').text()
  infoNews = infoNews.replace(' members', '').replace(' ', '').replace(' ', '')
  const news = parseInt(infoNews)

  log(
    '✓ Telegram. ' +
      `Total: ${news} oceanprotocol members. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { community, news }
}
