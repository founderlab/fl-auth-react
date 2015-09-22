import _ from 'lodash'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'

const defaults = {
  // none yet
}

export default function configurePassport(options={}) {
  _.defaults(options, defaults)
  const User = options.User
  const app = options.app

  app.use(passport.initialize())
  app.use(passport.session())

  // serialize users to their id
  passport.serializeUser((user, callback) => {
    if (!user) return callback(new Error('User missing'))
    callback(null, user.id)
  })
  passport.deserializeUser((id, callback) => User.findOne(id, callback))

  // passport functions
  passport.use('login', new LocalStrategy({passReqToCallback: true}, (req, email, password, callback) =>
    User.findOne({email}, (err, user) => {
      if (err) return callback(err)
      if (!user) {
        console.log('login error: user not found', email)
        return callback(null, false, 'User not found')
      }
      if (!user.passwordIsValid(password)) {
        return callback(null, false, 'Incorrect password')
      }
      callback(null, user)
    })
  ))

  passport.use('signup', new LocalStrategy({passReqToCallback: true}, (req, email, password, callback) => {
    User.findOne({email}, (err, user) => {
      if (err) return callback(err)
      if (user) {
        console.log('signup error: user exists', email)
        return callback(null, false, 'user exists')
      }
      user = new User({email, password: User.createHash(password)})
      user.save(err => {
        if (err) return callback(err)
        callback(null, user)
      })
    })
  }))
}
