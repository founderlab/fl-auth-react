import React, {PropTypes} from 'react'

//
// EmailConfirm
// This page should be reached from a link in an email confirmation email
// That link should have email / token as query params, which will be in props.query
//

export default function EmailConfirm(props) {
  const {auth, confirmEmail, children, email, token} = props
  const error = auth.get('errors') ? auth.get('errors').get('email_confirm') : null
  const error_msg = process.env.NODE_ENV === 'production' ? 'Uh oh, something went wrong' : (error || '').toString()

  if (!error && !auth.get('loading') && !auth.get('email_confirmed')) {
    confirmEmail(email, token)
  }

  return (
    <div>
      {auth.get('loading') && <small>loading...</small>}
      {error && <small>{error_msg}</small>}
      {auth.get('email_confirmed') && children}
    </div>
  )
}

EmailConfirm.propTypes = {
  auth: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  children: PropTypes.array,
  confirmEmail: PropTypes.func.isRequired,
}
