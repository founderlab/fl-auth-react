import React, {PropTypes} from 'react'

//
// EmailConfirm
// This page should be reached from a link in an email confirmation email
// That link should have email / token as query params, which will be in props.query
//

export default function EmailConfirm(props) {
  const {emailConfirmed, loading, errorMsg, confirmEmail, children, email, token} = props
  if (!errorMsg && !loading && emailConfirmed) {
    confirmEmail(email, token)
  }

  return (
    <div>
      {loading && <small>loading...</small>}
      {errorMsg && <small>{errorMsg}</small>}
      {emailConfirmed && children}
    </div>
  )
}

EmailConfirm.propTypes = {
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  loading: PropTypes.bool,
  emailConfirmed: PropTypes.bool,
  children: PropTypes.node,
  confirmEmail: PropTypes.func.isRequired,
}
