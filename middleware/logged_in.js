import path from 'path'
import core from './core'

export default (req, res, next) => {
  console.log('login check: ', req.user)
  next()
}
