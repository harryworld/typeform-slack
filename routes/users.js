var express = require('express');
var router = express.Router();

var User = require('../app/models/user.js');

router.route('/users')
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  });

module.exports = router;
