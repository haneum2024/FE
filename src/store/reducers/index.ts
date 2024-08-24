import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  notifications: notificationReducer,
});

export default rootReducer;
