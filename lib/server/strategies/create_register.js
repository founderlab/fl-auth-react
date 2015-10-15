'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createRegisterStrategy;

var _passportLocal = require('passport-local');

var _lib = require('../lib');

function createRegisterStrategy(User) {

  return new _passportLocal.Strategy({ passReqToCallback: true, usernameField: 'email' }, function (req, email, password, callback) {
    User.findOne({ email: email }, function (err, user) {
      if (err) return callback(err);

      if (user) {
        console.log('register error: user exists', email);
        return callback(null, false, 'user exists');
      }

      var new_user = new User({ email: email, password: User.createHash(password) });
      new_user.save(function (err) {
        if (err) return callback(err);

        (0, _lib.findOrCreateAccessToken)({ user_id: user.id }, { expires: true }, function (err, access_token, info) {
          if (err) return callback(err);
          console.log('passwd: access_token', access_token);
          req.session.access_token = { id: access_token, expires_at: info.expires_at };
          req.session.save(function (err) {
            return console.log('saved session', err, req.session);
          });
          callback(null, new_user);
        });
      });
    });
  });
}

module.exports = exports['default'];