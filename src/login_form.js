import React, {Component, PropTypes} from 'react'
import {Button, Input} from 'react-bootstrap'
import {connectReduxForm} from 'redux-form'
import {validationState} from './validation'

@connectReduxForm({
  form: 'login',
  fields: ['email', 'password'],
})
export default class LoginForm extends Component {

  static propTypes = {
    auth: PropTypes.object,
    fields: PropTypes.object.isRequired,
    mode: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {fields: {email, password}, handleSubmit, auth} = this.props
    const error = auth.get('errors') ? auth.get('errors').get('login') : null
    const error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString()
    const form_class = (this.props.mode === 'horizontal' ? 'form-inline': '')

    return (
      <form className={form_class} onSubmit={handleSubmit}>

        <Input type="text" placeholder="email"
          bsStyle={validationState(email)} help={email.touched && email.error} {...email} />

        <Input type="password" placeholder="password"
          bsStyle={validationState(password)} help={password.touched && password.error} {...password} />

        <Button onClick={handleSubmit} bsStyle="primary">Login</Button>

        {auth.get('loading') && <small><br />loading...</small>}
        {error && <small><br />Invalid email or password<span style={{display: 'none'}}>{error_msg}</span></small>}

      </form>
    )
  }

}
