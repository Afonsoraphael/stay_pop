const isAdmin = (req, res, next) => {
  console.log(req.session)
  return req.session.user && req.session.user.isAdmin === true ? next() : res.redirect("/login");
}

module.exports = isAdmin;