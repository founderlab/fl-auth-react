'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _create_register = require('./create_register');

var _create_register2 = _interopRequireDefault(_create_register);

var _bearer = require('./bearer');

var _bearer2 = _interopRequireDefault(_bearer);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

exports['default'] = { BearerStrategy: _bearer2['default'], LoginStrategy: _login2['default'], createRegisterStrategy: _create_register2['default'] };
module.exports = exports['default'];