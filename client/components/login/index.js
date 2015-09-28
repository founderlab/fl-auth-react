import React from 'react'
import LoginView from './view'
import LoginForm from './form'

export default class Login extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
  }

  render() {
    const email = this.props.auth.get('email')
    return (
      <div className="login">

        {email ? (
          <LoginView {...this.props} />
        ) : (
          <LoginForm {...this.props} />
        )}

      </div>
    )
  }
}
