import { createSlice } from '@reduxjs/toolkit';
import additional from '../data/additional.json';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    isModalCartVisible: false,
    isGiftVisible: false,
    additionalList: additional,
    activatedPromocode: false,
    discountSize: 0,
    yandexModalVisible: false,
  },
  reducers: {
    setYaModalVisible: (state, action) => {
      state.yandexModalVisible = action.payload;
    },
    setGiftVisible: (state, action) => {
      state.isGiftVisible = action.payload;
    },
    setModalCartVisible: (state, action) => {
      state.isModalCartVisible = action.payload;
    },
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = removeFromCart;
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart.quantity === 1) {
        const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
        state.cart = removeFromCart;
      } else {
        itemInCart.quantity -= 1;
      }
      let total = 0;
      state.cart.forEach((item) => {
        total += item.quantity * item.price;
      });
      if (total < 2000) {
        const noGiftItems = state.cart.filter((item) => !item.hasOwnProperty('gift'));
        state.cart = noGiftItems;
      }
    },
    getTotalAmount: (state) => {
      let total = 0;
      let count = 0;
      state.cart.forEach((item) => {
        count += item.quantity;
      });
      state.cart.filter((item) => !item.hasOwnProperty('gift')).forEach((item) => {
        total += item.quantity * item.price;
      });
      state.total = total;
      state.count = count;
    },
    activatePromocode: (state, action) => {
      console.log(action);
      if (action.payload === 'GEDZA2024') {
        state.activatedPromocode = true;
        state.discountSize = 20;
      } else {
        state.activatedPromocode = 'error';
      }
    },
  },
});

export const {
  setModalCartVisible, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getTotalAmount, setGiftVisible, activatePromocode, setYaModalVisible,
} = cartSlice.actions;

export default cartSlice.reducer;
