import Horizon from '@horizon/client'

const horizon = Horizon({
  authType: 'token',
  secure: true
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    if (horizon.hasAuthToken()) {
      horizon.connect()
      return horizon.currentUser().fetch().subscribe(user =>
        resolve(user)
      )
    }
    return reject({ message: 'Invalid auth token' })
  })
}

const logout = () => {
  Horizon.clearAuthTokens()
}

const getStatus = () => {
  return horizon.status()
}

const githubLogin = () => {
  return horizon.authEndpoint('github')
}

const googleLogin = () => {
  return horizon.authEndpoint('google')
}

const getCountries = () => {
  return horizon('countries').fetch()
}

const onReady = (cb) => {
  horizon.onReady(cb)
}

export default {
  getCurrentUser,
  githubLogin,
  googleLogin,
  logout,
  getCountries,
  getStatus,
  horizon,
  onReady
}
