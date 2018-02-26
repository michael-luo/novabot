const log = require('../log')
const User = require('../models/user')
const Balance = require('../models/balance')

const DEPOSIT_URL = 'http://novabot.me'

const COMMANDS = {
  '!commands': (bot, chatter, args) => {
    bot.say(
      `@${chatter.username} See list of commands at ${DEPOSIT_URL}`,
      chatter.channel
    )
  },

  '!tip': (bot, chatter, args) => {
    const amount = Number.parseFloat(args[0])

    if(Number.isNaN(amount) || amount < 0.0000001 || amount > 100000) {
      COMMANDS['!commands'](bot, chatter, args)
    } else {
      User.findByTwitchName(chatter.username)
        .then(user => {
          return user.sendCoins(chatter.room_id, amount)
        })
        .then(result => {
          log.info({ sendCoinsResult: result })
          bot.say(`${chatter.username} just donated ${amount} Stellar Lumens to ${chatter.channel}!`, chatter.channel)
        })
        .catch(err => {
          log.error({ failedSendXLMError: err.toString() })
          bot.say(`Failed to tip ${amount} coin(s), deposit cryptocurrency at ${DEPOSIT_URL}`, chatter.channel)
        })
    }
  },

  '!balance': (bot, chatter, args) => {
    Balance.findBalanceByTwitchID(chatter.user_id)
      .then(Balance._fromFirstRow)
      .then(balance => {
        if(!balance || !balance.amount || !balance.currency) {
          bot.say(`Get started with NovaBot at ${DEPOSIT_URL}`, chatter.channel)
          return;
        }
        bot.say(`@${chatter.username} You have ${balance.amount / 10000000} ${balance.currency.toUpperCase()}`, chatter.channel)
      })
      .catch(err => {
        bot.say(`@${chatter.username} Deposit cryptocurrency at ${DEPOSIT_URL}`)
      })
  },

  '!stellar': (bot, chatter, args) => {
    bot.say(`One lumen (XLM) is a unit of digital currency, like a bitcoin. More info: https://www.stellar.org/lumens/`, chatter.channel)
  }
}

module.exports = bot => {
  bot.on('message', chatter => {
    log.info({ receivedMessage: chatter })

    const words = chatter.message.split(' ')
    if(words.length > 0) {
      const command = words[0] && words[0].toLowerCase()
      COMMANDS[command] && COMMANDS[command](bot, chatter, words.slice(1))
    } else {
      log.info(`Skipping message: ${chatter.message}`)
    }
  })
}