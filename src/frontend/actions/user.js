import { AsyncStatus, UserStatus, UserActions } from 'lib/constants'
import { createAction } from 'redux-actions'
import API from 'lib/api'

export const authenticate = (authdata) =>
  dispatch => {
    const loginAction = createAction(UserActions.USER_LOGIN)

    if (!authdata || !authdata.type) {
      return dispatch(loginAction({
        status: AsyncStatus.FAILED,
        message: 'Empty request'
      }))
    }

    dispatch(loginAction({ status: UserStatus.REQUEST }))

    switch (authdata.type) {
      case 'github':
        return API.githubLogin().subscribe(endpoint => {
          window.location.pathname = endpoint
        }, err => dispatch(loginAction({
          status: UserStatus.FAILED,
          message: err.message
        })))
      case 'google':
        return API.googleLogin().subscribe(endpoint => {
          window.location.pathname = endpoint
        }, err => dispatch(loginAction({
          status: UserStatus.FAILED,
          message: err.message
        })))
    }
  }


export const checkAuthToken = () =>
  dispatch => {
    const checkAuthTokenAction = createAction(UserActions.USER_CHECK_AUTH_TOKEN)
    dispatch(checkAuthTokenAction({
      actionStatus: AsyncStatus.REQUEST
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
