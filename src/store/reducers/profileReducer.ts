import {createSlice} from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isProfile: false,
  },
  reducers: {
    addProfile(state) {
      state.isProfile = true;
    },
    deleteProfile(state) {
      state.isProfile = false;
    },
  },
});

export const {addProfile, deleteProfile} = profileSlice.actions;
export default profileSlice.reducer;
