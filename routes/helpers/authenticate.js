var helpers = {};

helpers.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.returnTo = req.path;
  res.redirect('/accounts/login')
}

module.exports = helpers;