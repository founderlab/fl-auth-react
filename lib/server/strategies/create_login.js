'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createLoginStrategy;

var _passportLocal = require('passport-local');

function createLoginStrategy(User) {

  return new _passportLocal.Strategy({ passReqToCallback: true, usernameField: 'email' }, function (req, email, password, callback) {
    User.findOne({ email: email }, function (err, user) {
      if (err) return callback(err);
      if (!user) {
        console.log('login error: user not found', email);
        return callback(null, false, 'User not found');
      }
      if (!user.passwordIsValid(password)) {
        return callback(null, false, 'Incorrect password');
      }
      callback(null, user);
    });
  });
}

module.exports = exports['default'];