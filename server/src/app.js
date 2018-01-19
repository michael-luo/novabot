const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path');
const serveStatic = require('serve-static');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(serveStatic(path.dirname(path.dirname(__dirname)) + '/client/dist'));

app.get('/transactions', (req, res) => {
  res.send(
    [{
    	id: "378943728943728",
      type: "Payment",
    }]
  )
})

app.listen(process.env.PORT || 8081)
