'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _flReactUtils = require('fl-react-utils');

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
    var loading = _props.loading;
    var errorMsg = _props.errorMsg;
    var facebook = _props.facebook;
    var handleSubmit = _props.handleSubmit;

    return _react2['default'].createElement(
      'form',
      { onSubmit: handleSubmit },
      _react2['default'].createElement(_reduxForm.Field, {
        type: 'text',
        name: 'email',
        inputProps: { placeholder: 'Email' },
        component: _flReactUtils.Input
      }),
      _react2['default'].createElement(_reduxForm.Field, {
        type: 'password',
        name: 'password',
        inputProps: { placeholder: 'Password (6 or more characters)' },
        component: _flReactUtils.Input
      }),
      _react2['default'].createElement(
        _reactBootstrap.Button,
        { onClick: handleSubmit, bsStyle: 'primary', type: 'submit' },
        'Register'
      ),
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
      loading: _react.PropTypes.bool,
      errorMsg: _react.PropTypes.string,
      facebook: _react.PropTypes.bool,
      handleSubmit: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _RegisterForm = RegisterForm;
  RegisterForm = _reduxForm.reduxForm({
    form: 'register',
    validate: _validation.validateEmailPass
  })(RegisterForm) || RegisterForm;
  return RegisterForm;
})(_react.Component);

exports['default'] = RegisterForm;
module.exports = exports['default'];