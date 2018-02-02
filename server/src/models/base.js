const db = require('./knex')

class BaseModel {
  constructor() {
    this.db = db
  }
}

module.exports = BaseModel