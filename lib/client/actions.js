'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.register = register;
exports.login = login;
exports.logout = logout;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function register(url, email, password) {
  console.log('register url, email, password', url, email, password);
  return {
    type: 'LOGIN',
    request: _superagent2['default'].post(url).send({ email: email, password: password })
  };
}

function login(url, email, password) {
  console.log('login url, email, password', url, email, password);
  return {
    type: 'LOGIN',
    request: _superagent2['default'].post(url).send({ email: email, password: password })
  };
}

function logout() {
  return {
    type: 'LOGOUT',
    payload: {}
  };
}

exports['default'] = { register: register, login: login, logout: logout };