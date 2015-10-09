'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ensureLoggedInMiddleware;

function ensureLoggedInMiddleware(req, res, next) {
  console.log('login check: ', req.isAuthenticated(), req.user);
  if (!req.isAuthenticated || !req.isAuthenticated()) return res.redirect(302, '/login');
  next();
}

module.exports = exports['default'];