const isLoggedIn = (req, res, next) => {
  const userLogged = req.session.user

  if(!userLogged) {
    // return res.status(401).json({error: 'User not logged in'});
    return res.redirect('/login')
  }

  return next();
}

module.exports = isLoggedIn;