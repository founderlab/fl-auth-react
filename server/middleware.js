import _ from 'lodash'
import passport from 'passport'

const defaults = {
  middleware: {
    initialize: true,
    session: true,
  },
}

export default function configureMiddleware(options={}) {
  _.defaults(options, defaults)
  const app = options.app
  if (!app) throw new Error(`Missing app from configureMiddleware, got ${options}`)

  if (options.middleware.initialize) app.use(passport.initialize())
  if (options.middleware.session) app.use(passport.session())
}
