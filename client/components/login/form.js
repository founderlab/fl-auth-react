import React from 'react'
import {Button, Input} from 'react-bootstrap'
import {connectReduxForm} from 'redux-form'

@connectReduxForm({
  form: 'login',
  fields: ['email', 'password'],
})
export default class LoginForm extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    const loading = this.props.auth.get('loading')
    const error = this.props.auth.get('error')
    const {fields: {email, password}, handleSubmit} = this.props

    return (
      <form className="form-inline" onSubmit={handleSubmit}>

        <Input type="text" placeholder="email" {...email} />
        {email.error && email.touched && <div>{email.error}</div>}

        <Input type="password" placeholder="password" {...password} />
        {password.error && password.touched && <div>{password.error}</div>}

        <Button onClick={handleSubmit} bsStyle="primary">Login</Button>
        <br /><a href="/auth/facebook">Login with Facebook</a>
        <br /><a href="/register">Register</a>

        {loading && <small><br />loading...</small>}
        {error && <small><br />invalid email or password<span style={{display: 'none'}}>{error}</span></small>}

      </form>
    )
  }

}
