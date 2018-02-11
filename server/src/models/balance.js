const BaseModel = require('./base')
const log = require('../log')

class Balance extends BaseModel {
  constructor(options) {
    super()
    this.id = options.id
    this.twitchID = options.twitchID
    this.amount = options.amount
    this.currency = options.currency
    this.updatedAt = options.updatedAt
  }

  static findBalanceByTwitchID(twitchID) {
    return super.db('balances')
      .where('twitch_id', twitchID)
      .where('currency', 'xlm')
  }

  // Amount in lumens, decrement by lumens * 10,000,000 (amount in stroops)
  static decrement(twitchID, amount) {
    return super.db('balances')
      .where('twitch_id', twitchID)
      .where('currency', 'xlm')
      .decrement('amount', amount * 10000000)
  }

  static increment(twitchID, amount) {
    return super.db('balances')
      .where('twitch_id', twitchID)
      .where('currency', 'xlm')
      .increment('amount', amount * 10000000)
  }

  static _fromFirstRow(rows) {
    if(!rows || rows.length == 0) {
      return null
    }
    return Balance._fromRow(rows[0])
  }

  static _fromRows(rows) {
    if(!rows || rows.length == 0) {
      return []
    }
    return rows.map(Balance._fromRow)
  }

  static _fromRow(row) {
    return new Balance({
      id: row.id,
      twitchID: row.twitch_id,
      amount: row.amount,
      currency: row.currency,
      updatedAt: row.updated_at
    })
  }
}

module.exports = Balance