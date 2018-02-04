const knex = require('./models/knex')
const bot = require('./bot')
const log = require('./log')
const Setting = require('./models/setting')
const util = require('./util')

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
      return res.json(req.user)
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
      Setting.setBot(req.user.id, true)
      return res.status(204).send()
    } else {
      return util.bad(res, 'Unable to join invalid channel name')
    }
  })

  // Have the bot leave the authenticated user's channel
  app.post('/bot/part', ensureAuth, (req, res) => {
    if(req.user.username) {
      bot.part(req.user.username)
      Setting.setBot(req.user.id, false)
      return res.status(204).send()
    } else {
      return util.bad(res, 'Unable to part invalid channel name')
    }
  })

  app.get('/settings', ensureAuth, (req, res) => {
    Setting.byTwitchID(req.user.id)
      .then(s => {
        log.info({ settingsAPIResponse: s })
        return res.json({
          settings: s
        })
      })
      .catch(err => {
        log.error({ settingsAPIResponseError: err.toString() })
        return util.serverErr(err.toString())
      })
  })
}

