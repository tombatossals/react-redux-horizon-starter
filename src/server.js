import express from 'express'
import fs from 'fs'
import api from './backend/api'
import config from '../config'
import proxy from 'http-proxy-middleware'

const app = express()
let index

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/../frontend/build`))
  index = fs.readFileSync(`${__dirname}/../frontend/build/index.html`, 'utf8')
} else {
  app.get('/favicon.ico', proxy({target: `${config.clientProxy}`}))
  app.get('/bundle.js', proxy({target: `${config.clientProxy}`}))
  index = `<!doctype html>
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
    </html>`
}

app.use('/', (req, res) => res.status(200).send(index))
api.run(app)

