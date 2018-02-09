const User = require('../models/user')
const TwitchBot = require('twitch-bot')
const commands = require('./commands')
const log = require('../log')

let instance = null

class StellarBot {
  constructor() {
    if(instance) return instance

    this.bot = new TwitchBot({
      username: 'theStellarBot',
      oauth: process.env.TWITCH_BOT_OAUTH
    })

    this._init()
    this._joinAllChannels()
    instance = this
  }

  _init() {
    const bot = this.bot

    bot.on('join', channel => {
      log.info({ botJoined: channel })
    })

    bot.on('part', channel => {
      log.info({ botParted: channel })
    })

    bot.on('error', err => {
      log.error({ error: err })
    })

    // Attach commands to the bot listener
    commands(bot)
  }

  _joinAllChannels() {
    const bot = this.bot

    bot.irc.on('data', data => {
      if(data.includes('Welcome')) {
        // Join channels on instance startup
        // TODO: Distribute bot instances across nodes, also shouldn't select all from table as it doesn't scale
        User.findAllEnabled()
          .then(users => {
            users.forEach(user => {
              if(user.botEnabled) {
                log.info(`Bot loaded settings and joining channel: ${user.twitchUsername}`)
                bot.join(user.twitchUsername)
              }
            })
          })
          .catch(err => {
            log.error({
              findAllEnabledBotsFailed: err.toString()
            })
          })
      }
    })
  }

  join(channel) {
    this.bot.join(channel)
  }

  part(channel) {
    this.bot.part(channel)
  }
}

module.exports = new StellarBot()
