import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
import { log } from '../utils'

export default async function fetchDiscord() {
  const url = 'https://discord.com/invite/TnXjkR5'
  const start = Date.now()

  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  })
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
    'Re-fetched Discord. ' +
      `Total: ${members} members. ` +
      `Elapsed: ${new Date() - start}ms`
  )

  return { members: Number(members) }
}
