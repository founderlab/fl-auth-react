import passport from 'passport'

export default function configureSerializing(options={}) {
  const User = options.User
  if (!User) throw new Error(`[fl-auth] Missing User model from configureSerializing, got ${options}`)

  // serialize users to their id
  passport.serializeUser((user, callback) => {
    if (!user) return callback(new Error('User missing'))
    callback(null, user.id)
  })
  passport.deserializeUser((id, callback) => {User.findOne(id, callback)})

}
