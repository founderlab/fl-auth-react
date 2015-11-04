import React, {Component, PropTypes} from 'react'
import {Button, Input} from 'react-bootstrap'
import {connectReduxForm} from 'redux-form'
import {validationState} from './validation'

@connectReduxForm({
  form: 'reset',
  fields: ['email'],
  // todo: default value from email prop
})
export default class ResetRequestForm extends Component {

  static propTypes = {
    email: PropTypes.string,
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {fields: {email}, handleSubmit, auth} = this.props
    const error = auth.get('errors') ? auth.get('errors').get('reset') : null
    const reset_email_sent = auth.get('reset_email_sent')

    return (
      <form onSubmit={handleSubmit}>

        <Input type="text" placeholder="email"
          bsStyle={validationState(email)} help={email.touched && email.error} {...email} />

        <Button onClick={handleSubmit} bsStyle="primary">Reset your password</Button>

        {auth.get('loading') && <small><br />loading...</small>}
        {error && <p>An error occurred when trying to reset your password. Sorry! We'll get right on it.</p>}
        {reset_email_sent && <p>A link to reset your password has been sent to {email.value}</p>}

      </form>
    )
  }

}
