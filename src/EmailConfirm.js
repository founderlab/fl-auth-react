import React, {Component, PropTypes} from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import {Input} from 'fl-react-utils'

//
// EmailConfirm
// This page should be reached from a link in an email confirmation email
// That link should have email / token as query params, which should be given to this component
//
export default class EmailConfirm extends Component {

  static propTypes = {
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    errorMsg: PropTypes.string,
    loading: PropTypes.bool,
    emailConfirmed: PropTypes.bool,
    children: PropTypes.node,
    confirmEmail: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(props) {
    const {emailConfirmed, loading, errorMsg, confirmEmail, children, email, token} = props
    if (!errorMsg && !loading && emailConfirmed) {
      confirmEmail(email, token)
    }
  }

  render() {
    const {emailConfirmed, loading, errorMsg, confirmEmail, children, email, token} = this.props

    return (
      <div>
        {loading && <small>loading...</small>}
        {errorMsg && <small>{errorMsg}</small>}
        {emailConfirmed && children}
      </div>
    )
  }
}
