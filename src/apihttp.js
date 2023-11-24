import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import logger from 'winston'
import colors from 'colors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import https from 'https'
import fs from 'fs'

import { ApiServer } from './apiserver'
import { createMiddleware as createPrometheusMiddleware } from '@promster/express'
import { createServer } from '@promster/server'

const HEADERS = { 'Content-Type': 'application/json' }

export function makeHTTPServer(config) {

    const app = express()
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(cors(corsOptions))
    app.use(cookieParser())
    app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.route('/api-openid/').get((req, res) => {
        logger.info('http - makeHTTPServer --> Usuario accede por browser')
    })

    const server = new ApiServer(config)

    app.post('/api-openid/retrieve-token', (req, res) => {
       const { username, password, grant_type, client_id, client_secret } = req.body;
       server.retrievetoken(
               username,
               password,
               grant_type,
               client_id,
               client_secret,

            )
           .then((response) => {
               res.send(response)
               res.end()
           })
           .catch((err) => {
               res.write(err)
               res.end()
           })
    })

    app.post('/api-openid/admin-access-token-client-credentials-grant', (req, res) => {
      const { grant_type, client_id, client_secret } = req.body;
      server.adminAccessTokenClientCredentialsGrant(
              grant_type.toString(),
              client_id.toString(),
              client_secret.toString()
           )
          .then((response) => {
              res.send(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
    })

    app.post('/api-openid/obtain-access-token-for-a-user', (req, res) => {
      const { username, password, grant_type, client_id, client_secret } = req.body;
      server.obtainAccessTokenForUser(
              username.toString(),
              password.toString(),
              grant_type.toString(),
              client_id.toString(),
              client_secret.toString()
           )
          .then((response) => {
              res.send(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
    })

    app.post('/api-openid/protocol-token', (req, res) => {
      const { username, password, grant_type, client_id, client_secret } = req.body;
      server.protocolToken(
              username.toString(),
              password.toString(),
              grant_type.toString(),
              client_id.toString(),
              client_secret.toString()
           )
          .then((response) => {
              res.send(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
    })

    app.post('/api-openid/create-new-user', (req, res) => {
      const objectJSON = JSON.stringify(req.body);
      const { authorization } = req.headers;
      server.createNewUser(
              objectJSON,
              authorization
           )
          .then((response) => {
              res.send(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
    })

    app.get('/api-openid/configuration', (req, res) => {
       server.configuration (
            )
           .then((response) => {
               res.write(response)
               res.end()
           })
           .catch((err) => {
               res.write(err)
               res.end()
           })
   })

   app.get('/api-openid/user-info', (req, res) => {
      const { authorization } = req.headers;
      server.userInfo (
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/admin-users', (req, res) => {
      const { authorization } = req.headers;
      server.adminUsers (
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/get-realms-info', (req, res) => {
      const { authorization } = req.headers;
      server.getRealmsInfo (
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/get-users', (req, res) => {
      const { authorization } = req.headers;
      server.getUsers (
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/get-users', (req, res) => {
      const { authorization } = req.headers;
      server.getUsers (
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/get-representation-user/:id', (req, res) => {
      let id = req.params.id
      const { authorization } = req.headers;
      server.getRepresentationUser (
               id,
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.post('/api-openid/update-user', (req, res) => {
      let { id } = req.body
      const { authorization } = req.headers;
      const objectJSON = JSON.stringify(req.body);
      server.updateUser (
               id,
               objectJSON,
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/delete-user/:id', (req, res) => {
      let id = req.params.id
      const { authorization } = req.headers;
      server.deleteUser (
               id,
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/get-credentials/:id', (req, res) => {
      let id = req.params.id
      const { authorization } = req.headers;
      server.getCredentials (
               id,
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/logout-user/:id', (req, res) => {
      let id = req.params.id
      const { authorization } = req.headers;
      server.logoutUser (
               id,
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/send-update-account-email-user/:id', (req, res) => {
      let id = req.params.id
      const { authorization } = req.headers;
      server.sendUpdateAccountEmailUser (
               id,
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.post('/api-openid/reset-password/:id', (req, res) => {
      let id = req.params.id
      const { authorization } = req.headers;
      const objectJSON = JSON.stringify(req.body);
      server.resetPassword (
               id,
               objectJSON,
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   app.get('/api-openid/send-verify-email/:id', (req, res) => {
      let id = req.params.id
      const { authorization } = req.headers;
      server.sendVerifyEmail (
               id,
               authorization
           )
          .then((response) => {
              res.write(response)
              res.end()
          })
          .catch((err) => {
              res.write(err)
              res.end()
          })
   })

   return server.initializeServer()
        .then(() => {})
        .then(() => app)

}
