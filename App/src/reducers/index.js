import { combineReducers } from 'redux'

import user from './user';
import navigation from './navigation';

const rootReducer = combineReducers({
  user,
  navigation,
})

export default rootReducer
