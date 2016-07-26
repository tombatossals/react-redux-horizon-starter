import path from 'path'
import express from 'express'
import horizon from '@horizon/server'
import config from '../../config'
import fs from 'fs'
import https from 'https'

const app = express()
let host

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(process.cwd(), '.build')))
  host = `//${config.express.host}:${config.express.port}`
} else {
  app.use('/static', express.static(path.join(process.cwd(), 'src', 'static')))
  host = `//${config.devServer.host}:${config.devServer.port}`
}

const vendor = `${host}/static/vendor.bundle.js`
const bundle = `${host}/static/client.bundle.js`
const styles = `${host}/static/css/style.css`

app.use('/', (req, res) => {
  res.status(200).send(`<!doctype html>
    <html>
      <head>
        <title>React-Dashboard</title>
        <link rel="stylesheet" type="text/css" href="${styles}" />
      </head>
      <body>
        <div id='root'></div>
        <script src="${vendor}"></script>
        <script src="${bundle}"></script>
      </body>
    </html>`)
})

const run = () => {
  const port = config.express.port

  let options ={}
  if (process.env.NODE_ENV === 'production') {
    options = {
      key: fs.readFileSync(config.express.ssl.key),
      cert: fs.readFileSync(config.express.ssl.cert)
    }
  }

  const server = https.createServer(options, app)
  server.listen(port, err => {
    if (err) {
      console.log(err)
    }
  })

  const hserver = horizon(server, {
    project_name: config.project_name,
    permissions: false,
    auto_create_collection: true,
    auth: {
      token_secret: config.token_secret
    }
  })

  if (config.auth.providers.github) {
    hserver.add_auth_provider(horizon.auth.github, config.auth.providers.github)
  }

  if (config.auth.providers.google) {
    hserver.add_auth_provider(horizon.auth.google, config.auth.providers.google)
  }
}

export default {
  run
}
