import chrome from 'chrome-aws-lambda'
import { log } from '../utils'

const isDev = process.env.VERCEL_URL === undefined
const puppeteer = isDev ? require('puppeteer') : require('puppeteer-core')

export default async function fetchDiscord() {
  const url = 'https://discord.com/invite/TnXjkR5'
  const start = Date.now()

  const config = {
    ignoreHTTPSErrors: true,
    ...(isDev
      ? { headless: true }
      : {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless
        })
  }

  const browser = await puppeteer.launch(config)
  const page = await browser.newPage()
  await page.goto(url)

  const members = await page.evaluate(() => {
    // get the activity count element
    const membersElement = document.querySelector(
      '[class*="activityCount"] > div:last-child span'
    )
    const membersElementText = membersElement.innerText
    const number = membersElementText.replace(' Members', '')
    return number
  })

  log(
    '✓ Discord. ' +
      `Total: ${members} members. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { members: Number(members) }
}
