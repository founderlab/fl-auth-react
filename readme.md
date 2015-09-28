# Auth pacakge for FounderLab apps

Usage (server):

  import Auth from 'fl-auth/server'

  import User from './models/user'  // Provide a User (BackboneORM) model to use
  app = express()                   // Provide your express app

  Auth.configure({app, model: User})
