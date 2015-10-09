import _ from 'lodash'
import configureStrategies from './strategies'
import configureRoutes from './routes'
import configureMiddleware from './middleware'
import configureSerializing from './serialize'
import ensureLoggedIn from './auth/ensure_logged_in'

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
}

export default function configure(options={}) {
  _.merge(options, defaults)
  if (!options.app) throw new Error('[fl-auth] init: Missing app from options')
  options.User = options.User || options.user_model_type || require('./models/user')

  configureMiddleware(options)
  configureSerializing(options)
  configureStrategies(options)
  configureRoutes(options)
}

export {configure, ensureLoggedIn}
