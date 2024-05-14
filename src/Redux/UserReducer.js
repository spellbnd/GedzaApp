import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersList: [],
  },
  reducers: {
    setUser: (state, { payload }) => {
      AsyncStorage.setItem('user-data', JSON.stringify(payload));
      console.log(payload);
      return payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
