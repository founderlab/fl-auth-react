import passport from 'passport'
import logout from '../lib'

export default function configureRoutes(options={}) {
  const app = options.app
  if (!app) throw new Error(`[fl-auth] Missing app from configureRoutes, got ${options}`)

  // login via ajax
  app.post(options.paths.login, (req, res, next) => {

    passport.authenticate('password', (err, user, info) => {
      if (err) return res.status(500).json({error: err})
      if (!user) return res.status(401).json({error: info})

      req.login(user, {}, err => {
        if (err) return res.status(500).json({error: err})

        const {access_token} = info
        return res.json({
          access_token,
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

    passport.authenticate('register', (err, user, info) => {
    // console.log('Failing:', arguments)
    console.log('Failing:', err, user, info)
    console.log('info:', JSON.stringify(info))
      if (err) return res.status(500).json({error: err})
      if (!user) return res.status(402).json({error: info})

      req.login(user, {}, err => {
        if (err) return res.status(500).json({error: err})

        const {access_token} = info
        return res.json({
          access_token,
          user: {
            id: user.id,
            email: user.get('email'),
          },
        })
      })
    })(req, res, next)
  })

  // logout
  app.all('/logout', (req, res) => {
    logout(req, () => res.redirect('/'))
  })

  if (options.facebook) {
    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at options.paths.facebook_callback
    app.get(options.facebook.paths.redirect, passport.authenticate('facebook', {scope: options.facebook.scope}))

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.get(options.facebook.paths.callback, passport.authenticate('facebook', {successRedirect: '/', failureRedirect: options.paths.login}))
  }

}
