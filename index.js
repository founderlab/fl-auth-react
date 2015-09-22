import _ from 'lodash'
import Queue from 'queue-async'

import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'

import User from '../models/user'

export default (options) => {

  const app = options.app
  if (!app) throw new Error('Auth init: Missing app from options')

  // serialize users to their id
  passport.serializeUser((user, callback) => {
    if (!user) return callback(new Error('User missing'))
    callback(null, user.id)
  })
  passport.deserializeUser((id, callback) => User.findOne(id, callback))

  // passport functions
  passport.use('login', new LocalStrategy({passReqToCallback: true}, (req, username, password, callback) =>
    User.findOne({username}, (err, user) => {
      if (err) return callback(err)
      if (!user) {
        console.log('login error: user not found', username)
        return callback(null, false, 'User not found')
      }
      if (!user.passwordIsValid(password)) {
        return callback(null, false, 'Incorrect password')
      }
      callback(null, user)
    })
  ))

  passport.use('signup', new LocalStrategy({passReqToCallback: true}, (req, username, password, callback) => {
    User.findOne({username}, (err, user) => {
      if (err) return callback(err)
      if (user) {
        console.log('signup error: user exists', username)
        return callback(null, false, 'user exists')
      }
      user = new User({username, password: User.createHash(password), email: req.param('email')})
      user.save(err => {
        if (err) return callback(err)
        callback(null, user)
      })
    })
  }))

  // app.post '/login', passport.authenticate('login', {
  //   successRedirect: '/home'
  //   failureRedirect: '/'
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
    successRedirect: '/home',
    failureRedirect: '/signup',
  }))
}
