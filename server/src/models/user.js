const BaseModel = require('./base')
const Balance = require('./balance')
const log = require('../log')

class User extends BaseModel {
  constructor(options) {
    super()
    this.id = options.id
    this.twitchID = options.twitchID
    this.twitchUsername = options.twitchUsername
    this.botEnabled = options.botEnabled
  }

  toHash() {
    return {
      id: this.id,
      twitchID: this.twitchID,
      twitchUsername: this.twitchUsername,
      botEnabled: this.botEnabled
    }
  }

  // Transfer this user's coins to the given channelID
  sendCoins(toChannelID, amount) {
    const twitchID = this.twitchID

    return super.db.transaction(trx => {
      return trx.raw(`set transaction isolation level serializable;`)
        .then(() => { return Balance.findBalanceByTwitchID(twitchID).transacting(trx) })
        .then(rows => {
          if(!rows || !rows[0]) throw new Error('Invalid balances response')

          // Divide amount in stroops by 10,000,000 to get amount in Lumens
          const lumensBalance = rows[0].amount / 10000000
          if(lumensBalance < amount) throw new Error(`User insufficient balance ${lumensBalance} / ${amount}`)

          // Decrement sender
          return Balance.decrement(twitchID, amount).transacting(trx)
        })
        .then(rows => {
          if(rows != 1) throw new Error('Failed to decrement sender')
          // Increment receiver
          return Balance.increment(toChannelID, amount).transacting(trx)
        })
        .then(rows => {
          if(rows != 1) throw new Error('Failed to increment receiver')

          const donationResult = {
            to: toChannelID,
            from: twitchID,
            amountLumens: amount
          }

          log.info({ donationResult })
          return donationResult
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
  }

  static setBot(twitch_id, enabled) {
    return super.db('users')
      .where('twitch_id', twitch_id)
      .update({
        bot_enabled: enabled
      })
      .returning('*')
      .then(rows => {
        log.info({ setBotEnabled: rows })
        return User._fromFirstRow(rows)
      })
  }

  static findAllEnabled() {
    return super.db('users')
      .where('bot_enabled', true)
      .then(rows => {
        log.info({ findAllEnabledBots: rows })
        return User._fromRows(rows)
      })
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
      twitchUsername: row.twitch_username,
      botEnabled: row.bot_enabled
    })
  }
}

module.exports = User