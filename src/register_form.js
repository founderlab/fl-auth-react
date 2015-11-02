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

  render() {
    const {fields: {email, password}, handleSubmit, auth} = this.props
    const error = auth.get('errors') ? auth.get('errors').get('register') : null
    const error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString()

    return (
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="email"
          bsStyle={validationState(email)} help={email.touched && email.error} {...email} />

        <Input type="password" placeholder="password"
          bsStyle={validationState(password)} help={password.touched && password.error} {...password} />

        <Button onClick={handleSubmit} bsStyle="primary">Register</Button>

        {auth.get('loading') && <small>loading...</small>}
        {error && <small>{error_msg}</small>}

        <a href="/auth/facebook">Login with Facebook</a>
      </form>
    )
  }

}
