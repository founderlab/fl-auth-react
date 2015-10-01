import React from 'react'

export default class LoginView extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    logout: React.PropTypes.func,
  }

  onLogout = (e) => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    return (
      <div id="email">
        {this.props.auth.get('email')}
        <button onCLick={this.onLogout}>logout</button>
      </div>
    )
  }

}
