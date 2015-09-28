import _ from 'lodash'

const defaults = {

}

export default class Auth {

  static configure(options) {
    _.defaults(options, defaults)
  }

  static register(email, password, callback) {
    Auth.email = email
    callback()
  }

  static login(email, password, callback) {
    Auth.email = email
    callback()
  }

  static logout(callback) {
    Auth.email = null
    callback()
  }

  static loggedIn() {
    return !!Auth.email
  }

}
