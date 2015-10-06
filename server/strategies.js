import _ from 'lodash'
import Queue from 'queue-async'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as FacebookStrategy} from 'passport-facebook'


export default function configureStrategies(options={}) {
  const User = options.User
  if (!User) throw new Error(`Missing User model from fl-auth::configureStrategies, got ${options}`)

  // passport functions
  passport.use('login', new LocalStrategy({passReqToCallback: true, usernameField: 'email'}, (req, email, password, callback) =>
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

  passport.use('register', new LocalStrategy({passReqToCallback: true, usernameField: 'email'}, (req, email, password, callback) => {
    User.findOne({email}, (err, user) => {
      if (err) return callback(err)

      if (user) {
        console.log('register error: user exists', email)
        return callback(null, false, 'user exists')
      }

      const new_user = new User({email, password: User.createHash(password)})
      new_user.save(err => {
        if (err) return callback(err)
        callback(null, new_user)
      })

    })
  }))

  if (options.facebook) {
    passport.use(new FacebookStrategy({
      clientID: options.facebook.app_id,
      clientSecret: options.facebook.app_secret,
      callbackURL: options.facebook.url + options.facebook.paths.callback,
      profileFields: options.facebook.profile_fields,
    },

    (accessToken, refreshToken, profile, callback) => {
      const queue = new Queue(1)
      const email = _.get(profile, 'emails[0].value', '')
      let user
      console.log('profile:', profile, email)

      if (email) queue.defer(callback => User.findOne({email}, (err, found_user) => callback(err, user = found_user)))

      queue.await(err => {
        if (err) return callback(err)
        if (!user) user = new User({email})
        user.save({facebook_id: profile.id, name: profile.displayName}, callback)
      })

    }))
  }

}