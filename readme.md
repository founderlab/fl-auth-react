# Auth library for FounderLab apps. Use it with fl-auth-client

Usage:

  import auth from 'fl-auth'

  import User from './models/user' // Provide a User BackboneORM model to use
  app = express() // Provide your express app

  fl_auth.configure({app, model: User})
