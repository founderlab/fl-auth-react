import React from 'react'
import {Button, Input} from 'react-bootstrap'
import {connectReduxForm} from 'redux-form'

function validateEmailPass(data) {
  const errors = {}
  if (data.email && data.email.match(/.+@.+/)) errors.email = 'please enter an email address'
  // if (data.password && data.password.length < 6) errors.password = '6 characters min for your password'
  return errors
}

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
    const loading = this.props.auth.get('loading')
    const error = this.props.auth.get('error')
    const error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString()
    const {fields: {email, password}, handleSubmit} = this.props

    return (
      <form className="form-inline" onSubmit={handleSubmit}>

        <Input type="text" placeholder="email" bsStyle={email.error ? 'error' : null} {...email} />
        {email.error && email.touched && <div>{email.error}</div>}

        <Input type="password" placeholder="password" bsStyle={password.error ? 'error' : null} {...password} />
        {password.error && password.touched && <div>{password.error}</div>}

        <Button onClick={handleSubmit} bsStyle="primary">Register</Button>

        {loading && <small>loading...</small>}
        {error && <small>{error_msg}</small>}

        <a href="/auth/facebook">Login with Facebook</a>
      </form>
    )
  }

}
