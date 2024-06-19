import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import AppComponent from './AppComponent';
import store from './src/Redux/store';
import { loadCurrentUser, loadUsersList } from './src/utils/asyncStorage';
import { setUser, setUsersList } from './src/Redux/UserReducer';

export default function App() {
  useEffect(() => {
    const loadUsers = async () => {
      const loadedUser = await loadCurrentUser();
      const usersList = await loadUsersList();
      if (loadedUser) {
        store.dispatch(setUser(loadedUser));
      }
      if (usersList) {
        store.dispatch(setUsersList(usersList));
      }
    };
    loadUsers();
  }, []);
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
}
