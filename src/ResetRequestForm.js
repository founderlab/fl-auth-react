import React, {Component, PropTypes} from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import {Input} from 'fl-react-utils'

// Connect this form to redux to get the current value of email
const selector = formValueSelector('reset')
@connect(state => ({email: selector(state, 'email')}))
@reduxForm({
  form: 'reset',
})
export default class ResetRequestForm extends Component {

  static propTypes = {
    email: PropTypes.string,
    auth: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {email, handleSubmit, auth} = this.props
    const error = auth.get('errors') ? auth.get('errors').get('reset') : null
    const resetEmailSent = auth.get('resetEmailSent')

    return (
      <form onSubmit={handleSubmit}>

        <Field
          type="email"
          name="email"
          inputProps={{placeholder: 'Email'}}
          component={Input}
        />
        <p><Button onClick={handleSubmit} bsStyle="primary" type="submit">Reset your password</Button></p>

        {auth.get('loading') && <small><br />loading...</small>}
        {error && <p>An error occurred when trying to reset your password. Sorry! We'll get right on it.</p>}
        {resetEmailSent && <p>A link to reset your password has been sent to {email}</p>}

      </form>
    )
  }
}
