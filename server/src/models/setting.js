const BaseModel = require('./base')
const log = require('../log')

class Setting extends BaseModel {
  constructor(options) {
    super()
    this.id = options.id
    this.twitchID = options.twitchID
    this.userID = options.userID
    this.botEnabled = options.botEnabled
    this.createdAt = options.createdAt
    this.twitchUsername = options.twitchUsername
  }

  static setBot(twitch_id, enabled) {
    return super.db('settings')
      .where('twitch_id', twitch_id)
      .update({
        bot_enabled: enabled
      })
      .returning('*')
      .then(rows => {
        log.info({ setBotEnabledSettings: rows })
        return Setting._fromFirstRow(rows)
      })
  }

  static findByTwitchID(twitch_id) {
    return super.db('settings')
      .where('twitch_id', twitch_id)
      .then(rows => {
        log.info({ findByTwitchIDSettings: rows })
        return Setting._fromFirstRow(rows)
      })
  }

  static findAll() {
    return super.db('settings')
      .innerJoin('users', 'settings.user_id', 'users.id')
      .select(['settings.*', 'users.twitch_username'])
      .then(rows => {
        log.info({ findAllSettings: rows })
        return Setting._fromRows(rows)
      })
  }

  static _fromFirstRow(rows) {
    if(!rows || rows.length == 0) {
      return null
    }
    return Setting._fromRow(rows[0])
  }

  static _fromRows(rows) {
    if(!rows || rows.length == 0) {
      return []
    }
    return rows.map(Setting._fromRow)
  }

  static _fromRow(row) {
    return new Setting({
      id: row.id,
      twitchID: row.twitch_id,
      userID: row.user_id,
      botEnabled: row.bot_enabled,
      createdAt: row.created_at,
      twitchUsername: row.twitch_username // Only exists from joins with users
    })
  }
}

module.exports = Setting