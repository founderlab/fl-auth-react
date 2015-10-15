import {Strategy as LocalStrategy} from 'passport-local'

export default function createRegisterStrategy(User) {

  return new LocalStrategy({passReqToCallback: true, usernameField: 'email'}, (req, email, password, callback) => {
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
  })

}
