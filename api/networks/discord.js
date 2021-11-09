import { load } from 'cheerio'
import { log } from '../utils'
import axios from 'axios'

export default async function fetchDiscord() {
  const url = 'https://discord.com/invite/TnXjkR5'
  const start = Date.now()

  const response = await axios.get(url)
  const body = await response.data
  const data = await load(body, { normalizeWhitespace: true })

  // extract members count from meta description
  const metaDescription = data('meta[name="description"]').attr('content')
  const regex = /\d+[,]\d+/ // one or more digits separated by comma
  const number = metaDescription.match(regex)
  const membersNumber = number[0].replace(/,/,'') // eliminate comma from number
  const members = parseInt(membersNumber)

  log(
    '✓ Discord. ' +
      `Total: ${members} members. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { members }
}
