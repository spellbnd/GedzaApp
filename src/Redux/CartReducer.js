import { createSlice } from '@reduxjs/toolkit';
import additional from '../data/additional.json';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    isModalCartVisible: false,
    isGiftVisible: false,
    additionalList: additional,
    promocodeStatus: '',
    discountSize: 0,
    spendBonuses: 0,
  },
  reducers: {
    setGiftVisible: (state, action) => {
      state.isGiftVisible = action.payload;
    },
    setModalCartVisible: (state, action) => {
      state.isModalCartVisible = action.payload;
    },
    setCart: (state, action) => {
      const cartItems = action.payload;
      state.cart = cartItems;
    },
    addToCart: (state, action) => {
      const { id } = action.payload;
      const itemInCart = state.cart.find((item) => item.id === id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const itemInCart = state.cart.find((item) => item.id === id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (!itemInCart) {
        return;
      }
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
        const noGiftItems = state.cart.filter((item) => !Object.hasOwn(item, 'gift'));
        state.cart = noGiftItems;
      }
    },
    getTotalAmount: (state) => {
      let total = 0;
      let count = 0;
      state.cart.forEach((item) => {
        count += item.quantity;
      });
      state.cart
        .filter((item) => !Object.prototype.hasOwnProperty.call(item, 'gift'))
        .forEach((item) => {
          total += item.quantity * item.price;
        });
      state.total = total;
      state.count = count;
    },
    activatePromocode: (state, action) => {
      console.log(state);
      if (action.payload === 'TESTPROMOCODE') {
        state.promocodeStatus = 'activated';
        state.discountSize = 20;
      } else if (action.payload === 'clean') {
        state.promocodeStatus = '';
      } else {
        state.promocodeStatus = 'error';
      }
    },
    spendBonuses: (state, action) => {
      state.spendBonuses = action.payload;
    },
  },
});

export const {
  setModalCartVisible,
  addToCart,
  setCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getTotalAmount,
  setGiftVisible,
  activatePromocode,
  spendBonuses,
} = cartSlice.actions;

export default cartSlice.reducer;
