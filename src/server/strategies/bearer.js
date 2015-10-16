import _ from 'lodash'
import {Strategy} from 'passport'
import parseAuthHeader from '../lib'
import AccessToken from '../models/access_token'

const defaults = {
  name: 'bearer',
  check_request: true,
  check_cookies: true,
}

// bearer token that considers request and cookies
export default class BearerStrategy extends Strategy {

  constructor(options, verify) {
    super(options)
    _.defaults(options, defaults)
    _.merge(this, options)
    if (!this.User) throw new Error('[fl-auth] PasswordStrategy: Missing User from options')
    if (verify) this.verify = verify
  }

  verify(req, access_token_id, callback) {
    console.log('verifying', access_token_id)
    const User = this.User
    AccessToken.cursor({id: access_token_id, $one: true}).values('user_id').toJSON((err, user_id) => {
      if (err || !user_id) return callback(err, false)
      User.findOne(user_id, (err, user) => {
        if (err) return callback(err)
        callback(null, user)
      })
    })
  }

  authenticate(req) {
    let access_token = null

    console.log('bearer auth 1', req.user)
    console.log('bearer auth 2', req.headers)
    console.log('bearer auth 3', req.query, req.body)
    console.log('bearer auth 4', req.cookies)
    //todo: what is this
    if (req.user && this.name !== 'root_bearer') return this.success(req.user)

    if (req.headers && req.headers.authorization) access_token = parseAuthHeader(req, 'Bearer')

    if (this.check_request && !access_token) access_token = ((req.query && req.query.$access_token) || (req.body && req.body.$access_token))
    if (req.body && req.body.$access_token) delete req.body.$access_token

    if (this.check_cookies && !access_token && req.cookies) access_token = req.cookies.access_token

    if (!access_token) return this.fail(401)

    this.verify(req, access_token, (err, user, info) => {
      if (err) return this.error(err)
      if (!user) return this.fail(401)
      this.success(user, info)
    })
  }

}
