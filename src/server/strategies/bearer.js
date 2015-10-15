import {Strategy} from 'passport'
import parseAuthHeader from '../lib'

// bearer token that considers request and cookies
export default class BearerStrategy extends Strategy {

  constructor(options, verify) {
    super(options, verify)

    this.name = options.name || 'bearer'
    this.check_request = options.check_request || false
    this.check_cookies = options.check_cookies || false
    this.defer_failure = options.defer_failure || false

  }

  authenticate(req) {
    let access_token = null

    //todo: what is this
    if (req.user && this.name !== 'root_bearer') return this.success(req.user)

    if (req.headers && req.headers.authorization) access_token = parseAuthHeader(req, 'Bearer')

    if (this.check_request && !access_token) access_token = ((req.query && req.query.$access_token) || (req.body && req.body.$access_token))

    if (req.body && req.body.$access_token) delete req.body.$access_token

    if (this.check_cookies && !access_token && req.cookies) access_token = req.cookies.access_token

    this.verify(req, access_token, (err, user, info) => {
      if (err) return this.error(err)
      if (!user) return this.fail(401)
      this.success(user, info)
    })
  }

}
