'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _login_form = require('./login_form');

var _login_form2 = _interopRequireDefault(_login_form);

var _register_form = require('./register_form');

var _register_form2 = _interopRequireDefault(_register_form);

exports['default'] = { LoginForm: _login_form2['default'], RegisterForm: _register_form2['default'] };
module.exports = exports['default'];