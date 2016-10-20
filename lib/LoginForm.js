'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reduxForm = require('redux-form');

var _flReactUtils = require('fl-react-utils');

var _validation = require('./validation');

var _components = {
  _$LoginForm: {
    displayName: 'LoginForm'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/LoginForm.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var LoginForm = (function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm() {
    _classCallCheck(this, _LoginForm);

    _Component.apply(this, arguments);
  }

  LoginForm.prototype.render = function render() {
    var _props = this.props;
    var loading = _props.loading;
    var errorMsg = _props.errorMsg;
    var facebook = _props.facebook;
    var handleSubmit = _props.handleSubmit;

    var formClass = this.props.mode === 'horizontal' ? 'form-inline' : '';

    return _react2['default'].createElement(
      'form',
      { className: formClass, onSubmit: handleSubmit },
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
        'Login'
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
      )
    );
  };

  _createClass(LoginForm, null, [{
    key: 'propTypes',
    value: {
      loading: _react.PropTypes.bool,
      errorMsg: _react.PropTypes.string,
      handleSubmit: _react.PropTypes.func.isRequired,
      mode: _react.PropTypes.string
    },
    enumerable: true
  }]);

  var _LoginForm = LoginForm;
  LoginForm = _wrapComponent('_$LoginForm')(LoginForm) || LoginForm;
  LoginForm = _reduxForm.reduxForm({
    form: 'register',
    validate: _validation.validateEmailPass
  })(LoginForm) || LoginForm;
  return LoginForm;
})(_react.Component);

exports['default'] = LoginForm;
module.exports = exports['default'];