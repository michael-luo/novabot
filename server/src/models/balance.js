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

  static findBalanceByTwitchID(id) {
    return super.db('balances')
      .where('twitch_id', id)
      .where('currency', 'xlm')
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