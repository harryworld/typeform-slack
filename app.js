var config = {
  typeformUID: '',
  typeformKey: '',
  typeformEmailField: '',
  typeformFirstNameField: '',
  typeformLastNameField: '',

  slackChannel: '',
  slackToken: '',

  dataFile: __dirname + '/data.json'
};

var request = require('request'),
    Cubby = require('cubby'),
    cubby = new Cubby({file: config.dataFile});

cubby.set('form-id-since', cubby.get('form-id-since') || 1);

var typeformUrl = "https://api.typeform.com/v0/form/" + config.typeformUID + "?key=" + config.typeformKey + "&completed=true&form-id-since=" + cubby.get('form-id-since');

var slackInviteUrl = "https://slack.com/api/users.admin.invite";

var sendSlackInvitation = function(users) {
  var convertParamsToUrl = function(user) {
    var str = "?" + Object.keys(user).map(function(prop) {
      return [prop, user[prop]].map(encodeURIComponent).join("=");
    }).join("&");

    return str;
  }

  var getSlackInviteUrl = function(user) {
    return slackInviteUrl += convertParamsToUrl(user);
  };

  users.forEach(function(user) {
    var user = {
      t: Math.floor(Date.now() / 1000),
      token: config.slackToken,
      email: user.email,
      first_name: user.first_name,
      channels: config.slackChannel,
      set_active: true,
      _attempts: 1
    };

    request({
      url: getSlackInviteUrl(user),
      json: true
    }, function(err, response, body) {
      if (!err && body.ok == true) {
        cubby.set('form-id-since', Math.floor(Date.now() / 1000));

        console.log("Invited: " + user.first_name + ", " + user.last_name + " <" + user.email + ">");
      } else {
        console.log("Error exists: ", body.error);
      }
    });
  });
}

//
// Start the app
//

request(
  {
    url: typeformUrl,
    json: true
  }
  , function(err, response, body) {
    if (!err && response.statusCode == 200) {
      var users = [];

      body.responses.forEach(function(member) {
        var user = {};
        user.email = member.answers[config.typeformEmailField];
        user.first_name = member.answers[config.typeformFirstNameField];
        user.last_name = member.answers[config.typeformLastNameField];
        users.push(user);
      });

      sendSlackInvitation(users);
    }
  }
);
