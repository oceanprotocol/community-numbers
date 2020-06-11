const { log, logError } = require('../utils')
const Discord = require('discord.js')
const client = new Discord.Client()

const fetchDiscord = async () => {
    const url = 'https://discord.com/invite/TnXjkR5'
    const start = Date.now()

    const myGuild = client.guilds.cache.get('703315963583528991')
    const members = myGuild.members.cache.filter(member => !member.user.bot).size

    log(
        'Re-built Discord cache. ' +
        `Total: ${members} members. ` +
        `Elapsed: ${new Date() - start}ms`
    )

    return { members }
}

module.exports = fetchDiscord
