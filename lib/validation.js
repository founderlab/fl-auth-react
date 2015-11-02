'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateEmailPass = validateEmailPass;
exports.validationState = validationState;

function validateEmailPass(data) {
  var errors = {};
  if (data.email && !data.email.match(/.+@.+/)) errors.email = 'please enter an email address';
  // if (!data.password || data.password.length < 6) errors.password = '6 characters min for your password'
  return errors;
}

function validationState(field) {
  if (field.touched && field.error) return 'error';
  return null;
}

exports['default'] = { validateEmailPass: validateEmailPass, validationState: validationState };