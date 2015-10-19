import _ from 'lodash'
import {Strategy} from 'passport'
import {findOrCreateAccessToken} from '../lib'


export default class PasswordStrategy extends Strategy {
  constructor(options={}) {
    super()
    _.merge(this, options)
    if (!this.User) throw new Error('[fl-auth] PasswordStrategy: Missing User from options')
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

      findOrCreateAccessToken({user_id: user.id}, {expires: true}, (err, access_token, info) => {
        if (err) return callback(err)
        console.log('passwd: access_token', access_token)
        req.session.access_token = {id: access_token, expires_at: info.expires_at}
        req.session.save(err => console.log('saved session', err, req.session))
        callback(null, user, {access_token})
      })
    })
  }

  authenticate(req, options) {
    const email = (req.body && req.body[this.username_field]) || (req.query && req.query[this.username_field])
    const password = (req.body && req.body[this.password_field]) || (req.query && req.query[this.password_field])

    if (!email || !password) return this.fail(this.bad_request_message)

    this.verify(req, email, password, (err, user, info) => {
      if (err) return this.error(err)
      if (!user) return this.fail(info)
      this.success(user, info)
    })
  }

}
