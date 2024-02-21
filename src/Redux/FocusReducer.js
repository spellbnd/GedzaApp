import { createSlice } from '@reduxjs/toolkit';

const focusSlice = createSlice({
  name: 'focus',
  initialState: { isCartFocused: false },
  reducers: {
    setCartFocus: (state, action) => {
      state.isCartFocused = action.payload;
    },
  },
});

export const { setCartFocus } = focusSlice.actions;

export default focusSlice.reducer;