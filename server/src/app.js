u = require('./util')

environ = require('./env')
u.devOnly(() => environ.init())

// Web framework
const express = require('express')

// Parse request bodies
const bodyParser = require('body-parser')

// Parse cookies and handle sessions
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

// Twitch authentication via Passport.js
const passport = require('./auth')

// Handle cross origin requests
const cors = require('cors')

// Request logging
const morgan = require('morgan')

// For serving our Vue.js frontend
const path = require('path')

// Middleware to proxy requests through a specified index page
// Need for this SPA that uses the HTML5 History API
const history = require('connect-history-api-fallback');

const app = express()

u.prodOnly(() => {
  const enforceHTTPS = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] === 'https') return next()
    return res.redirect(301, `https://${path.join(req.hostname, req.url)}`)
  }
  app.use(enforceHTTPS)
})

// Set up favicon
const favicon = require('serve-favicon')

app.use(favicon(path.join(__dirname, 'dist/static/img/favicon.ico')))

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cookieSession({'secret': 'nuclear'}))
app.use(passport.initialize())
app.use(passport.session())

// Register CORS middleware
u.devOrProd(
  () => {
    app.use(cors({
      origin: 'http://localhost:8080',
      credentials: true
    }))
  },
  () => app.use(cors())
)

// Set up the API routes, auth, and business logic
// These routes have to register after cors() and before history()
require('./api')(app, passport)

// Important: has to be registered after API routes!
u.prodOnly(() => {
  app.use(history())
})
app.use(express.static(path.join(__dirname, 'dist')));

const port = 8081
const server = app.listen(process.env.PORT || port, () => {
  let address = server.address().address
  if(address === '::') address = 'localhost'
  console.log(`Server started on http://${address}:${server.address().port}`)
})
