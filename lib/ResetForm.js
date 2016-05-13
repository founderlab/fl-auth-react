'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reduxForm = require('redux-form');

var _validation = require('./validation');

//
// ResetForm
// This page should be reached from a link in a password reset email
// That link should have email / resetToken as query params, which will be in props.query
//

var ResetForm = (function (_Component) {
  _inherits(ResetForm, _Component);

  function ResetForm() {
    var _this = this;

    _classCallCheck(this, _ResetForm);

    _Component.apply(this, arguments);

    this.onSubmit = function (data) {
      data.email = _this.props.email;
      data.resetToken = _this.props.resetToken;
      _this.props.onSubmit(data);
    };
  }

  ResetForm.prototype.render = function render() {
    var _props = this.props;
    var password = _props.fields.password;
    var handleSubmit = _props.handleSubmit;
    var auth = _props.auth;

    var error = auth.get('errors') ? auth.get('errors').get('register') : null;
    var errorMsg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString();

    return _react2['default'].createElement(
      'form',
      { onSubmit: handleSubmit(this.onSubmit) },
      _react2['default'].createElement(
        'p',
        null,
        this.props.email
      ),
      _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'password', placeholder: 'password',
        bsStyle: _validation.validationState(password), help: password.touched && password.error }, password)),
      _react2['default'].createElement(
        _reactBootstrap.Button,
        { onClick: handleSubmit(this.onSubmit), bsStyle: 'primary' },
        'Set password'
      ),
      auth.get('loading') && _react2['default'].createElement(
        'small',
        null,
        'loading...'
      ),
      error && _react2['default'].createElement(
        'small',
        null,
        errorMsg
      )
    );
  };

  _createClass(ResetForm, null, [{
    key: 'propTypes',
    value: {
      auth: _react.PropTypes.object.isRequired,
      email: _react.PropTypes.string.isRequired,
      resetToken: _react.PropTypes.string.isRequired,
      fields: _react.PropTypes.object.isRequired,
      onSubmit: _react.PropTypes.func.isRequired,
      handleSubmit: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _ResetForm = ResetForm;
  ResetForm = _reduxForm.reduxForm({
    form: 'reset',
    fields: ['email', 'password', 'resetToken'],
    validate: _validation.validateEmailPass
  })(ResetForm) || ResetForm;
  return ResetForm;
})(_react.Component);

exports['default'] = ResetForm;
module.exports = exports['default'];