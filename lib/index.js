'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _login_form = require('./login_form');

var _login_form2 = _interopRequireDefault(_login_form);

var _register_form = require('./register_form');

var _register_form2 = _interopRequireDefault(_register_form);

var _reset_form = require('./reset_form');

var _reset_form2 = _interopRequireDefault(_reset_form);

var _reset_request_form = require('./reset_request_form');

var _reset_request_form2 = _interopRequireDefault(_reset_request_form);

exports['default'] = { LoginForm: _login_form2['default'], RegisterForm: _register_form2['default'], ResetForm: _reset_form2['default'], ResetRequestForm: _reset_request_form2['default'] };
module.exports = exports['default'];