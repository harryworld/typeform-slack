var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('./helpers/authenticate').ensureAuthenticated;

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'HKStartups Slack Group', user : req.user });
});

router.get('/users', ensureAuthenticated, function(req, res) {
  res.render('users', { user: req.user });
});

module.exports = router;
