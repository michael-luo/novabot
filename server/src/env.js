module.exports = {
  init: () => {
    require('dotenv').config()

    // Validate env
    const env = [
      process.env.TWITCH_CLIENT_ID,
      process.env.TWITCH_CLIENT_SECRET,
      process.env.TWITCH_CALLBACK_URL,
      process.env.TWITCH_BOT_OAUTH,
      process.env.DB_HOST,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      process.env.DB_NAME
    ]

    if(env.includes(null) || env.includes('')) {
      throw new Error('Missing environment variable(s)')
    }
  }
}