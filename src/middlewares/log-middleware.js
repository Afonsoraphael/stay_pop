function logMiddleware(req, res, next) {
  console.log(`${req.url}`)

  return next()
}

module.exports = logMiddleware