import _ from 'lodash'
import configurePassport from './configure_passport'
import configureRoutes from './configure_routes'

export default function configure(options={}) {
  import core from './core'
  if (!core.app = options.app) throw new Error('fl-auth-server init: Missing app from options')
  if (!core.User = options.User || options.user_model_type) throw new Error('fl-auth-server init: Missing User or user_model_type from options')
  configurePassport(options)
  configureRoutes(options)
}
