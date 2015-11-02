
export function validateEmailPass(data) {
  const errors = {}
  if (data.email && !data.email.match(/.+@.+/)) errors.email = 'please enter an email address'
  // if (!data.password || data.password.length < 6) errors.password = '6 characters min for your password'
  return errors
}

export function validationState(field) {
  if (field.touched && field.error) return 'error'
  return null
}

export default {validateEmailPass, validationState}
