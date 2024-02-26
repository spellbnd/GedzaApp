import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        initialParams={{ params: 'Меню' }}
        name="Home Drawer"
        component={BottomTabNavigator}
        options={{
          title: 'Меню',
        }}
      />
      <Drawer.Screen
        name="Cart"
        initialParams={{ params: 'Корзина' }}
        component={BottomTabNavigator}
        options={{
          title: 'Корзина',
        }}
      />
      <Drawer.Screen
        name="Test"
        initialParams={{ params: 'Тест' }}
        component={BottomTabNavigator}
        options={{
          title: 'Тест',
        }}
      />
    </Drawer.Navigator>
  );
}
