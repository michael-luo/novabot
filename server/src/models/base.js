const knexDB = require('./knex')

class BaseModel {
  constructor() {
    this._db = knexDB
  }

  get db() {
    return this._db
  }

  static get db() {
    return knexDB
  }
}

module.exports = BaseModel