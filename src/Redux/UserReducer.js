import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersList: [{
      fullname: 'Дмитрий',
      phone: '+79871002095',
      password: '12345',
    }],
    currentUser: {
      history: [],
      bonuses: 0,
      logged: false,
    },
  },
  reducers: {
    register: (state, action) => {
      const isAlreadyRegistered = state.usersList.find((item) => item.phone === action.payload.phone);
      if (isAlreadyRegistered) {
        state.currentUser.logged = 'already_registered';
      } else {
        state.usersList.push(action.payload);
        state.currentUser.logged = 'success_registration';
      }
    },
    login: (state, { payload }) => {
      const inUserList = state.usersList.find((item) => item.phone === payload.phone);
      if (inUserList) {
        if (inUserList.password === payload.password) {
          state.currentUser = { ...state.currentUser, ...inUserList, logged: true };
        } else {
          state.currentUser.logged = 'error';
        }
      } else {
        state.currentUser.logged = 'error';
      }
    },
    setUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      console.log(state.currentUser);
    },
    setUserOrderHistory: (state, action) => {
      console.log(action.payload);
      const historyData = _.cloneDeep(action.payload);

      state.currentUser.bonuses += historyData.bonucesCount - historyData.spendBonus;
      state.currentUser.history.push(historyData);
      console.log('Выводим ЩИТ');
      console.dir(state.currentUser, { depth: 30 });
      console.log('Вывели');
      console.log(state);
    },
    exitUser: (state) => {
      state.currentUser = { history: [], bonuses: 0 };
    },
    addtoUserList: (state, action) => {
      const userData = _.cloneDeep(action.payload);
      const findUser = state.usersList.findIndex((item) => item.phone === state.currentUser.phone && item.password === state.currentUser.password);
      if (findUser === -1) {
        state.usersList.push(state.currentUser);
      } else {
        const currentData = state.usersList[findUser];
        state.usersList[findUser] = { ...currentData, ...userData };
      }
    },
  },
});

export const {
  setUser, setUserOrderHistory, exitUser, addtoUserList, login, register,
} = userSlice.actions;

export default userSlice.reducer;
