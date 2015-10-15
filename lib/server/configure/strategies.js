'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = configureStrategies;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _strategies = require('../strategies');

var _passportFacebook = require('passport-facebook');

function configureStrategies() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var User = options.User;
  if (!User) throw new Error('[fl-auth] Missing User model from configureStrategies, got ' + options);

  // passport functions
  _passport2['default'].use('login', new _strategies.LoginStrategy({ User: User }));
  _passport2['default'].use('register', (0, _strategies.createRegisterStrategy)(User));

  if (options.facebook) {
    _passport2['default'].use(new _passportFacebook.Strategy({
      clientID: options.facebook.app_id,
      clientSecret: options.facebook.app_secret,
      callbackURL: options.facebook.url + options.facebook.paths.callback,
      profileFields: options.facebook.profile_fields
    }, function (accessToken, refreshToken, profile, callback) {
      var queue = new _queueAsync2['default'](1);
      var email = _lodash2['default'].get(profile, 'emails[0].value', '');
      var user = undefined;
      console.log('profile:', profile, email);

      if (email) queue.defer(function (callback) {
        return User.findOne({ email: email }, function (err, found_user) {
          return callback(err, user = found_user);
        });
      });

      queue.await(function (err) {
        if (err) return callback(err);
        if (!user) user = new User({ email: email });
        user.save({ facebook_id: profile.id, name: profile.displayName }, callback);
      });
    }));
  }
}

module.exports = exports['default'];