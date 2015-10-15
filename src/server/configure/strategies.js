import _ from 'lodash'
import Queue from 'queue-async'
import passport from 'passport'

import {BearerStrategy, createLoginStrategy, createRegisterStrategy} from '../strategies'

import {Strategy as FacebookStrategy} from 'passport-facebook'


export default function configureStrategies(options={}) {
  const User = options.User
  if (!User) throw new Error(`[fl-auth] Missing User model from configureStrategies, got ${options}`)

  // passport functions
  passport.use('login', createLoginStrategy(User))
  passport.use('register', createRegisterStrategy(User))

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
