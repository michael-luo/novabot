const db = require('./knex')

class BaseModel {
  constructor() {
    this.db = db
  }

  static get db() {
    return db
  }
}

module.exports = BaseModel