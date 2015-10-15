import moment from 'moment'
import Backbone from 'backbone'
import bcrypt from 'bcrypt-nodejs'

const db_url = process.env.AUTH_DATABASE_URL || process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class User extends Backbone.Model {
  url = `${db_url}/Users`
  schema = () => ({
    access_tokens: () => ['hasMany', require('./access_token')],
  })

  defaults() { return {created_at: moment.utc().toDate()} }

  passwordIsValid(password) { return bcrypt.compareSync(password, this.get('password')) }

  static createHash(password) { return bcrypt.hashSync(password) }
}

// User.prototype.schema = {}
User.prototype.sync = require('backbone-mongo').sync(User)
