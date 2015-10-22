'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = authReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var default_state = new _immutable2['default'].Map();

function authReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? default_state : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return state.merge({ loading: true, login_error: null, register_error: null });

    case 'LOGIN_ERROR':
      return state.merge({ loading: false, register_error: null, login_error: action.error || action.res.body.error });
    case 'REGISTER_ERROR':
      return state.merge({ loading: false, login_error: null, register_error: action.error || action.res.body.error });

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return state.merge({ loading: false, login_error: null, register_error: null, email: action.res.body.user.email });

    case 'LOGOUT':
      return new _immutable2['default'].Map();

    default:
      return state;

  }
}

module.exports = exports['default'];