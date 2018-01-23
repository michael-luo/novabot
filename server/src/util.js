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

module.exports = {
  devOnly,
  prodOnly,
  devOrProd
}