import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENT_USER_KEY = 'currentUser'; // Ключ для хранения currentUser в AsyncStorage
const USERS_LIST_KEY = 'usersList';

export const loadCurrentUser = async () => {
  try {
    const currentUserJSON = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (currentUserJSON === null) {
      return undefined; // Возвращаем undefined, если нет сохраненных данных
    }
    return JSON.parse(currentUserJSON);
  } catch (error) {
    console.error('Error loading currentUser from AsyncStorage:', error);
    return undefined;
  }
};

export const loadUsersList = async () => {
  try {
    const usersListJSON = await AsyncStorage.getItem(USERS_LIST_KEY);
    if (usersListJSON === null) {
      return undefined; // Возвращаем undefined, если нет сохраненных данных
    }
    return JSON.parse(usersListJSON);
  } catch (error) {
    console.error('Error loading usersListJSON from AsyncStorage:', error);
    return undefined;
  }
};

export const saveCurrentUser = async (currentUser) => {
  try {
    const currentUserJSON = JSON.stringify(currentUser);
    await AsyncStorage.setItem(CURRENT_USER_KEY, currentUserJSON);
    console.log(currentUser);
  } catch (error) {
    console.error('Error saving currentUser to AsyncStorage:', error);
  }
};

export const saveUsersList = async (usersList) => {
  try {
    const usersListJSON = JSON.stringify(usersList);
    await AsyncStorage.setItem(USERS_LIST_KEY, usersListJSON);
  } catch (error) {
    console.error('Error saving usersList to AsyncStorage:', error);
  }
};

export const exitUserStorage = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Не удалось выйти из аккаунта');
  }
};
