import _ from 'lodash'
import passport from 'passport'

const defaults = {
  initialize: true,
  session: true,
}

export default function configureMiddleware(options={}) {
  _.defaults(options, defaults)
  const app = options.app
  if (!app) throw new Error(`Missing app from configureMiddleware, got ${options}`)

  if (options.initialize) app.use(passport.initialize())
  if (options.session) app.use(passport.session())
}
