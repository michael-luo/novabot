const TwitchBot = require('twitch-bot')

const bot = new TwitchBot({
  username: 'theStellarBot',
  oauth: process.env.TWITCH_BOT_OAUTH
})

bot.on('join', () => {
  bot.on('message', chatter => {
    if(chatter.message === '!commands') {
      bot.say('!xlm')
    } 
  })
})

module.exports = bot