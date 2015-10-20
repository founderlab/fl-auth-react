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
    mode: React.PropTypes.string,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    const {fields: {email, password}, handleSubmit, auth} = this.props
    const error = auth.get('error')
    const error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString()
    const form_class = (this.props.mode === 'horizontal' ? 'form-inline': '')

    return (
      <form className={form_class} onSubmit={handleSubmit}>

        <div className="form-group">
          <Input type="text" placeholder="email" {...email} />
          {email.error && email.touched && <div>{email.error}</div>}
        </div>

        <div className="form-group">
          <Input type="password" placeholder="password" {...password} />
          {password.error && password.touched && <div>{password.error}</div>}
        </div>

        <Button onClick={handleSubmit} bsStyle="primary">Login</Button>
        <br /><a href="/auth/facebook">Login with Facebook</a>
        <br /><a href="/register">Register</a>

        {auth.get('loading') && <small><br />loading...</small>}
        {error && <small><br />invalid email or password<span style={{display: 'none'}}>{error_msg}</span></small>}

      </form>
    )
  }

}
