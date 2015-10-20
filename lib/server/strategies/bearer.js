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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _passport = require('passport');

var _lib = require('../lib');

var _modelsAccess_token = require('../models/access_token');

var _modelsAccess_token2 = _interopRequireDefault(_modelsAccess_token);

var defaults = {
  name: 'bearer',
  check_request: true,
  check_cookies: true
};

// bearer token that considers request and cookies

var BearerStrategy = (function (_Strategy) {
  _inherits(BearerStrategy, _Strategy);

  function BearerStrategy(options, verify) {
    _classCallCheck(this, BearerStrategy);

    _get(Object.getPrototypeOf(BearerStrategy.prototype), 'constructor', this).call(this, options);
    _lodash2['default'].defaults(options, defaults);
    _lodash2['default'].merge(this, options);
    if (!this.User) throw new Error('[fl-auth] PasswordStrategy: Missing User from options');
    if (verify) this.verify = verify;
  }

  _createClass(BearerStrategy, [{
    key: 'verify',
    value: function verify(req, access_token_id, callback) {
      console.log('verifying', access_token_id);
      var User = this.User;

      _modelsAccess_token2['default'].cursor({ id: access_token_id, $one: true }).toJSON(function (err, access_token) {
        if (err || !access_token) return callback(err, false);

        // todo: when to refresh tokens?
        // const expires_at = access_token.expires_at

        // if (expires_at && moment().isAfter(expires_at)) {
        //   this.refreshToken(access_token.refresh_token, (err, new_access_token) => {
        //     if (err || !new_access_token) {
        //       logout()
        //       return res.redirect(302, '/login')
        //     }
        //     req.session.access_token = new_access_token
        //     req.session.save(err => { if (err) console.log('Failed to save access token to session during refresh') } )
        //     next()
        //   })

        // } else next()

        User.findOne(access_token.user_id, function (err, user) {
          if (err) return callback(err);
          callback(null, user);
        });
      });
    }
  }, {
    key: 'refreshToken',
    value: function refreshToken(refresh_token, callback) {
      callback();
    }
  }, {
    key: 'authenticate',
    value: function authenticate(req) {
      var _this = this;

      var access_token = null;

      if (req.headers && req.headers.authorization) access_token = (0, _lib.parseAuthHeader)(req, 'Bearer');

      if (this.check_request && !access_token) access_token = req.query && req.query.$access_token || req.body && req.body.$access_token;
      if (req.body && req.body.$access_token) delete req.body.$access_token;

      if (this.check_cookies && !access_token && req.cookies) access_token = req.cookies.access_token;

      if (!access_token) return this.fail(401);

      this.verify(req, access_token, function (err, user, info) {
        if (err) return _this.error(err);
        if (!user) return _this.fail(401);
        _this.success(user, info);
      });
    }
  }]);

  return BearerStrategy;
})(_passport.Strategy);

exports['default'] = BearerStrategy;
module.exports = exports['default'];