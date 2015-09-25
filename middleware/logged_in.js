import core from '../core'

export default (req, res, next) => {
  console.log('login check: ', req.user)
  const User = core.User

  const user_id = req.user_id
  User.findOne(user_id, (err, user) => {
    if (err) return res.status(500).send(err)
    console.log('found user', user)
  })
  next()
}
