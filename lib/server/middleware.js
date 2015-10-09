'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = configureMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function configureMiddleware() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var app = options.app;
  if (!app) throw new Error('[fl-auth] Missing app from configureMiddleware, got ' + options);

  if (options.middleware.initialize) app.use(_passport2['default'].initialize());
  if (options.middleware.session) app.use(_passport2['default'].session());
}

module.exports = exports['default'];