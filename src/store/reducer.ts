import {combineReducers} from 'redux';

import authSlice from './reducers/authReducer';
import profileSlice from './reducers/profileReducer';
import notificationSlice from './reducers/notificationReducer';

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  notifications: notificationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
