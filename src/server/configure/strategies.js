import _ from 'lodash'
import passport from 'passport'
import {Strategy as FacebookStrategy} from 'passport-facebook'
import {BearerStrategy, PasswordStrategy, RegisterStrategy} from '../strategies'


export default function configureStrategies(options={}) {
  const User = options.User
  if (!User) throw new Error(`[fl-auth] Missing User model from configureStrategies, got ${options}`)

  // passport functions
  const strategy_options = {User, ...options.login}
  passport.use('password', new PasswordStrategy(strategy_options))
  passport.use('register', new RegisterStrategy(strategy_options))
  passport.use('bearer', new BearerStrategy(strategy_options))

  if (options.facebook) {
    passport.use(new FacebookStrategy({
      clientID: options.facebook.app_id,
      clientSecret: options.facebook.app_secret,
      callbackURL: options.facebook.url + options.facebook.paths.callback,
      profileFields: options.facebook.profile_fields,
    },

    (access_token, refresh_token, profile, callback) => {
      const email = _.get(profile, 'emails[0].value', '')
      if (!email) return callback(new Error(`[fl-auth] FacebookStrategy: No email from Facebook, got profile: ${JSON.stringify(profile)}`))

      User.findOrCreate({email}, (err, user) => {
        if (err) return callback(err)
        user.save({facebook_id: profile.id, name: profile.displayName, facebook_access_token: access_token}, callback)
      })

    }))
  }

}
