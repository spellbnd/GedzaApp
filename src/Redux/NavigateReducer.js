import { createSlice } from '@reduxjs/toolkit';

const navigateSlice = createSlice({
  name: 'navigateHeaders',
  initialState: {
    navigateHeaders: [],
    scrollTop: 0,
    activeItem: {},
  },
  reducers: {
    navigateListAdd: (state, action) => {
      const headerTitleIn = state.navigateHeaders.find((item) => item.title === action.payload.title);
      if (!headerTitleIn) {
        state.navigateHeaders.push(action.payload);
      }
    },
    setScrollTop: (state, action) => {
      state.scrollTop = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});

export const {
  navigateListAdd, setScrollTop, setActiveItem,
} = navigateSlice.actions;

export default navigateSlice.reducer;
