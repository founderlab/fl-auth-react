import _ from 'lodash'
import LocalStrategy from './local'

export default class RegisterStrategy extends LocalStrategy {

  verify(req, email, password, callback) {
    const User = this.User

    User.findOne({email}, (err, user) => {
      if (err) return callback(err)
      if (!user) {
        console.log('[fl-auth] email error: user not found', email)
        return callback(null, false, 'User not found')
      }
      if (!user.passwordIsValid(password)) {
        return callback(null, false, 'Incorrect password')
      }
      callback(null, user)
    })
  }
}
