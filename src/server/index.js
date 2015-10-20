import _ from 'lodash'
import configureStrategies from './configure/strategies'
import configureRoutes from './configure/routes'
import configureMiddleware from './configure/middleware'
import configureSerializing from './configure/serialize'
import sessionOrToken from './middleware/session_or_token'

const defaults = {
  middleware: {
    initialize: true,
    session: true,
  },
  paths: {
    login: '/login',
    logout: '/logout',
    register: '/register',
    success: '/',
  },
  facebook: {
    url: process.env.URL,
    paths: {
      redirect: '/auth/facebook',
      callback: '/auth/facebook/callback',
    },
    scope: ['email'],
    profile_fields: ['id', 'displayName', 'email'],
  },
  login: {
    username_field: 'email',
    password_field: 'password',
    bad_request_message: 'Missing credentials',
  },
}

export default function configure(options={}) {
  _.merge(options, defaults)
  if (!options.app) throw new Error('[fl-auth] init: Missing app from options')
  options.User = options.User || require('./models/user')

  configureMiddleware(options)
  configureSerializing(options)
  configureStrategies(options)
  configureRoutes(options)
}

export {configure, sessionOrToken}
