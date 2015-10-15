import {Strategy as LocalStrategy} from 'passport-local'

export default class LoginStrategy extends LocalStrategy {
  constructor(options, ...args) {
    super(options, ...args)
    this.User = options.User
  }

  verify(req, email, password, callback) {
    this.User.findOne({email}, (err, user) => {
      if (err) return callback(err)

      if (user) {
        console.log('register error: user exists', email)
        return callback(null, false, 'user exists')
      }

      const new_user = new this.User({email, password: this.User.createHash(password)})
      new_user.save(err => {
        if (err) return callback(err)
        callback(null, new_user)
      })

    })
  }
}
