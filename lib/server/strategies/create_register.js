'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createRegisterStrategy;

var _passportLocal = require('passport-local');

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
        callback(null, new_user);
      });
    });
  });
}

module.exports = exports['default'];