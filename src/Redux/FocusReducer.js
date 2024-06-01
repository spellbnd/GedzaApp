import { createSlice } from '@reduxjs/toolkit';

const focusSlice = createSlice({
  name: 'focus',
  initialState: {
    isCartFocused: false,
    isYandexModalVisible: false,
  },
  reducers: {
    setCartFocus: (state, action) => {
      state.isCartFocused = action.payload;
    },
    setYandexModalVisible: (state, action) => {
      state.isYandexModalVisible = action.payload;
    },
  },
});

export const { setCartFocus, setYandexModalVisible } = focusSlice.actions;

export default focusSlice.reducer;
