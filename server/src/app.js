if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}  

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

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cookieSession({'secret': 'nuclear'}));
app.use(passport.initialize());
app.use(passport.session())
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))
app.use(express.static(path.join(__dirname, 'public')));

// Set up the API routes, auth, and business logic
require('./api')(app, passport)

const port = 8081
const server = app.listen(process.env.PORT || port, () => {
  let address = server.address().address
  if(address === '::') address = 'localhost'
  console.log(`Server started on http://${address}:${server.address().port}`)
})
