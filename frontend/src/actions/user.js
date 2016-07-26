import { AsyncStatus, UserStatus, UserActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const authenticate = (authdata) =>
  dispatch => {
    const loginAction = createAction(UserActions.USER_LOGIN)

    if (!authdata || !authdata.type) {
      return dispatch(loginAction({
        status: UserStatus.ANONYMOUS,
        actionStatus: AsyncStatus.FAILED,
        message: 'Empty request'
      }))
    }

    dispatch(loginAction({
      status: UserStatus.UNDETERMINED,
      actionStatus: AsyncStatus.REQUEST
    }))

    switch (authdata.type) {
      case 'github':
        return API.githubLogin().subscribe(endpoint => {
          window.location.pathname = endpoint
        }, err => dispatch(loginAction({
          status: UserStatus.ANONYMOUS,
          actionStatus: AsyncStatus.FAILED,
          message: err.message
        })))
      case 'google':
        return API.googleLogin().subscribe(endpoint => {
          window.location.pathname = endpoint
        }, err => dispatch(loginAction({
          status: UserStatus.ANONYMOUS,
          actionStatus: AsyncStatus.FAILED,
          message: err.message
        })))
      default:
        return dispatch(loginAction({
          status: UserStatus.ANONYMOUS,
          actionStatus: AsyncStatus.FAILED,
          message: 'Authentication method not supported'
        }))
    }
  }

export const checkAuthToken = () =>
  dispatch => {
    const checkAuthTokenAction = createAction(UserActions.USER_CHECK_AUTH_TOKEN)
    dispatch(checkAuthTokenAction({
      actionStatus: AsyncStatus.REQUEST,
      status: UserStatus.UNDETERMINED
    }))

    API.getCurrentUser().then(user => dispatch(checkAuthTokenAction({
      status: UserStatus.AUTHENTICATED,
      actionStatus: AsyncStatus.SUCCESS,
      data: user
    })), () => {
      API.logout()
      dispatch(checkAuthTokenAction({
        status: UserStatus.ANONYMOUS,
        actionStatus: AsyncStatus.SUCCESS
      }))
    })
  }

export const logout = () =>
  dispatch => {
    const logoutAction = createAction(UserActions.USER_LOGOUT)
    API.logout()
    dispatch(logoutAction({
      actionStatus: AsyncStatus.SUCCESS,
      status: UserStatus.ANONYMOUS
    }))
  }
