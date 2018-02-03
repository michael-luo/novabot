// For helping configure environment
const devOnly = cb => {
  if(process.env.NODE_ENV !== 'production') cb()
}

const prodOnly = cb => {
  if(process.env.NODE_ENV === 'production') cb()
}

const devOrProd = (devCB, prodCB) => {
  if(process.env.NODE_ENV === 'production') prodCB()
  else devCB()
}

// For API responses
const forbidden = (res, msg) => {
  return res.status(401).json({
    error: 'Unauthenticated',
    message: msg,
    status: 401
  })
}

const bad = (res, msg) => {
  return res.status(400).json({
    error: 'Bad Request',
    message: msg,
    status: 400
  })
}

const serverErr = (res, msg) => {
  return res.status(500).json({
    error: 'Internal Server Error',
    message: msg,
    status: 500
  })
}

module.exports = {
  devOnly,
  prodOnly,
  devOrProd,
  forbidden,
  bad,
  serverErr
}