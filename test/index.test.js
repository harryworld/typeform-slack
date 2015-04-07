var request = require('supertest')
  , express = require('express');

var app = require('../app');

describe('Index Page', function() {
  it("renders successfully", function(done) {
    request(app).get('/').expect(200, done);
  });

  it("shows welcome title", function(done) {
    request(app).get('/')
      .expect(200)
      .expect(/Welcome to HKStartups Slack Group/, done);
  });

  it("should redirect to login page", function(done) {
    request(app).get('/users')
      .expect(302, done)
  })

  it("should have logo");
  it("should have a login form");
});