import { AsyncStatus, UserActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const authenticate = (authdata) =>
  dispatch => {
    const loginAction = createAction(UserActions.USER_LOGIN)

    if (!authdata || !authdata.type) {
      return dispatch(loginAction({
        status: AsyncStatus.FAILED,
        message: 'Empty request'
      }))
    }

    dispatch(loginAction({
      status: AsyncStatus.REQUEST
    }))

    switch (authdata.type) {
      case 'github':
        return API.githubLogin().subscribe(endpoint => {
          window.location.pathname = endpoint
        }, err => dispatch(loginAction({
          status: AsyncStatus.FAILED,
          message: err.message
        })))
      case 'google':
        return API.googleLogin().subscribe(endpoint => {
          window.location.pathname = endpoint
        }, err => dispatch(loginAction({
          status: AsyncStatus.FAILED,
          message: err.message
        })))
      default:
        return dispatch(loginAction({
          status: AsyncStatus.FAILED,
          message: 'Authentication method not supported'
        }))
    }
  }

export const checkAuthToken = () =>
  dispatch => {
    const checkAuthTokenAction = createAction(UserActions.USER_CHECK_AUTH_TOKEN)
    dispatch(checkAuthTokenAction({
      status: AsyncStatus.REQUEST
    }))

    API.getCurrentUser().then(user => dispatch(checkAuthTokenAction({
      status: AsyncStatus.SUCCESS,
      data: user
    }))).catch(() => {
      API.logout()
      dispatch(checkAuthTokenAction({
        status: AsyncStatus.FAILED
      }))
    })
  }

export const logout = () =>
  dispatch => {
    const logoutAction = createAction(UserActions.USER_LOGOUT)
    API.logout()
    dispatch(logoutAction({
      status: AsyncStatus.SUCCESS
    }))
  }
