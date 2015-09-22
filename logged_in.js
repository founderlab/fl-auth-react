import path from 'path'
import User from '../models/user'

export default (req, res, next) => {
  console.log('login check: ', req.user)
  next()
}
