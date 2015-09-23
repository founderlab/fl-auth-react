import configurePassport from './passport'
import configureRoutes from './routes'
import core from '../core'

export default function configure(options={}) {
  core.app = options.app
  if (!core.app) throw new Error('fl-auth-server init: Missing app from options')
  core.User = options.User || options.user_model_type
  if (!core.User) throw new Error('fl-auth-server init: Missing User or user_model_type from options')
  configurePassport(options)
  configureRoutes(options)
}
