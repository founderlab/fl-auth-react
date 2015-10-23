import React from 'react'
import {Button, Input} from 'react-bootstrap'
import {connectReduxForm} from 'redux-form'
import {validationState, validateEmailPass} from './validation'

@connectReduxForm({
  form: 'register',
  fields: ['email', 'password'],
  validate: validateEmailPass,
})
export default class RegisterForm extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  validationState(field) {
    if (field.touched && field.error) return 'error'
    return null
  }

  render() {
    const loading = this.props.auth.get('loading')
    const register_error = this.props.auth.get('register_error')
    const error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (register_error || '').toString()
    const {fields: {email, password}, handleSubmit} = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="email"
          bsStyle={validationState(email)} help={email.touched && email.error} {...email} />

        <Input type="password" placeholder="password"
          bsStyle={validationState(password)} help={password.touched && password.error} {...password} />

        <Button onClick={handleSubmit} bsStyle="primary">Register</Button>

        {loading && <small>loading...</small>}
        {register_error && <small>{error_msg}</small>}

        <a href="/auth/facebook">Login with Facebook</a>
      </form>
    )
  }

}
