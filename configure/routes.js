import _ from 'lodash'
import passport from 'passport'

const defaults = {}

export default function configureRoutes(options={}) {
  _.defaults(options, defaults)
  const app = options.app
  if (!app) throw new Error(`Missing app from configureRoutes, got ${app}`)

  // app.post '/login', passport.authenticate('login', {
  //   successRedirect: '/'
  //   failureRedirect: '/login'
  // })
  app.post('/login', (req, res) => {
    console.log(req.xhr)

    passport.authenticate('login', (err, user, msg) => {
      if (err || !user) return res.json({error: msg})

      req.login(user, {}, err => {
        if (err) return res.json({error: err})

        return res.json({
          user: {
            id: req.user.id,
            username: req.user.get('username'),
            email: req.user.get('email'),
          },
          success: true,
        })
      })
    })(req, res)

  })

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/login',
  }))

}
