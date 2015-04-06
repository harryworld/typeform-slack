var request = require('supertest')
  , express = require('express');

var app = require('../../app');

describe('Users', function() {
  it("shows list of users", function(done) {
    request(app).get('/api/users').expect(200, done);
  });

  it("creates an user");
});
