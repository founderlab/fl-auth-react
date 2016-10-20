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

//
// ResetForm
// This page should be reached from a link in a password reset email
// That link should have email / resetToken as query params, which will be in props.query
//

var _components = {
  _$ResetForm: {
    displayName: 'ResetForm'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/ResetForm.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

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
    var loading = _props.loading;
    var errorMsg = _props.errorMsg;
    var handleSubmit = _props.handleSubmit;

    return _react2['default'].createElement(
      'form',
      { onSubmit: handleSubmit(this.onSubmit) },
      _react2['default'].createElement(
        'p',
        null,
        this.props.email
      ),
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
      ),
      _react2['default'].createElement(
        _reactBootstrap.Button,
        { onClick: handleSubmit(this.onSubmit), bsStyle: 'primary', type: 'submit' },
        'Set password'
      )
    );
  };

  _createClass(ResetForm, null, [{
    key: 'propTypes',
    value: {
      errorMsg: _react.PropTypes.string,
      email: _react.PropTypes.string.isRequired,
      resetToken: _react.PropTypes.string.isRequired,
      onSubmit: _react.PropTypes.func.isRequired,
      handleSubmit: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _ResetForm = ResetForm;
  ResetForm = _wrapComponent('_$ResetForm')(ResetForm) || ResetForm;
  ResetForm = _reduxForm.reduxForm({
    form: 'reset',
    validate: _validation.validateEmailPass
  })(ResetForm) || ResetForm;
  return ResetForm;
})(_react.Component);

exports['default'] = ResetForm;
module.exports = exports['default'];