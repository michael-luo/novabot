const BaseModel = require('./base')
const log = require('../log')

class Cursor extends BaseModel {
  constructor(options) {
    super()
    this.id = options.id
    this.currency = options.currency
    this.pagingToken = options.pagingToken
    this.updatedAt = options.updatedAt
    this.createdAt = options.createdAt
  }

  set token(token) {
    this.pagingToken = token
  }

  get token() {
    return this.pagingToken
  }

  static getPagingToken() {
    return super.db('cursors')
      .where('currency', 'xlm')
      .then(rows => {
        if(!rows || rows.length == 0) {
          log.info("Returning default now pagingToken")
          return new Cursor({ pagingToken: 'now' })
        }
        return Cursor._fromFirstRow(rows)
      })
      .catch(err => {
        log.error(err)
        return null
      })
  }

  static setPagingToken(token) {
    return super.db.raw(`
      INSERT INTO cursors
        (currency, paging_token)
      VALUES
        ('xlm', '${token}')
      ON CONFLICT (currency) DO UPDATE SET
        paging_token = '${token}'
      RETURNING *
    `)
  }

  static _fromFirstRow(rows) {
    if(!rows || rows.length == 0) {
      return null
    }
    return Cursor._fromRow(rows[0])
  }

  static _fromRows(rows) {
    if(!rows || rows.length == 0) {
      return []
    }
    return rows.map(Cursor._fromRow)
  }

  static _fromRow(row) {
    return new Cursor({
      id: row.id,
      currency: row.currency,
      pagingToken: row.paging_token,
      updatedAt: row.updated_at,
      created_at: row.created_at
    })
  }
}

module.exports = Cursor