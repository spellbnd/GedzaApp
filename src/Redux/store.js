import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './CartReducer';
import FocusReducer from './FocusReducer';
import NavigateReducer from './NavigateReducer';
import UserReducer from './UserReducer';

const store = configureStore({
  reducer: {
    cart: CartReducer,
    focus: FocusReducer,
    navigateHeaders: NavigateReducer,
    user: UserReducer,
  },
});

export default store;
