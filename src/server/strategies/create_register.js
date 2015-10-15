import {Strategy as LocalStrategy} from 'passport-local'
import {findOrCreateAccessToken} from '../lib'

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

        findOrCreateAccessToken({user_id: user.id}, (err, access_token) => {
          if (err) return callback(err)
          console.log('passwd: access_token', access_token)
          req.session.access_token = access_token.toJSON()
          req.session.save((err) => console.log('saved session', err, req.session))
          callback(null, new_user)
        })

      })
    })
  })
}
