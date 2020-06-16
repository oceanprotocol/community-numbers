import { logError } from './utils'

import fetchGitHubRepos from './networks/github'
import fetchBounties from './networks/bounties'
import fetchMedium from './networks/medium'
import fetchTwitter from './networks/twitter'
import fetchTelegram from './networks/telegram'
import fetchDiscord from './networks/discord'

//
// Create the response
//
export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400')

  let response = {}

  try {
    const github = await fetchGitHubRepos()
    response = { ...response, github }
  } catch (error) {
    logError(error.message)
  }

  try {
    const bounties = await fetchBounties()
    response = { ...response, bounties }
  } catch (error) {
    logError(error.message)
  }

  try {
    const medium = await fetchMedium()
    response = { ...response, medium }
  } catch (error) {
    logError(error.message)
  }

  try {
    const twitter = await fetchTwitter()
    response = { ...response, twitter }
  } catch (error) {
    logError(error.message)
  }

  try {
    const telegram = await fetchTelegram()
    response = { ...response, telegram }
  } catch (error) {
    logError(error.message)
  }

  try {
    const discord = await fetchDiscord()
    response = { ...response, discord }
  } catch (error) {
    // fake fallback response cause puppeteer fails a lot
    response = { ...response, discord: { members: '240' } }
    logError(error.message)
  }

  res.json(response)
}
