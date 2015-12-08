import React, {Component, PropTypes} from 'react'
import {Button, Input} from 'react-bootstrap'
import {reduxForm} from 'redux-form'
import {validationState, validateEmailPass} from './validation'

@reduxForm({
  form: 'register',
  fields: ['email', 'password'],
  validate: validateEmailPass,
})
export default class RegisterForm extends Component {

  static propTypes = {
    auth: PropTypes.object,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {fields: {email, password}, handleSubmit, auth} = this.props
    const error = auth.get('errors') ? auth.get('errors').get('register') : null
    const error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString()

    return (
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="email" name="email" autoComplete="on"
          bsStyle={validationState(email)} help={email.touched && email.error} {...email} />

        <Input type="password" placeholder="password" name="password" autoComplete="on"
          bsStyle={validationState(password)} help={password.touched && password.error} {...password} />

        <Button onClick={handleSubmit} bsStyle="primary">Register</Button>

        {auth.get('loading') && <small>loading...</small>}
        {error && <small>{error_msg}</small>}

        <a href="/auth/facebook">Login with Facebook</a>
      </form>
    )
  }

}
