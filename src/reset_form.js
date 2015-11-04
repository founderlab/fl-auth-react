import React, {Component, PropTypes} from 'react'
import {Button, Input} from 'react-bootstrap'
import {connectReduxForm} from 'redux-form'
import {validationState, validateEmailPass} from './validation'

//
// ResetForm
// This page should be reached from a link in a password reset email
// That link should have email / reset_token as query params, which will be in props.query
//

@connectReduxForm({
  form: 'reset',
  fields: ['email', 'password', 'reset_token'],
  validate: validateEmailPass,
})
export default class ResetForm extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    reset_token: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  onSubmit = (data) => {
    data.email = this.props.email
    data.reset_token = this.props.reset_token
    this.props.onSubmit(data)
  }

  render() {
    const {fields: {password}, handleSubmit, auth} = this.props
    const error = auth.get('errors') ? auth.get('errors').get('register') : null
    const error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString()

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <p>{this.props.email}</p>
        <Input type="password" placeholder="password"
          bsStyle={validationState(password)} help={password.touched && password.error} {...password} />

        <Button onClick={handleSubmit(this.onSubmit)} bsStyle="primary">Set password</Button>

        {auth.get('loading') && <small>loading...</small>}
        {error && <small>{error_msg}</small>}
      </form>
    )
  }
}
