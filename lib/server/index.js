'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = configure;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _strategies = require('./strategies');

var _strategies2 = _interopRequireDefault(_strategies);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _serialize = require('./serialize');

var _serialize2 = _interopRequireDefault(_serialize);

var _authEnsure_logged_in = require('./auth/ensure_logged_in');

var _authEnsure_logged_in2 = _interopRequireDefault(_authEnsure_logged_in);

var defaults = {
  middleware: {
    initialize: true,
    session: true
  },
  paths: {
    login: '/login',
    logout: '/logout',
    register: '/register',
    success: '/'
  },
  facebook: {
    url: process.env.URL,
    paths: {
      redirect: '/auth/facebook',
      callback: '/auth/facebook/callback'
    },
    scope: ['email'],
    profile_fields: ['id', 'displayName', 'email']
  }
};

function configure() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _lodash2['default'].merge(options, defaults);
  if (!options.app) throw new Error('[fl-auth] init: Missing app from options');
  options.User = options.User || options.user_model_type || require('./models/user');

  (0, _middleware2['default'])(options);
  (0, _serialize2['default'])(options);
  (0, _strategies2['default'])(options);
  (0, _routes2['default'])(options);
}

exports.configure = configure;
exports.ensureLoggedIn = _authEnsure_logged_in2['default'];