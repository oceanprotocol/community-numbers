import axios from 'axios'
import { log, logError } from '../utils'

const getGitcoin = async () => {
  const response = await axios.get(
    'https://gitcoin.co/api/v0.1/bounties/?&org=oceanprotocol'
  )

  if (response.status !== 200) {
    logError(`Non-200 response code from Gitcoin: ${response.status}`)
    return null
  }

  const total = response.data
  const open = total.filter((item) => item.is_open === true)

  return { total: total.length, open: open.length }
}

export default async function fetchBounties() {
  const start = Date.now()
  const { total, open } = await getGitcoin()

  log(
    '✓ Bounties. ' +
      `Total: ${total} bounties. Open: ${open} bounties. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { open, total }
}
