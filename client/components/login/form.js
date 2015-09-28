import React from 'react'
import {Button, Input} from 'react-bootstrap'

export default class LoginForm extends React.Component {

  static propTypes = {
    loading: React.PropTypes.boolean,
    login: React.PropTypes.function,
    auth: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state.email, this.state.password)
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
      <form className="form-inline" onSubmit={this.onSubmit}>

        <Input
          onChange={this.onNameChange}
          type="text"
          value={this.state.email}
          placeholder="email"
          // label="email"
          bsStyle={this.validationState()} />
        <Input
          onChange={this.onPasswordChange}
          type="text"
          value={this.state.password}
          placeholder="password"
          // label="password"
          bsStyle={this.validationState()} />

        <Button onClick={this.onSubmit} bsStyle="primary" >Login</Button>

        {loading && <p>loading...</p>}
        {error && <p>Error: {error}</p>}

      </form>
    )
  }

}


