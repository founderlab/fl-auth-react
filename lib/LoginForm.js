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

var LoginForm = (function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm() {
    _classCallCheck(this, _LoginForm);

    _Component.apply(this, arguments);
  }

  LoginForm.prototype.render = function render() {
    var _props = this.props;
    var _props$fields = _props.fields;
    var email = _props$fields.email;
    var password = _props$fields.password;
    var handleSubmit = _props.handleSubmit;
    var auth = _props.auth;

    var error = auth.get('errors') ? auth.get('errors').get('login') : null;
    var errorMsg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString();
    var formClass = this.props.mode === 'horizontal' ? 'form-inline' : '';

    return _react2['default'].createElement(
      'form',
      { className: formClass, onSubmit: handleSubmit },
      _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'text', placeholder: 'email', autoComplete: 'on',
        bsStyle: _validation.validationState(email), help: email.touched && email.error }, email)),
      _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'password', placeholder: 'password', autoComplete: 'on',
        bsStyle: _validation.validationState(password), help: password.touched && password.error }, password)),
      _react2['default'].createElement(
        _reactBootstrap.Button,
        { onClick: handleSubmit, bsStyle: 'primary' },
        'Login'
      ),
      auth.get('loading') && _react2['default'].createElement(
        'small',
        null,
        _react2['default'].createElement('br', null),
        'loading...'
      ),
      error && _react2['default'].createElement(
        'small',
        null,
        _react2['default'].createElement('br', null),
        'Invalid email or password',
        _react2['default'].createElement(
          'span',
          { style: { display: 'none' } },
          errorMsg
        )
      )
    );
  };

  _createClass(LoginForm, null, [{
    key: 'propTypes',
    value: {
      auth: _react.PropTypes.object,
      fields: _react.PropTypes.object.isRequired,
      mode: _react.PropTypes.string,
      handleSubmit: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _LoginForm = LoginForm;
  LoginForm = _reduxForm.reduxForm({
    form: 'login',
    fields: ['email', 'password']
  })(LoginForm) || LoginForm;
  return LoginForm;
})(_react.Component);

exports['default'] = LoginForm;
module.exports = exports['default'];