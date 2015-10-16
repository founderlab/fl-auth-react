import React from 'react'
import LoginView from './view'
import LoginForm from './form'

export default class Login extends React.Component {

  static propTypes = {
    login: React.PropTypes.func,
    auth: React.PropTypes.object,
  }

  onSubmit = data => {
    this.props.login(data.email, data.password)
  }

  render() {
    const email = this.props.auth.get('email')
    return (
      <div className="login">

        {email ? (
          <LoginView {...this.props} />
        ) : (
          <LoginForm onSubmit={this.onSubmit} {...this.props} />
        )}

      </div>
    )
  }
}
