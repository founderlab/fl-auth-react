'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = configure;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _configureStrategies = require('./configure/strategies');

var _configureStrategies2 = _interopRequireDefault(_configureStrategies);

var _configureRoutes = require('./configure/routes');

var _configureRoutes2 = _interopRequireDefault(_configureRoutes);

var _configureMiddleware = require('./configure/middleware');

var _configureMiddleware2 = _interopRequireDefault(_configureMiddleware);

var _configureSerialize = require('./configure/serialize');

var _configureSerialize2 = _interopRequireDefault(_configureSerialize);

var _middlewareEnsure_logged_in = require('./middleware/ensure_logged_in');

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
  },
  login: {
    username_field: 'email',
    password_field: 'password',
    bad_request_message: 'Missing credentials'
  }
};

function configure() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _lodash2['default'].merge(options, defaults);
  if (!options.app) throw new Error('[fl-auth] init: Missing app from options');
  options.User = options.User || require('./models/user');

  (0, _configureMiddleware2['default'])(options);
  (0, _configureSerialize2['default'])(options);
  (0, _configureStrategies2['default'])(options);
  (0, _configureRoutes2['default'])(options);
}

exports.configure = configure;
exports.ensureLoggedIn = _middlewareEnsure_logged_in.ensureLoggedIn;
exports.bearer = _middlewareEnsure_logged_in.bearer;