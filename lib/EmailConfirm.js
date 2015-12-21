'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = EmailConfirm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

//
// EmailConfirm
// This page should be reached from a link in an email confirmation email
// That link should have email / token as query params, which will be in props.query
//

function EmailConfirm(props) {
  var auth = props.auth;
  var confirmEmail = props.confirmEmail;
  var children = props.children;
  var email = props.email;
  var token = props.token;

  var error = auth.get('errors') ? auth.get('errors').get('email_confirm') : null;
  var error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString();

  if (!error && !auth.get('loading') && !auth.get('email_confirmed')) {
    confirmEmail(email, token);
  }

  return _react2['default'].createElement(
    'div',
    null,
    auth.get('loading') && _react2['default'].createElement(
      'small',
      null,
      'loading...'
    ),
    error && _react2['default'].createElement(
      'small',
      null,
      error_msg
    ),
    auth.get('email_confirmed') && children
  );
}

EmailConfirm.propTypes = {
  auth: _react.PropTypes.object.isRequired,
  email: _react.PropTypes.string.isRequired,
  token: _react.PropTypes.string.isRequired,
  children: _react.PropTypes.array,
  confirmEmail: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];