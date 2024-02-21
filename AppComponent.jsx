import * as React from 'react';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import Catalog from './src/BottomTabs/Catalog';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuIcon from './src/Icons/MenuIcon';
import ContactsIcon from './src/Icons/ContactsIcon';
import ShoppingCart from './src/Icons/ShoppingCart';
import ShoppingCartScreen from './src/BottomTabs/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { getTotalAmount } from './src/Redux/CartReducer';
import AddItemModal from './src/components/AddItemModal';


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const screenOptions = {
  headerShown: false,
}


export default function AppComponent() {
    const cart = useSelector((state) => state.cart.cart);
    const testx = useSelector((state) => state.cart);
    const testL = useSelector((state) => state.navigateHeaders);
    console.log(testL);
    const isCartFocused = useSelector((state) => state.focus.isCartFocused);
    console.log(isCartFocused)
    console.log(cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotalAmount());
    }, [cart])
    console.log(cart.total)
    console.log(testx)
    console.log(testL);
  return (
    <NavigationContainer>
      <AddItemModal/>
      <Tab.Navigator sceneContainerStyle={{backgroundColor: '#fff'}} screenOptions={{headerShown: false, tabBarActiveTintColor: 'tomato' }}>
        <Tab.Screen name="Меню" component={Catalog} options={{
          tabBarIcon: () => {
            return <MenuIcon/>
          }
        }} />
        <Tab.Screen name="Корзина" component={ShoppingCartScreen} options={{
          tabBarIcon: () => {
            return <ShoppingCart/>
          },
          tabBarBadge: (isCartFocused || testx.total == 0) ? undefined : testx.total
        }} />
        <Tab.Screen name="Контакты" component={SettingsScreen} options={{
          tabBarIcon: () => {
            return <ContactsIcon/>
          },
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}