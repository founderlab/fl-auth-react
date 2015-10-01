import configurePassport from './passport'
import configureRoutes from './routes'
import configureMiddleware from './middleware'

export default function configure(options={}) {
  if (!options.app) throw new Error('fl-auth-server init: Missing app from options')

  options.User = options.User || options.user_model_type || require('../models/user')

  configureMiddleware(options)
  configurePassport(options)
  configureRoutes(options)
}
