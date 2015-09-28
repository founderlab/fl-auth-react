import React from 'react'
import Auth from '../../index'
import LoginView from './view'
import LoginForm from './form'

export default class Login extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      logged_in: Auth.loggedIn(),
    }
  }

  render() {
    return (
      <div className="login">

        {this.state.logged_in ? (
          <LoginView {...this.props} />
        ) : (
          <LoginForm {...this.props} />
        )}

      </div>
    )
  }
}
