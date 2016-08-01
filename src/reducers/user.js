import { handleActions } from 'redux-actions'
import { UserStatus, AsyncStatus } from '../lib/constants'

const initialUserState = {
  status: UserStatus.ANONYMOUS
}

export default handleActions({
  USER_LOGIN: (state, action) => {
    switch (action.payload.status) {
      case AsyncStatus.FAILED:
        return {
          status: UserStatus.ANONYMOUS,
          message: action.payload.message
        }
      case AsyncStatus.REQUEST:
        return {
          status: UserStatus.UNDETERMINED
        }
      case AsyncStatus.SUCCESS:
        return {
          status: UserStatus.AUTHENTICATED,
          data: action.payload.data
        }
      default:
        return state
    }
  },
  USER_CHECK_AUTH_TOKEN: (state, action) => {
    switch (action.payload.status) {
      case AsyncStatus.FAILED:
        return {
          status: UserStatus.ANONYMOUS
        }
      case AsyncStatus.REQUEST:
        return {
          status: UserStatus.UNDETERMINED
        }
      case AsyncStatus.SUCCESS:
        return {
          status: UserStatus.AUTHENTICATED,
          data: action.payload.data
        }
      default:
        return state
    }
  },
  USER_LOGOUT: (state, action) => {
    switch (action.payload.status) {
      case AsyncStatus.SUCCESS:
        return {
          status: UserStatus.ANONYMOUS
        }
      default:
        return state
    }
  }
}, initialUserState)
