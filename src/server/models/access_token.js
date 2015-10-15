import moment from 'moment'
import Backbone from 'backbone'

const db_url = process.env.AUTH_DATABASE_URL || process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class AccessToken extends Backbone.Model {
  url = `${db_url}/access_tokens`
  schema = () => ({
    created_at: [{indexed: true}],
    expires_at: [{indexed: true}],
    // client: -> ['belongsTo', require('./client')]
    user: () => ['belongsTo', require('./user')],
    refresh_token: () => ['belongsTo', require('./refresh_token')],
  })

  defaults() { return {created_at: moment.utc().toDate()} }

}

AccessToken.prototype.sync = require('backbone-mongo').sync(AccessToken)
