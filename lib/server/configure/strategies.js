'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = configureStrategies;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

var _strategies = require('../strategies');

function configureStrategies() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var User = options.User;
  if (!User) throw new Error('[fl-auth] Missing User model from configureStrategies, got ' + options);

  // passport functions
  var strategy_options = _extends({ User: User }, options.login);
  _passport2['default'].use('password', new _strategies.PasswordStrategy(strategy_options));
  _passport2['default'].use('register', new _strategies.RegisterStrategy(strategy_options));
  _passport2['default'].use('bearer', new _strategies.BearerStrategy(strategy_options));

  if (options.facebook) {
    _passport2['default'].use(new _passportFacebook.Strategy({
      clientID: options.facebook.app_id,
      clientSecret: options.facebook.app_secret,
      callbackURL: options.facebook.url + options.facebook.paths.callback,
      profileFields: options.facebook.profile_fields
    }, function (access_token, refresh_token, profile, callback) {
      var email = _lodash2['default'].get(profile, 'emails[0].value', '');
      if (!email) return callback(new Error('[fl-auth] FacebookStrategy: No email from Facebook, got profile: ' + JSON.stringify(profile)));

      User.findOrCreate({ email: email }, function (err, user) {
        if (err) return callback(err);
        user.save({ facebook_id: profile.id, name: profile.displayName, facebook_access_token: access_token }, callback);
      });
    }));
  }
}

module.exports = exports['default'];