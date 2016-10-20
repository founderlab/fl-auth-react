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

// todo: default value from email prop

var ResetRequestForm = (function (_Component) {
  _inherits(ResetRequestForm, _Component);

  function ResetRequestForm() {
    _classCallCheck(this, _ResetRequestForm);

    _Component.apply(this, arguments);
  }

  ResetRequestForm.prototype.render = function render() {
    var _props = this.props;
    var email = _props.fields.email;
    var handleSubmit = _props.handleSubmit;
    var auth = _props.auth;

    var error = auth.get('errors') ? auth.get('errors').get('reset') : null;
    var resetEmailSent = auth.get('resetEmailSent');

    return _react2['default'].createElement(
      'form',
      { onSubmit: handleSubmit },
      _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: 'text', placeholder: 'email',
        bsStyle: _validation.validationState(email), help: email.touched && email.error }, email)),
      _react2['default'].createElement(
        _reactBootstrap.Button,
        { onClick: handleSubmit, bsStyle: 'primary' },
        'Reset your password'
      ),
      auth.get('loading') && _react2['default'].createElement(
        'small',
        null,
        _react2['default'].createElement('br', null),
        'loading...'
      ),
      error && _react2['default'].createElement(
        'p',
        null,
        'An error occurred when trying to reset your password. Sorry! We\'ll get right on it.'
      ),
      resetEmailSent && _react2['default'].createElement(
        'p',
        null,
        'A link to reset your password has been sent to ',
        email.value
      )
    );
  };

  _createClass(ResetRequestForm, null, [{
    key: 'propTypes',
    value: {
      email: _react.PropTypes.string,
      auth: _react.PropTypes.object.isRequired,
      fields: _react.PropTypes.object.isRequired,
      handleSubmit: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _ResetRequestForm = ResetRequestForm;
  ResetRequestForm = _reduxForm.reduxForm({
    form: 'reset',
    fields: ['email'] })(ResetRequestForm) || ResetRequestForm;
  return ResetRequestForm;
})(_react.Component);

exports['default'] = ResetRequestForm;
module.exports = exports['default'];