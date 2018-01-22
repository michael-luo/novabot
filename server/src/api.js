const knex = require('./knex')

const clientHome = 'http://localhost:8080'

const redirectHome = (res) => {
  if(process.env.NODE_ENV === 'production') return res.redirect('/')
  res.redirect(clientHome)
}

module.exports = (app, passport) => {
  // Attach dependencies to each request
  app.use((req, res, next) => {
    req.clients = {
      pg: knex
    }
    next()
  })

  app.get('/api/self', (req, res) => {
    if(req.user) {
      res.json(req.user)
    } else {
      res.status(401).json({
        error: 'Unauthenticated',
        message: 'Cannot retrieve authenticated user, try logging in',
        status: 401
      })
    }
  })

  app.get('/api/auth/twitch', passport.authenticate('twitch'))

  app.get('/auth/twitch/callback', passport.authenticate('twitch', { failureRedirect: '/'}), (req, res) => {
    redirectHome(res)
  })

  app.get('/api/logout', function(req, res){
    req.logout();
    redirectHome(res)
  });

}

