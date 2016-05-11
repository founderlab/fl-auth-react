import React, {Component, PropTypes} from 'react'
import {Button, Input} from 'react-bootstrap'
import {reduxForm} from 'redux-form'
import {validationState, validateEmailPass} from './validation'

//
// ResetForm
// This page should be reached from a link in a password reset email
// That link should have email / resetToken as query params, which will be in props.query
//

@reduxForm({
  form: 'reset',
  fields: ['email', 'password', 'resetToken'],
  validate: validateEmailPass,
})
export default class ResetForm extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    resetToken: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  onSubmit = (data) => {
    data.email = this.props.email
    data.resetToken = this.props.resetToken
    this.props.onSubmit(data)
  }

  render() {
    const {fields: {password}, handleSubmit, auth} = this.props
    const error = auth.get('errors') ? auth.get('errors').get('register') : null
    const errorMsg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString()

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <p>{this.props.email}</p>
        <Input type="password" placeholder="password"
          bsStyle={validationState(password)} help={password.touched && password.error} {...password} />

        <Button onClick={handleSubmit(this.onSubmit)} bsStyle="primary">Set password</Button>

        {auth.get('loading') && <small>loading...</small>}
        {error && <small>{errorMsg}</small>}
      </form>
    )
  }
}
