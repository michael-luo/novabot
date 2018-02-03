const log = require('./log')

const TwitchBot = require('twitch-bot')
const bot = new TwitchBot({
  username: 'theStellarBot',
  oauth: process.env.TWITCH_BOT_OAUTH
})

bot.on('join', channel => {
  log.info({ joined: channel })
})

bot.on('part', channel => {
  log.info({ parted: channel })
})

bot.on('message', chatter => {
  log.info({ message: chatter })
  bot.say(chatter.message, chatter.channel)
})

bot.on('error', err => {
  log.error({ error: err })
})

module.exports = bot