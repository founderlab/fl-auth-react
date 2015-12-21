'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

exports.__esModule = true;

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reduxForm = require('redux-form');

var _validation = require('./validation');

var _components = {
  _$ResetRequestForm: {
    displayName: 'ResetRequestForm'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/ResetRequestForm.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

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
    var reset_email_sent = auth.get('reset_email_sent');

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
      reset_email_sent && _react2['default'].createElement(
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
  ResetRequestForm = _wrapComponent('_$ResetRequestForm')(ResetRequestForm) || ResetRequestForm;
  ResetRequestForm = _reduxForm.reduxForm({
    form: 'reset',
    fields: ['email'] })(ResetRequestForm) || ResetRequestForm;
  return ResetRequestForm;
})(_react.Component);

exports['default'] = ResetRequestForm;
module.exports = exports['default'];