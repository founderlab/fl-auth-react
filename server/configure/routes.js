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
  _.merge(options, defaults)
  const app = options.app
  if (!app) throw new Error(`Missing app from configureRoutes, got ${options}`)

  // login via ajax
  app.post(options.paths.login, (req, res, next) => {

    passport.authenticate('login', (err, user, msg) => {
      if (err) return res.status(500).json({error: msg})
      if (!user) return res.status(401).json({error: msg})

      req.login(user, {}, err => {
        if (err) return res.status(500).json({error: err})

        return res.json({
          user: {
            id: req.user.id,
            email: req.user.get('email'),
          },
        })
      })
    })(req, res, next)
  })

  // register via ajax
  app.post(options.paths.register, (req, res, next) => {

    passport.authenticate('register', (err, user, msg) => {
      if (err) return res.status(500).json({error: msg})
      if (!user) return res.status(402).json({error: msg})

      req.login(user, {}, err => {
        if (err) return res.status(500).json({error: err})
        return res.json({
          user: {
            id: user.id,
            email: user.get('email'),
          },
        })
      })
    })(req, res, next)
  })

}
