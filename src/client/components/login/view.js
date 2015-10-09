import React from 'react'

export default class LoginView extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    logout: React.PropTypes.func,
  }

  // onLogout = event => {
  //   event.preventDefault()
  //   this.props.logout()

  //   // TODO: Where & how should we navigate in cases like this
  //   window.location.assign('/logout')
  // }

  render() {
    return (
      <div id="email">
        {this.props.auth.get('email')}
        <a href="/logout" className="btn btn-small" onClick={this.onLogout}>logout</a>
      </div>
    )
  }

}
