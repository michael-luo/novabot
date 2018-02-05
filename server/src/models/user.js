const BaseModel = require('./base')
const log = require('../log')

class User extends BaseModel {
  constructor(options) {
    super()
    this.id = options.id
    this.twitchID = options.twitchID
    this.twitchUsername = options.twitchUsername
  }

  static findByTwitchName(name) {
    return super.db('users')
      .where('twitch_username', name)
      .then(rows => {
        log.info({ findUserByTwitchName: rows })
        return User._fromFirstRow(rows)
      })
  }

  static _fromFirstRow(rows) {
    if(!rows || rows.length == 0) {
      return null
    }
    return User._fromRow(rows[0])
  }

  static _fromRows(rows) {
    if(!rows || rows.length == 0) {
      return []
    }
    return rows.map(User._fromRow)
  }

  static _fromRow(row) {
    return new User({
      id: row.id,
      twitchID: row.twitch_id,
      twitchUsername: row.twitch_username
    })
  }
}

module.exports = User