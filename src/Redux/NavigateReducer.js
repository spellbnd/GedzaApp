import { createSlice } from '@reduxjs/toolkit';

const navigateSlice = createSlice({
  name: 'navigateHeaders',
  initialState: {
    navigateHeaders: [],
    pressed: {},
  },
  reducers: {
    navigateListAdd: (state, action) => {
      const headerTitleIn = state.navigateHeaders.find((item) => item.title === action.payload.title);
      if (!headerTitleIn) {
        state.navigateHeaders.push(action.payload);
      }
    },
    setPressedCategory: (state, action) => {
      state.pressed = action.payload;
    },
  },
});

export const { navigateListAdd, setPressedCategory } = navigateSlice.actions;

export default navigateSlice.reducer;
