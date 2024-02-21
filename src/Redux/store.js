import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './CartReducer';
import FocusReducer from './FocusReducer';
import NavigateReducer from './NavigateReducer';

export default configureStore({
  reducer: {
    cart: CartReducer,
    focus: FocusReducer,
    navigateHeaders: NavigateReducer,
  },
});
