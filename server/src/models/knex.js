let instance = null

class KnexDBClient {
  constructor() {
    if(instance) return instance

    this.time = new Date()
    this.dbClient = require('knex')({
      client: 'pg',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      }
    })

    instance = this
  }

  set db(client) {
    this.dbClient = client
  }

  get db() {
    return this.dbClient
  }
}

const dbClient = new KnexDBClient()
module.exports = dbClient.db