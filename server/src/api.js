const knex = require('./models/knex')
const bot = require('./bot')

const redirectHome = (res) => {
  if(process.env.NODE_ENV === 'production') {
    res.redirect('/')
  } else {
    res.redirect('http://localhost:8080')
  }
}

const forbidden = (msg) => {
  return {
    error: 'Unauthenticated',
    message: msg,
    status: 401
  }
}

const bad = (msg) => {
  return {
    error: 'Bad Request',
    message: msg,
    status: 400
  }
}

const ensureAuth = (req, res, next) => {
  if(!req.user) {
    return res.status(401).json(forbidden('Client must be authenticated'))
  } else {
    next()
  }
}

module.exports = (app, passport) => {
  // Attach dependencies to each request
  app.use((req, res, next) => {
    req.clients = {
      pg: knex
    }
    next()
  })

  app.get('/self', (req, res) => {
    if(req.user) {
      return res.json(req.user)
    } else {
      return res.status(401).json(forbidden('Cannot retrieve authenticated user, try logging in'))
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
      return res.status(204).send()
    } else {
      return res.status(400).json(bad('Unable to join invalid channel name'))
    }
  })

  // Have the bot leave the authenticated user's channel
  app.post('/bot/part', ensureAuth, (req, res) => {
    if(req.user.username) {
      bot.part(req.user.username)
      return res.status(204).send()
    } else {
      return res.status(400).json(bad('Unable to part invalid channel name'))
    }
  })
}

