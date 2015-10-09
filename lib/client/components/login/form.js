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

var LoginForm = (function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm() {
    _classCallCheck(this, _LoginForm);

    _get(Object.getPrototypeOf(_LoginForm.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(LoginForm, [{
    key: 'render',
    value: function render() {
      var loading = this.props.auth.get('loading');
      var error = this.props.auth.get('error');
      var _props = this.props;
      var _props$fields = _props.fields;
      var email = _props$fields.email;
      var password = _props$fields.password;
      var handleSubmit = _props.handleSubmit;

      return _react2['default'].createElement(
        'form',
        { className: 'form-inline', onSubmit: handleSubmit },
        _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'text', placeholder: 'email' }, email)),
        email.error && email.touched && _react2['default'].createElement(
          'div',
          null,
          email.error
        ),
        _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'password', placeholder: 'password' }, password)),
        password.error && password.touched && _react2['default'].createElement(
          'div',
          null,
          password.error
        ),
        _react2['default'].createElement(
          _reactBootstrap.Button,
          { onClick: handleSubmit, bsStyle: 'primary' },
          'Login'
        ),
        _react2['default'].createElement('br', null),
        _react2['default'].createElement(
          'a',
          { href: '/auth/facebook' },
          'Login with Facebook'
        ),
        _react2['default'].createElement('br', null),
        _react2['default'].createElement(
          'a',
          { href: '/register' },
          'Register'
        ),
        loading && _react2['default'].createElement(
          'small',
          null,
          _react2['default'].createElement('br', null),
          'loading...'
        ),
        error && _react2['default'].createElement(
          'small',
          null,
          _react2['default'].createElement('br', null),
          'invalid email or password',
          _react2['default'].createElement(
            'span',
            { style: { display: 'none' } },
            error
          )
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

  var _LoginForm = LoginForm;
  LoginForm = (0, _reduxForm.connectReduxForm)({
    form: 'login',
    fields: ['email', 'password']
  })(LoginForm) || LoginForm;
  return LoginForm;
})(_react2['default'].Component);

exports['default'] = LoginForm;
module.exports = exports['default'];