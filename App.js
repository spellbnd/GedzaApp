import AppComponent from "./AppComponent";
import store from './src/Redux/store'
import { Provider } from 'react-redux';
import {Platform, NativeModules, SafeAreaView} from 'react-native';
const {StatusBarManager} = NativeModules;


export default function App() {
  return (
    <Provider store={store}>
  <AppComponent/>
    </Provider>
  );
}