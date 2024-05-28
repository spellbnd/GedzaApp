import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import additional from '../data/additional.json';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    history: [],
    isModalCartVisible: false,
    isGiftVisible: false,
    additionalList: additional,
    activatedPromocode: false,
    discountSize: 0,
    yandexModalVisible: false,
    spendBonuses: 0,
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
    setCart: (state, action) => {
      const cartItems = action.payload;
      state.cart = cartItems;
    },
    setCartHistory: (state, action) => {
      const ordersHistory = action.payload;
      console.log(ordersHistory);
      state.history = ordersHistory;
    },
    addToCart: (state, action) => {
      const { id } = action.payload;
      const itemInCart = state.cart.find((item) => item.id === id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const itemInCart = state.cart.find((item) => item.id === id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cart));
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
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cart));
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
      if (action.payload === 'GEDZA2024') {
        state.activatedPromocode = true;
        state.discountSize = 20;
      } else {
        state.activatedPromocode = 'error';
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
  setYaModalVisible,
  setCartHistory,
  spendBonuses,
} = cartSlice.actions;

export default cartSlice.reducer;
