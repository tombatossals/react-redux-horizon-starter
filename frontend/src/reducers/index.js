import { combineReducers } from 'redux'
import userReducers from './user'

const rootReducer = combineReducers({
  user: userReducers
})

export default rootReducer
