import _ from 'lodash'
import passport from 'passport'

const defaults = {
  // none yet
}

export default function configureSerializing(options={}) {
  _.defaults(options, defaults)
  const User = options.User
  if (!User) throw new Error(`Missing User model from configureSerializing, got ${options}`)

  // serialize users to their id
  passport.serializeUser((user, callback) => {
    if (!user) return callback(new Error('User missing'))
    callback(null, user.id)
  })
  passport.deserializeUser((id, callback) => {User.findOne(id, callback)})

}
