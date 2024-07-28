import {combineReducers} from 'redux';

import authSlice from './reducers/authReducer';
import profileSlice from './reducers/profileReducer';

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
