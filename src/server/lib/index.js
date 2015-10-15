import _ from 'lodash'
import moment from 'moment'
import Queue from 'queue-async'
import AccessToken from '../models/access_token'
import RefreshToken from '../models/refresh_token'

const RESOURCE_EXPIRY_MINS = 5
const TOKEN_EXPIRY_MINS = 120
const SESSION_EXPIRY_DAYS = 365


function cleanUpTokens(callback) {
  AccessToken.destroy({expires_at: {$lte: moment.utc().subtract(RESOURCE_EXPIRY_MINS, 'minutes').toDate()}}, (err) => {
    if (err) return callback(err)
    RefreshToken.destroy({created_at: {$lte: moment.utc().subtract(SESSION_EXPIRY_DAYS, 'days').toDate()}}, callback)
  })
}

function getExpiryTime() { return moment.utc().add(TOKEN_EXPIRY_MINS, 'minutes').toDate() }


export function findOrCreateAccessToken(query, options={}, done) {

  const callback = (err, access_token) => {
    if (err) return done(err)
    if (!access_token) return done(new Error('Failed to create Access Token'))
    done(null, access_token.id, access_token.get('refresh_token_id'), {expires_at: access_token.get('expires_at')})
  }

  let access_token = null
  let refresh_token = options.refresh_token
  const queue = new Queue(1)

  // check for existing token for non-expiring tokens
  if (!options.expires) {
    queue.defer((callback) => {
      AccessToken.findOne(query, (err, access_token_) => {
        if (err) return callback(err)
        if (!access_token_ || !access_token_.get('expires_at')) return callback() // exists but expires
        access_token = access_token_
        callback()
      })
    })

  } else if (!refresh_token) {
    queue.defer((callback) => {
      refresh_token = new RefreshToken(query)
      refresh_token.save(callback)
    })
  }

  queue.await((err) => {
    if (err) return callback(err)
    if (access_token) callback(null, access_token)

    const create_query = _.clone(query)
    if (options.expires) _.extend(create_query, {expires_at: getExpiryTime(), refresh_token: refresh_token.id})
    access_token = new AccessToken(create_query)

    access_token.save((err) => {
      if (err) return callback(err)
      cleanUpTokens((err) => {
        if (err) return callback(err)
        callback(null, access_token)
      })
    })
  })

}

// Usage: parseAuthHeader(req, 'Bearer')
export function parseAuthHeader(req, name) {
  if (!req.headers.authorization) return null

  const parts = req.headers.authorization.split(' ')
  if (parts.length !== 2) return null

  const scheme = parts[0]
  const credentials = parts[1]
  let auth = null
  if (new RegExp(`^${name}$`, 'i').test(scheme)) auth = credentials
  return auth
}
