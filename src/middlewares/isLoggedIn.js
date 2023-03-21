const isLoggedIn = (req, res, next) => {
  const userLogged = req.session.user

  if(userLogged) return res.redirect('/login')

  return next();
}

module.exports = isLoggedIn;