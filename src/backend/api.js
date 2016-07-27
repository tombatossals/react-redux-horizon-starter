import horizon from '@horizon/server'
import config from '../../config'
import fs from 'fs'
import https from 'https'

const run = (app) => {
  const port = config.express.port

  let options = {
    key: fs.readFileSync(config.express.ssl.key),
    cert: fs.readFileSync(config.express.ssl.cert)
  }

  const server = https.createServer(options, app)
  server.listen(port, err => {
    if (err) {
      console.log(err)
    }
    console.log('Listening on port ' + port)
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
