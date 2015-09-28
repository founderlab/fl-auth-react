import React from 'react'

export default class LoginView extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
  }

  render() {
    return (
      <div id="email">
        <p>logged in as: {this.props.auth.get('email')}</p>
      </div>
    )
  }

}
