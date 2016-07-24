const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return require('./development')

    case 'production':
      return require('./production')

    default:
      return require('./development')
  }
}

module.exports = getConfig()
