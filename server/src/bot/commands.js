const log = require('../log')
const User = require('../models/user')

const COMMANDS = {
  '!commands': (bot, chatter, args) => {
    bot.say(
      `@${chatter.username} -> You can send Stellar Lumens cryptocurrency to the streamer with '!xlm <NUMBER_OF_COINS>'`,
      chatter.channel
    )
  },

  '!xlm': (bot, chatter, args) => {
    const amount = Number.parseInt(args[0])

    if(Number.isNaN(amount) || amount <= 0) {
      COMMANDS['!commands'](bot, chatter, args)
    } else {
      User.findByTwitchName(chatter.username)
        .then(user => {
          user.sendCoins(chatter.room_id, amount)
            .then(result => {
              log.info({ sendCoinsResult: result })
              bot.say(`${chatter.username} just donated ${amount} Stellar Lumens ($XLM) to ${chatter.channel}!!`, chatter.channel)
            })
            .catch(err => {
              log.error({ failedSendXLMError: err.toString() })
              bot.say(`Failed to send ${amount} coins, try depositing some cryptocurrency at https://michaelluo.com`, chatter.channel)
            })

        })
        .catch(err => {
          log.error({ failedFindNameSendXLMError: err.toString() })
          bot.say(`Failed to send ${amount} coins, please try again later...`, chatter.channel)
        })
    }
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