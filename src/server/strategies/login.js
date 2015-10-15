import _ from 'lodash'
import {Strategy} from 'passport'
import {findOrCreateAccessToken} from '../lib'

const defaults = {
  login_field: 'login',
  password_field: 'password',
  bad_request_message: 'Missing credentials',
}

export default class LoginStrategy extends Strategy {
  constructor(options={}) {
    super()
    _.defaults(options, defaults)
    _.merge(this, options)
    if (!this.User) throw new Error('[fl-auth] LoginStrategy: Missing User from options')
  }

  verify(req, login, password, callback) {
    const User = this.User

    User.findOne({login: login}, (err, user) => {
      if (err) return callback(err)
      if (!user) {
        console.log('[fl-auth] login error: user not found', login)
        return callback(null, false, 'User not found')
      }
      if (!user.passwordIsValid(password)) {
        return callback(null, false, 'Incorrect password')
      }

      findOrCreateAccessToken({user_id: user.id}, (err, access_token) => {
        if (err) return callback(err)
        console.log('access_token', access_token)
        req.session.access_token = access_token.toJSON()
        req.session.save((err) => console.log('saved session', err, req.session))
        callback(null, user)
      })
    })
  }

  authenticate(req, options) {
    const login = (req.body && req.body[this.login_field]) || (req.query && req.query[this.login_field])
    const password = (req.body && req.body[this.password_field]) || (req.query && req.query[this.password_field])

    if (!login || !password) return this.fail({message: options.bad_request_message}, 400)

    this.verify(req, login, password, (err, user, msg) => {
      if (err) return this.error(err)
      if (!user) return this.fail(msg)
      this.success(user, msg)
    })
  }

}
