import { combineReducers } from 'redux'
import userReducers from 'reducers/user'

const rootReducer = combineReducers({
  user: userReducers
})

export default rootReducer
