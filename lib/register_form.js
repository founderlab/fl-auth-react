'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reduxForm = require('redux-form');

var _validation = require('./validation');

var RegisterForm = (function (_React$Component) {
  _inherits(RegisterForm, _React$Component);

  function RegisterForm() {
    _classCallCheck(this, _RegisterForm);

    _get(Object.getPrototypeOf(_RegisterForm.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(RegisterForm, [{
    key: 'validationState',
    value: function validationState(field) {
      if (field.touched && field.error) return 'error';
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var _props$fields = _props.fields;
      var email = _props$fields.email;
      var password = _props$fields.password;
      var handleSubmit = _props.handleSubmit;
      var auth = _props.auth;

      var error = auth.get('errors') ? auth.get('errors').get('register') : null;
      var error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString();

      return _react2['default'].createElement(
        'form',
        { onSubmit: handleSubmit },
        _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'text', placeholder: 'email',
          bsStyle: (0, _validation.validationState)(email), help: email.touched && email.error }, email)),
        _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'password', placeholder: 'password',
          bsStyle: (0, _validation.validationState)(password), help: password.touched && password.error }, password)),
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
        _react2['default'].createElement(
          'a',
          { href: '/auth/facebook' },
          'Login with Facebook'
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      auth: _react2['default'].PropTypes.object,
      fields: _react2['default'].PropTypes.object.isRequired,
      handleSubmit: _react2['default'].PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _RegisterForm = RegisterForm;
  RegisterForm = (0, _reduxForm.connectReduxForm)({
    form: 'register',
    fields: ['email', 'password'],
    validate: _validation.validateEmailPass
  })(RegisterForm) || RegisterForm;
  return RegisterForm;
})(_react2['default'].Component);

exports['default'] = RegisterForm;
module.exports = exports['default'];