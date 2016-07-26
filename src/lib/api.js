import hz from '@horizon/client'

const hzconn = hz({
  authType: 'token',
  secure: false,
  host: 'http://localhost:8181'
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    if (hzconn.hasAuthToken()) {
      hzconn.connect()
      return hzconn.currentUser().fetch().subscribe(user =>
        resolve(user)
      )
    }
    return reject({ message: 'Invalid auth token' })
  })
}

const logout = () => {
  hz.clearAuthTokens()
}

const getStatus = () => {
  return hzconn.status()
}

const githubLogin = () => {
  return hzconn.authEndpoint('github')
}

const googleLogin = () => {
  return hzconn.authEndpoint('google')
}

const getCountries = () => {
  return hzconn('countries').fetch()
}

const onReady = (cb) => {
  hzconn.onReady(cb)
}

export default {
  getCurrentUser,
  githubLogin,
  googleLogin,
  logout,
  getCountries,
  getStatus,
  onReady
}
