const knex = require('./models/knex')
const bot = require('./bot/bot')
const log = require('./log')
const User = require('./models/user')
const Balance = require('./models/balance')
const util = require('./util')
const stellarClient = require('./clients/stellar')

const redirectHome = (res) => {
  if(process.env.NODE_ENV === 'production') {
    res.redirect('/')
  } else {
    res.redirect('http://localhost:8080')
  }
}

const ensureAuth = (req, res, next) => {
  if(!req.user) {
    return util.forbidden(res, 'Client must be authenticated')
  } else {
    next()
  }
}

module.exports = (app, passport) => {
  // Attach dependencies to each request
  app.use((req, res, next) => {
    req.knex = knex
    next()
  })

  app.get('/self', (req, res) => {
    if(req.user) {
      if (Boolean(req.query.refresh)) {
        return User.findByTwitchName(req.user.username)
          .then(user => {
            return res.json(user.toHash())
          })
          .catch(err => {
            return util.serverErr(res, 'Failed to find by twitch name')
          })
      } else {
        return res.json(req.user)
      }
    } else {
      return util.forbidden(res, 'Cannot retrieve authenticated user, try logging in')
    }
  })

  app.get('/auth/twitch', passport.authenticate('twitch'))

  app.get('/auth/twitch/callback', passport.authenticate('twitch', { failureRedirect: '/'}), (req, res) => {
    return redirectHome(res)
  })

  app.get('/logout', (req, res) => {
    req.logout();
    return redirectHome(res)
  });

  // Have the bot join the authenticated user's channel
  app.post('/bot/join', ensureAuth, (req, res) => {
    if(req.user.username) {
      bot.join(req.user.username)
      User.setBot(req.user.id, true)
      return res.status(204).send()
    } else {
      return util.bad(res, 'Unable to join invalid channel name')
    }
  })

  // Have the bot leave the authenticated user's channel
  app.post('/bot/part', ensureAuth, (req, res) => {
    if(req.user.username) {
      bot.part(req.user.username)
      User.setBot(req.user.id, false)
      return res.status(204).send()
    } else {
      return util.bad(res, 'Unable to part invalid channel name')
    }
  })

  // Get user's current balance
  app.get('/balance', ensureAuth, (req, res) => {
    const defaultResp = () => {
      return res.json({ amount: 0, currency: 'XLM' })
    }

    if (req.user.id) {
      Balance.findBalanceByTwitchID(req.user.id)
        .then(Balance._fromFirstRow)
        .then(balance => {
          if(balance && balance.amount && balance.currency) {
            return res.json({ amount: balance.amount / 10000000, currency: balance.currency.toUpperCase()})
          } else {
            return defaultResp
          }
        })
        .catch(err => {
          log.error(err)
          return defaultResp
        })
    } else {
      return defaultResp
    }
  })
}

