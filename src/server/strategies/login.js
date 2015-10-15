import {Strategy as LocalStrategy} from 'passport-local'

export default class LoginStrategy extends LocalStrategy {
  constructor(options, ...args) {
    super(options, ...args)
    this.User = options.User
  }

  verify(req, email, password, callback) {
    this.User.findOne({email}, (err, user) => {
      if (err) return callback(err)
      if (!user) {
        console.log('login error: user not found', email)
        return callback(null, false, 'User not found')
      }
      if (!user.passwordIsValid(password)) {
        return callback(null, false, 'Incorrect password')
      }
      callback(null, user)
    })
  }
}
