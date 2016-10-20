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
  var emailConfirmed = props.emailConfirmed;
  var loading = props.loading;
  var errorMsg = props.errorMsg;
  var confirmEmail = props.confirmEmail;
  var children = props.children;
  var email = props.email;
  var token = props.token;

  if (!errorMsg && !loading && emailConfirmed) {
    confirmEmail(email, token);
  }

  return _react2['default'].createElement(
    'div',
    null,
    loading && _react2['default'].createElement(
      'small',
      null,
      'loading...'
    ),
    errorMsg && _react2['default'].createElement(
      'small',
      null,
      errorMsg
    ),
    emailConfirmed && children
  );
}

EmailConfirm.propTypes = {
  email: _react.PropTypes.string.isRequired,
  token: _react.PropTypes.string.isRequired,
  errorMsg: _react.PropTypes.string,
  loading: _react.PropTypes.bool,
  emailConfirmed: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  confirmEmail: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];