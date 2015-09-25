import _ from 'lodash'
import passport from 'passport'

const defaults = {
  paths: {
    login: '/login',
    register: '/register',
    success: '/',
  },
}

export default function configureRoutes(options={}) {
  _.defaults(options, defaults)
  const app = options.app
  if (!app) throw new Error(`Missing app from configureRoutes, got ${options}`)

  // app.post(options.paths.login, passport.authenticate('login', {
  //   successRedirect: options.paths.success,
  //   failureRedirect: options.paths.login,
  // }))
  app.post(options.paths.login, (req, res, next) => {
    passport.authenticate('login', (err, user, msg) => {
      if (err || !user) return res.json({error: msg})

      req.login(user, {}, err => {
        if (err) return res.json({error: err})

        return res.json({
          user: {
            id: req.user.id,
            email: req.user.get('email'),
          },
          success: true,
        })
      })
    })(req, res, next)
  })

  app.post(options.paths.register, (req, res, next) => {
    passport.authenticate('register', (err, user, msg) => {
      if (err || !user) return res.json({error: msg})

      return res.json({
        user: {
          id: user.id,
          email: user.get('email'),
        },
        success: true,
      })
    })(req, res, next)
  })

}
