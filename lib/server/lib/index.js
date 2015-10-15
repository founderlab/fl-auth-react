'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.findOrCreateAccessToken = findOrCreateAccessToken;
exports.parseAuthHeader = parseAuthHeader;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

var _modelsAccess_token = require('../models/access_token');

var _modelsAccess_token2 = _interopRequireDefault(_modelsAccess_token);

var _modelsRefresh_token = require('../models/refresh_token');

var _modelsRefresh_token2 = _interopRequireDefault(_modelsRefresh_token);

var RESOURCE_EXPIRY_MINS = 5;
var TOKEN_EXPIRY_MINS = 120;
var SESSION_EXPIRY_DAYS = 365;

function cleanUpTokens(callback) {
  _modelsAccess_token2['default'].destroy({ expires_at: { $lte: _moment2['default'].utc().subtract(RESOURCE_EXPIRY_MINS, 'minutes').toDate() } }, function (err) {
    if (err) return callback(err);
    _modelsRefresh_token2['default'].destroy({ created_at: { $lte: _moment2['default'].utc().subtract(SESSION_EXPIRY_DAYS, 'days').toDate() } }, callback);
  });
}

function getExpiryTime() {
  return _moment2['default'].utc().add(TOKEN_EXPIRY_MINS, 'minutes').toDate();
}

function findOrCreateAccessToken(query, options, done) {
  if (options === undefined) options = {};

  var callback = function callback(err, access_token) {
    if (err) return done(err);
    if (!access_token) return done(new Error('Failed to create Access Token'));
    done(null, access_token.id, access_token.get('refresh_token_id'), { expires_at: access_token.get('expires_at') });
  };

  var access_token = null;
  var refresh_token = options.refresh_token;
  var queue = new _queueAsync2['default'](1);

  // check for existing token for non-expiring tokens
  if (!options.expires) {
    queue.defer(function (callback) {
      _modelsAccess_token2['default'].findOne(query, function (err, access_token_) {
        if (err) return callback(err);
        if (!access_token_ && !access_token_.get('expires_at')) return callback(); // exists but expires
        access_token = access_token_;
        callback();
      });
    });
  } else if (!refresh_token) {
    queue.defer(function (callback) {
      refresh_token = new _modelsRefresh_token2['default'](query);
      refresh_token.save(callback);
    });
  }

  queue.await(function (err) {
    if (err) return callback(err);
    if (access_token) callback(null, access_token);

    var create_query = _lodash2['default'].clone(query);
    if (options.expires) _lodash2['default'].extend(create_query, { expires_at: getExpiryTime(), refresh_token: refresh_token.id });
    access_token = new _modelsAccess_token2['default'](create_query);

    access_token.save(function (err) {
      if (err) return callback(err);
      cleanUpTokens(function (err) {
        if (err) return callback(err);
        callback(null, access_token);
      });
    });
  });
}

// Usage: parseAuthHeader(req, 'Bearer')

function parseAuthHeader(req, name) {
  if (!req.headers.authorization) return null;

  var parts = req.headers.authorization.split(' ');
  if (parts.length !== 2) return null;

  var scheme = parts[0];
  var credentials = parts[1];
  var auth = null;
  if (new RegExp('^' + name + '$', 'i').test(scheme)) auth = credentials;
  return auth;
}