'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var db_url = process.env.AUTH_DATABASE_URL || process.env.DATABASE_URL;
if (!db_url) console.log('Missing process.env.DATABASE_URL');

var RefreshToken = (function (_Backbone$Model) {
  _inherits(RefreshToken, _Backbone$Model);

  function RefreshToken() {
    _classCallCheck(this, RefreshToken);

    _get(Object.getPrototypeOf(RefreshToken.prototype), 'constructor', this).apply(this, arguments);

    this.url = db_url + '/refresh_tokens';
    this.schema = {
      created_at: [{ indexed: true }],
      expires_at: [{ indexed: true }],
      // client: -> ['belongsTo', require('./client')]
      user: function user() {
        return ['belongsTo', require('./user')];
      },
      refresh_token: function refresh_token() {
        return ['belongsTo', require('./refresh_token')];
      }
    };
  }

  _createClass(RefreshToken, [{
    key: 'defaults',
    value: function defaults() {
      return { created_at: _moment2['default'].utc().toDate() };
    }
  }]);

  return RefreshToken;
})(_backbone2['default'].Model);

exports['default'] = RefreshToken;

RefreshToken.prototype.sync = require('backbone-mongo').sync(RefreshToken);
module.exports = exports['default'];