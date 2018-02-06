const BaseModel = require('./base')
const log = require('../log')

class User extends BaseModel {
  constructor(options) {
    super()
    this.id = options.id
    this.twitchID = options.twitchID
    this.twitchUsername = options.twitchUsername
  }

  // Transfer this user's coins to the given channelID
  sendCoins(toChannelID, amount) {
    const twitchID = this.twitchID

    return super.db.transaction(trx => {
      return trx.raw(`set transaction isolation level repeatable read;`)
        .then(() => {
          return super.db('balances')
            .where('twitch_id', twitchID)
            .where('currency', 'xlm')
        })
        .then(rows => {
          log.info({ checkUserBalanceSendCoins: rows })

          if(!rows || !rows[0]) {
            log.error('Invalid balances response')
            throw new Error('Invalid balances response')
          }

          // Divide amount in stroops by 10,000,000 to get amount in Lumens
          const lumensBalance = rows[0].amount / 10000000
          if(lumensBalance < amount) {
            throw new Error('User does not have sufficient balance')
          }

          // Decrement sender
          return super.db('balances')
            .where('twitch_id', twitchID)
            .where('currency', 'xlm')
            .decrement('amount', amount * 10000000)
        })
        .then(rows => {
          if(rows != 1) {
            throw new Error('Failed to decrement sender')
          }

          // Increment receiver
          return super.db('balances')
            .where('twitch_id', toChannelID)
            .where('currency', 'xlm')
            .increment('amount', amount * 10000000)
        })
        .then(rows => {
          if(rows != 1) {
            throw new Error('Failed to increment receiver')
          }

          return {
            to: toChannelID,
            from: twitchID,
            amountLumens: amount
          }
        })
        .catch(trx.rollback)
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
      twitchUsername: row.twitch_username
    })
  }
}

module.exports = User