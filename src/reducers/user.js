import { handleActions } from 'redux-actions'
import { UserStatus } from '../lib/constants'

const initialUserState = {
  status: UserStatus.ANONYMOUS
}

export default handleActions({
  USER_LOGIN: (state, action) => action.payload,
  USER_CHECK_AUTH_TOKEN: (state, action) => action.payload,
  USER_LOGOUT: (state, action) => action.payload
}, initialUserState)
