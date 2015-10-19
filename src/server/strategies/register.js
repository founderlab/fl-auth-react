import _ from 'lodash'
import LocalStrategy from './local'

export default class RegisterStrategy extends LocalStrategy {

  verify(req, email, password, callback) {
    const User = this.User

    User.findOne({email}, (err, existing_user) => {
      if (err) return callback(err)
      if (existing_user) return callback(null, false, 'User already exists')

      const user = new User({email, password: User.createHash(password)})
      user.save(callback)
    })
  }

}
