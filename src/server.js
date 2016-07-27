import express from 'express'
import { default as api } from './backend/api'
import config from '../config'
import proxy from 'http-proxy-middleware'

const app = express()

if (process.env.NODE_ENV === 'production') {
  const host = `//${config.express.host}:${config.express.port}`
  app.get('/favicon.ico', proxy({target: `${host}`}))
} else {
  app.get('/favicon.ico', proxy({target: `${config.clientProxy}`}))
  app.get('/bundle.js', proxy({target: `${config.clientProxy}`}))
}

app.use('/', (req, res) =>
  res.status(200).send(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React App</title>
        <link rel="shortcut icon" href="/favicon.ico">
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="/bundle.js"></script>
      </body>
    </html>`))

api.run(app)
