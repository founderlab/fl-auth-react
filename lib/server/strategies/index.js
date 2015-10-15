'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _create_register = require('./create_register');

var _create_register2 = _interopRequireDefault(_create_register);

var _bearer = require('./bearer');

var _bearer2 = _interopRequireDefault(_bearer);

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

exports['default'] = { BearerStrategy: _bearer2['default'], PasswordStrategy: _password2['default'], createRegisterStrategy: _create_register2['default'] };
module.exports = exports['default'];