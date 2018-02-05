const log = require('../log')

const COMMANDS = {
  '!commands': (bot, chatter, args) => {
    log.info({
      commandsResponse: {
        to: chatter.username,
        channel: chatter.channel,
        args
      }
    })
    bot.say(
      `@${chatter.username} -> You can send Stellar Lumens cryptocurrency to the streamer with !xlm <NUMBER_OF_COINS>`,
      chatter.channel
    )
  },

  '!xlm': (bot, chatter, args) => {

  }
}

module.exports = bot => {
  bot.on('message', chatter => {
    log.info({ receivedMessage: chatter })

    const words = chatter.message.split(' ')
    if(words.length > 0) {
      const command = words[0] && words[0].toLowerCase()
      COMMANDS[command] && COMMANDS[command](bot, chatter, words[1])
    } else {
      log.info(`Skipping message: ${chatter.message}`)
    }
  })
}