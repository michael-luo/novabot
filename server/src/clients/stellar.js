const StellarSDK = require('stellar-sdk')
const Cursor = require('../models/cursor')
const Balance = require('../models/balance')

const knexDB = require('../models/knex')
const log = require('../log')

let instance = null

class StellarListener {
  constructor() {
    if(instance) return instance
    this.server = new StellarSDK.Server(process.env.STELLAR_SERVER)
    this.db = knexDB
    instance = this
    this.start()
  }

  // Listen to Stellar transactions
  // Message format:
  //
  // stellarMessage: {
  //   "_links": {
  //     "self": {
  //       "href": "https://horizon-testnet.stellar.org/operations/31326525089386497"
  //     },
  //     "transaction": {
  //       "href": "https://horizon-testnet.stellar.org/transactions/c3f69fbbde8537d5bcd7ce2ab59b1b337cc454559567e660f79e815d2d31522d"
  //     },
  //     "effects": {
  //       "href": "https://horizon-testnet.stellar.org/operations/31326525089386497/effects"
  //     },
  //     "succeeds": {
  //       "href": "https://horizon-testnet.stellar.org/effects?order=desc&cursor=31326525089386497"
  //     },
  //     "precedes": {
  //       "href": "https://horizon-testnet.stellar.org/effects?order=asc&cursor=31326525089386497"
  //     }
  //   },
  //   "id": "31326525089386497",
  //   "paging_token": "31326525089386497",
  //   "source_account": "GD2SSLHYWSNBGIMRQVPVDNUGHSWEMZJXTPXVABESJIV2Y2ZJOR5AM6KQ",
  //   "type": "payment",
  //   "type_i": 1,
  //   "created_at": "2018-02-12T01:22:46Z",
  //   "transaction_hash": "c3f69fbbde8537d5bcd7ce2ab59b1b337cc454559567e660f79e815d2d31522d",
  //   "asset_type": "native",
  //   "from": "GD2SSLHYWSNBGIMRQVPVDNUGHSWEMZJXTPXVABESJIV2Y2ZJOR5AM6KQ",
  //   "to": "GBTFU5DBANNJII73SF2S5ZOCLYJK73Y3774CYAE36W4SVMRJ6NR5ZEUT",
  //   "amount": "1.0000000"
  // }
  start() {
    Cursor.getPagingToken()
      .then(this._paymentsSinceCursor)
      .catch(err => {
        log.error(err)
      })
  }

  _paymentsSinceCursor(cursor) {
    if(!cursor || !cursor.token) {
      throw new Error("Unable to initialize Stellar payments listener with cursor")
    }
    log.info(`Watching Stellar account: ${process.env.STELLAR_ACC_PUBLIC_KEY} at cursor: ${cursor.token}`)
    instance.server.payments()
      .forAccount(process.env.STELLAR_ACC_PUBLIC_KEY)
      .cursor(cursor.token)
      .stream({ onmessage: instance._processPayment })
  }

  _processPayment(message) {
    log.info(message)
    if(!instance._isValidPayment(message)) {
      return;
    }

    if(message.to === process.env.STELLAR_ACC_PUBLIC_KEY) {
      instance._processDeposit(message)
    } else if(message.from === process.env.STELLAR_ACC_PUBLIC_KEY) {
      instance._processWithdraw(message)
    }
  }

  // TODO: Log transaction history and check hash for if payment has already been processed
  _processDeposit(message) {
    log.info(`Processing deposit from ${message.from} to ${message.to}`)

    this.db.transaction(trx => {
      return trx.raw(`set transaction isolation level serializable;`)
        .then(() => {
          return instance.server.transactions()
            .transaction(message.transaction_hash)
            .call()
        })
        .then(t => {
          if(!instance._isValidTransaction(t)) {
            throw new Error("Invalid transaction")
          }
          log.info(`Attempting to deposit ${message.amount} XLM to ${t.memo}, trxHash: ${message.transaction_hash}`)
          return Balance.increment(t.memo, (message.amount * 10000000 - t.fee_paid) / 10000000).transacting(trx)
        })
        .then(incrResp => {
          if(incrResp === 0) throw new Error(`Failed to deposit funds, transaction hash: ${message.transaction_hash}`)
          return Cursor.setPagingToken(message.paging_token).transacting(trx)
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .then(resp => {
      log.info(`Successful deposit`)
    })
    .catch(err => {
      log.error(err)
      if(err.toString().includes('could not serialize access due to concurrent update')) {
        log.info({ processDepositRetryTrans: err.toString() })
        setTimeout(() => { instance._processDeposit(message) }, 10)
      }
    })
  }

  _processWithdraw(message) {
    log.info(`Processing withdrawal from ${message.from} to ${message.to}`)
  }

  _isValidPayment(message) {
    const isValid = message && message.type === 'payment' 
      && message.type_i === 1 && message.asset_type === 'native'
      && (message.to === process.env.STELLAR_ACC_PUBLIC_KEY || message.from === process.env.STELLAR_ACC_PUBLIC_KEY)

    if(!isValid) log.error(`Invalid Stellar payment: ${JSON.stringify(message)}`)
    return isValid
  }

  _isValidTransaction(t) {
    const isValid = t && t.memo_type === 'text' && t.memo && Date.now() > new Date(t.valid_after)
    if (!isValid) log.error(`Invalid Stellar transaction: ${JSON.stringify(t)}`)
    return isValid
  }
}

module.exports = new StellarListener()