import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AppComponent from './AppComponent';
import store from './src/Redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
}
