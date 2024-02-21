import * as React from 'react';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import Catalog from './src/BottomTabs/Catalog';
import MenuIcon from './src/Icons/MenuIcon';
import ContactsIcon from './src/Icons/ContactsIcon';
import ShoppingCart from './src/Icons/ShoppingCart';
import ShoppingCartScreen from './src/BottomTabs/ShoppingCart';
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

export default function AppComponent() {
  const cart = useSelector((state) => state.cart.cart);
  const testx = useSelector((state) => state.cart);
  const testL = useSelector((state) => state.navigateHeaders);
  console.log(testL);
  const isCartFocused = useSelector((state) => state.focus.isCartFocused);
  console.log(isCartFocused);
  console.log(cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalAmount());
  }, [cart, dispatch]);
  console.log(cart.total);
  console.log(testx);
  console.log(testL);
  return (
    <NavigationContainer>
      <AddItemModal />
      <Tab.Navigator sceneContainerStyle={{ backgroundColor: '#fff' }} screenOptions={{ headerShown: false, tabBarActiveTintColor: 'tomato' }}>
        <Tab.Screen
          name="Меню"
          component={Catalog}
          options={{
            tabBarIcon: () => MenuIcon,
          }}
        />
        <Tab.Screen
          name="Корзина"
          component={ShoppingCartScreen}
          options={{
            tabBarIcon: () => ShoppingCart,
            tabBarBadge: (isCartFocused || testx.total === 0) ? undefined : testx.total,
          }}
        />
        <Tab.Screen
          name="Контакты"
          component={SettingsScreen}
          options={{
            tabBarIcon: () => ContactsIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
