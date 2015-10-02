import configureStrategies from './strategies'
import configureRoutes from './routes'
import configureMiddleware from './middleware'
import configureSerializing from './serialize'
import ensureLoggedIn from './auth/ensure_logged_in'

export default function configure(options={}) {
  if (!options.app) throw new Error('fl-auth-server init: Missing app from options')

  options.User = options.User || options.user_model_type || require('./models/user')

  configureMiddleware(options)
  configureSerializing(options)
  configureStrategies(options)
  configureRoutes(options)
}

export {configure, ensureLoggedIn}
