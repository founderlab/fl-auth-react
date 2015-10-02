import React from 'react'
import {Button, Input} from 'react-bootstrap'

export default class Register extends React.Component {

  static propTypes = {
    register: React.PropTypes.func,
    auth: React.PropTypes.object,
    error: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.register(this.state.email, this.state.password)
  }
  onNameChange = (e) => {
    this.state.email = e.target.value
  }
  onPasswordChange = (e) => {
    this.state.password = e.target.value
  }

  validationState() {
    return null
  }

  render() {
    const loading = this.props.auth.get('loading')
    const error = this.props.auth.get('error')
    return (
      <form onSubmit={this.onSubmit}>

        <Input
          onChange={this.onNameChange}
          type="text"
          // value={this.state.email}
          placeholder="email"
          label="email"
          bsStyle={this.validationState()} />
        <Input
          onChange={this.onPasswordChange}
          type="text"
          // value={this.state.password}
          placeholder="password"
          label="password"
          bsStyle={this.validationState()} />

        <Button onClick={this.onSubmit} bsStyle="primary">Register</Button>

        {loading && <p>loading...</p>}
        {error && <p>Error: {error}</p>}

        <a href="/auth/facebook">Login with Facebook</a>
      </form>
    )
  }

}
