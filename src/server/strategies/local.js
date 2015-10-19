import _ from 'lodash'
import {Strategy} from 'passport'
import {findOrCreateAccessToken} from '../lib'

export default class RegisterStrategy extends Strategy {
  constructor(options={}, verify) {
    super()
    _.merge(this, options)
    if (!this.User) throw new Error('[fl-auth] LocalStrategy: Missing User from options')
    if (verify) this.verify = verify.bind(this)
  }

  authenticate(req, options) {
    const email = (req.body && req.body[this.username_field]) || (req.query && req.query[this.username_field])
    const password = (req.body && req.body[this.password_field]) || (req.query && req.query[this.password_field])

    console.log('"REG AUTH"', email, password)
    if (!email || !password) return this.fail(this.bad_request_message)

    this.verify(req, email, password, (err, user, info) => {
      if (err) return this.error(err)
      if (!user) return this.fail(info)

      findOrCreateAccessToken({user_id: user.id}, {expires: true}, (err, access_token, info) => {
        if (err) return this.error(err)
        console.log('"TOKEN"', access_token, info)
        req.session.access_token = {id: access_token, expires_at: info.expires_at}
        req.session.save(err => console.log('saved session', err, req.session))
        console.log('register: access_token', req.session.access_token)
        this.success(user, {access_token})
      })
    })
  }
}
