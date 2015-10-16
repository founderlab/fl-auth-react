'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _passport = require('passport');

var _lib = require('../lib');

var PasswordStrategy = (function (_Strategy) {
  _inherits(PasswordStrategy, _Strategy);

  function PasswordStrategy() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PasswordStrategy);

    _get(Object.getPrototypeOf(PasswordStrategy.prototype), 'constructor', this).call(this);
    _lodash2['default'].merge(this, options);
    if (!this.User) throw new Error('[fl-auth] PasswordStrategy: Missing User from options');
  }

  _createClass(PasswordStrategy, [{
    key: 'verify',
    value: function verify(req, email, password, callback) {
      var User = this.User;

      User.findOne({ email: email }, function (err, user) {
        if (err) return callback(err);
        if (!user) {
          console.log('[fl-auth] email error: user not found', email);
          return callback(null, false, 'User not found');
        }
        if (!user.passwordIsValid(password)) {
          return callback(null, false, 'Incorrect password');
        }

        (0, _lib.findOrCreateAccessToken)({ user_id: user.id }, { expires: true }, function (err, access_token, info) {
          if (err) return callback(err);
          console.log('passwd: access_token', access_token);
          req.session.access_token = { id: access_token, expires_at: info.expires_at };
          req.session.save(function (err) {
            return console.log('saved session', err, req.session);
          });
          callback(null, user);
        });
      });
    }
  }, {
    key: 'authenticate',
    value: function authenticate(req, options) {
      var _this = this;

      var email = req.body && req.body[this.username_field] || req.query && req.query[this.username_field];
      var password = req.body && req.body[this.password_field] || req.query && req.query[this.password_field];

      if (!email || !password) return this.fail({ message: options.bad_request_message }, 400);

      this.verify(req, email, password, function (err, user, msg) {
        if (err) return _this.error(err);
        if (!user) return _this.fail(msg);
        _this.success(user, msg);
      });
    }
  }]);

  return PasswordStrategy;
})(_passport.Strategy);

exports['default'] = PasswordStrategy;
module.exports = exports['default'];