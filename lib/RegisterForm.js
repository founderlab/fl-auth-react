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

var RegisterForm = (function (_Component) {
  _inherits(RegisterForm, _Component);

  function RegisterForm() {
    _classCallCheck(this, _RegisterForm);

    _Component.apply(this, arguments);
  }

  RegisterForm.prototype.render = function render() {
    var _props = this.props;
    var _props$fields = _props.fields;
    var email = _props$fields.email;
    var password = _props$fields.password;
    var handleSubmit = _props.handleSubmit;
    var auth = _props.auth;
    var facebook = _props.facebook;

    var error = auth.get('errors') ? auth.get('errors').get('register') : null;
    var error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString();

    return _react2['default'].createElement(
      'form',
      { onSubmit: handleSubmit },
      _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'text', placeholder: 'email', name: 'email', autoComplete: 'on',
        bsStyle: _validation.validationState(email), help: email.touched && email.error }, email)),
      _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'password', placeholder: 'password', name: 'password', autoComplete: 'on',
        bsStyle: _validation.validationState(password), help: password.touched && password.error }, password)),
      _react2['default'].createElement(
        _reactBootstrap.Button,
        { onClick: handleSubmit, bsStyle: 'primary' },
        'Register'
      ),
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
      facebook && _react2['default'].createElement(
        'a',
        { href: '/auth/facebook' },
        'Login with Facebook'
      )
    );
  };

  _createClass(RegisterForm, null, [{
    key: 'propTypes',
    value: {
      auth: _react.PropTypes.object,
      fields: _react.PropTypes.object.isRequired,
      handleSubmit: _react.PropTypes.func.isRequired,
      facebook: _react.PropTypes.bool
    },
    enumerable: true
  }]);

  var _RegisterForm = RegisterForm;
  RegisterForm = _reduxForm.reduxForm({
    form: 'register',
    fields: ['email', 'password'],
    validate: _validation.validateEmailPass
  })(RegisterForm) || RegisterForm;
  return RegisterForm;
})(_react.Component);

exports['default'] = RegisterForm;
module.exports = exports['default'];