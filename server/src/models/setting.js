const BaseModel = require('./base')
const log = require('../log')

class Setting extends BaseModel {
  constructor(options) {
    super()
    this.id = options.id
    this.twitchID = options.twitchID
    this.userID = options.userID
    this.botEnabled = options.botEnabled
  }

  static setBot(twitch_id, enabled) {
    return super.db('settings')
      .where('twitch_id', twitch_id)
      .update({
        bot_enabled: enabled
      })
      .returning('*')
      .then(rows => {
        log.info({ settingSetBotEnabled: rows })
        return Setting.fromRows(rows)
      })
  }

  static byTwitchID(twitch_id) {
    return super.db('settings')
      .where('twitch_id', twitch_id)
      .then(rows => {
        log.info({ settingRows: rows })
        return Setting.fromRows(rows)
      })
  }

  static fromRows(rows) {
    if(!rows || rows.length == 0) {
      return null
    }

    const row = rows[0]
    return new Setting({
      id: row.id,
      twitchID: row.twitch_id,
      userID: row.user_id,
      botEnabled: row.bot_enabled
    })
  }
}

module.exports = Setting