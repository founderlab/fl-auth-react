'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _passport = require('passport');

var _lib = require('../lib');

var RegisterStrategy = (function (_Strategy) {
  _inherits(RegisterStrategy, _Strategy);

  function RegisterStrategy(options, verify) {
    if (options === undefined) options = {};

    _classCallCheck(this, RegisterStrategy);

    _get(Object.getPrototypeOf(RegisterStrategy.prototype), 'constructor', this).call(this);
    _lodash2['default'].merge(this, options);
    if (!this.User) throw new Error('[fl-auth] LocalStrategy: Missing User from options');
    if (verify) this.verify = verify.bind(this);
  }

  _createClass(RegisterStrategy, [{
    key: 'authenticate',
    value: function authenticate(req, options) {
      var _this = this;

      var email = req.body && req.body[this.username_field] || req.query && req.query[this.username_field];
      var password = req.body && req.body[this.password_field] || req.query && req.query[this.password_field];

      console.log('"REG AUTH"', email, password);
      if (!email || !password) return this.fail(this.bad_request_message);

      this.verify(req, email, password, function (err, user, info) {
        if (err) return _this.error(err);
        if (!user) return _this.fail(info);

        (0, _lib.findOrCreateAccessToken)({ user_id: user.id }, { expires: true }, function (err, access_token, info) {
          if (err) return _this.error(err);
          console.log('"TOKEN"', access_token, info);
          req.session.access_token = { id: access_token, expires_at: info.expires_at };
          req.session.save(function (err) {
            return console.log('saved session', err, req.session);
          });
          console.log('register: access_token', req.session.access_token);
          _this.success(user, { access_token: access_token });
        });
      });
    }
  }]);

  return RegisterStrategy;
})(_passport.Strategy);

exports['default'] = RegisterStrategy;
module.exports = exports['default'];