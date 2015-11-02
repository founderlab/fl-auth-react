import React from 'react'
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
export default class ResetForm extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    query: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  onSubmit = (data) => {
    console.log('asdsadas')
    data.email = this.props.query.get('email')
    data.reset_token = this.props.query.get('reset_token')
    this.props.onSubmit(data)
  }

  render() {
    const {fields: {password}, handleSubmit, auth} = this.props
    const error = auth.get('errors') ? auth.get('errors').get('register') : null
    const error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString()

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <p>{this.props.query.get('email')}</p>
        <Input type="password" placeholder="password"
          bsStyle={validationState(password)} help={password.touched && password.error} {...password} />

        <Button onClick={handleSubmit(this.onSubmit)} bsStyle="primary">Set password</Button>

        {auth.get('loading') && <small>loading...</small>}
        {error && <small>{error_msg}</small>}

      </form>
    )
  }

}
