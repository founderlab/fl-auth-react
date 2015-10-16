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

  console.log('ACTION:', action.type, action);
  switch (action.type) {
    case 'REGISTER_START':
    case 'LOGIN_START':
      return state['delete']('error').set('loading', true);

    case 'REGISTER_ERROR':
    case 'LOGIN_ERROR':
      return state.merge({ loading: false, error: action.error || action.res.body.error });

    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return state.merge({ loading: false, error: false, email: action.res.body.user.email });

    case 'LOGOUT':
      return state['delete']('loading')['delete']('error')['delete']('email');

    default:
      return state;

  }
}

module.exports = exports['default'];