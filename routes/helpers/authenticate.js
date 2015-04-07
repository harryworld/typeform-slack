var helpers = {};

helpers.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/accounts/login')
}

module.exports = helpers;