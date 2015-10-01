# Auth pacakge for FounderLab apps

Usage (server):

  import {configure as configureAuth, loggedIn} from 'fl-auth/server'

  app = express()                   // Provide your express app
  configureAuth({app})
