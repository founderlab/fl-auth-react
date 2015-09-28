import React from 'react'
import {Button, Input} from 'react-bootstrap'
import Auth from '../../index'

export default class Register extends React.Component {

  static propTypes = {
    loading: React.PropTypes.boolean,
    register: React.PropTypes.function,
    auth: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onSubmit = (e) => {
    e.preventDefault()
    // Auth.register(this.state.email, this.state.password, (err) => {
    //   if (err) console.log(err)
    // })
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
    return (
      <form onSubmit={this.onSubmit}>

        <Input
          onChange={this.onNameChange}
          type="text"
          value={this.state.email}
          placeholder="email"
          label="email"
          bsStyle={this.validationState()} />
        <Input
          onChange={this.onPasswordChange}
          type="text"
          value={this.state.password}
          placeholder="password"
          label="password"
          bsStyle={this.validationState()} />

        <Button onClick={this.onSubmit} bsStyle="primary" >Register</Button>

        <span>loading: {this.props.loading}</span>
        <span>it works: {this.props.auth.get('email')}</span>

      </form>
    )
  }

}
