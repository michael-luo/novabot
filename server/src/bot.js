const Setting = require('./models/setting')
const log = require('./log')

const TwitchBot = require('twitch-bot')
const bot = new TwitchBot({
  username: 'theStellarBot',
  oauth: process.env.TWITCH_BOT_OAUTH
})

bot.on('join', channel => {
  log.info({ botJoined: channel })
})

bot.on('part', channel => {
  log.info({ botParted: channel })
})

bot.on('message', chatter => {
  log.info({ receivedMessage: chatter })
  bot.say(chatter.message, chatter.channel)
})

bot.on('error', err => {
  log.error({ error: err })
})

bot.irc.on('data', data => {
  if(data.includes('Welcome')) {
    // Join channels on instance startup
    // TODO: Distribute bot instances across nodes, also shouldn't select all from table as it doesn't scale
    Setting.findAll()
      .then(settings => {
        settings.forEach(s => {
          if(s.botEnabled && s.twitchUsername) {
            log.info(`Bot loaded settings and joining channel: ${s.twitchUsername}`)
            bot.join(s.twitchUsername)
          }
        })
      })
      .catch(err => {
        log.error({
          findAllSettingsFailed: err.toString()
        })
      })
  }
})


module.exports = bot