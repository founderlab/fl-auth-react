import _ from 'lodash'
import {Strategy} from 'passport'
import {findOrCreateAccessToken} from '../lib'

const defaults = {
  username_field: 'email',
  password_field: 'password',
  bad_request_message: 'Missing credentials',
}

export default class PasswordStrategy extends Strategy {
  constructor(options={}) {
    super()
    _.defaults(options, defaults)
    _.merge(this, options)
    if (!this.User) throw new Error('[fl-auth] emailStrategy: Missing User from options')
  }

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

      findOrCreateAccessToken({user_id: user.id}, (err, access_token) => {
        if (err) return callback(err)
        console.log('passwd: access_token', access_token)
        req.session.access_token = access_token.toJSON()
        req.session.save((err) => console.log('saved session', err, req.session))
        callback(null, user)
      })
    })
  }

  authenticate(req, options) {
    const email = (req.body && req.body[this.username_field]) || (req.query && req.query[this.username_field])
    const password = (req.body && req.body[this.password_field]) || (req.query && req.query[this.password_field])

    if (!email || !password) return this.fail({message: options.bad_request_message}, 400)

    this.verify(req, email, password, (err, user, msg) => {
      if (err) return this.error(err)
      if (!user) return this.fail(msg)
      this.success(user, msg)
    })
  }

}
