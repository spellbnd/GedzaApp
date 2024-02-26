import * as React from 'react';
import {
  Text, View, NativeModules, Dimensions, Pressable,
} from 'react-native';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Catalog from '../BottomTabs/Catalog';
import MenuIcon from '../Icons/MenuIcon';
import ContactsIcon from '../Icons/ContactsIcon';
import ShoppingCart from '../Icons/ShoppingCart';
import ShoppingCartScreen from '../BottomTabs/ShoppingCart';
import { getTotalAmount } from '../Redux/CartReducer';
import GedzaWhite from '../Icons/GedzaWhite';
import SideNavIcon from '../Icons/SideNavIcon';

const WIDTH = Dimensions.get('window').width;
const { StatusBarManager } = NativeModules;

const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function SettingsScreenX() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings CONTACTS!!</Text>
      </View>
    );
  }

export default function BottomTabNavigator(props) {
  const navigation = useNavigation();
  console.log(props);
  const cart = useSelector((state) => state.cart.cart);
  const isCartFocused = useSelector((state) => state.focus.isCartFocused);
  const testx = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalAmount());
  }, [cart, dispatch]);
  return (
    <Tab.Navigator
      initialRouteName={props.route && props.route.params && props.route.params.params ? props.route.params.params : 'Меню'}
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      screenOptions={{ headerShown: true, tabBarActiveTintColor: 'tomato' }}
    >
      <Tab.Screen
        name="Меню"
        component={Catalog}
        options={{
          title: 'Меню',
          tabBarIcon: () => <MenuIcon />,
          header: () => (
            <View style={{
              width: '100%', height: 45, flexDirection: 'row', backgroundColor: '#252525', marginTop: StatusBarManager.HEIGHT, paddingLeft: 15, paddingRight: 15, alignItems: 'center',
            }}
            >
              <Pressable style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => props.navigation.openDrawer()}>
                <SideNavIcon />
              </Pressable>
              <View style={{ marginLeft: WIDTH / 2 - 110 }}>
                <GedzaWhite width={140} height={29} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Корзина"
        component={ShoppingCartScreen}
        options={{
          tabBarLabel: 'Корзина',
          tabBarIcon: () => <ShoppingCart />,
          tabBarBadge: (isCartFocused || testx.total === 0) ? undefined : testx.total,

          header: () => (
            <View style={{
              width: '100%', height: 45, flexDirection: 'row', backgroundColor: '#252525', marginTop: StatusBarManager.HEIGHT, paddingLeft: 15, paddingRight: 15, alignItems: 'center',
            }}
            >
              <Pressable style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => navigation.openDrawer()}>
                <SideNavIcon />
              </Pressable>
              <View style={{ marginLeft: WIDTH / 2 - 110 }}>
                <GedzaWhite width={140} height={29} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Контакты"
        component={SettingsScreen}
        options={{
          tabBarlabel: 'Контакты',
          tabBarIcon: () => <ContactsIcon />,
          header: () => (
            <View style={{
              width: '100%', height: 45, flexDirection: 'row', backgroundColor: '#252525', marginTop: StatusBarManager.HEIGHT, paddingLeft: 15, paddingRight: 15, alignItems: 'center',
            }}
            >
              <Pressable style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => navigation.openDrawer()}>
                <SideNavIcon />
              </Pressable>
              <View style={{ marginLeft: WIDTH / 2 - 110 }}>
                <GedzaWhite width={140} height={29} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Тест"
        component={SettingsScreenX}
        options={{
          tabBarlabel: 'Тест',
          tabBarIcon: () => <ContactsIcon />,
          header: () => (
            <View style={{
              width: '100%', height: 45, flexDirection: 'row', backgroundColor: '#252525', marginTop: StatusBarManager.HEIGHT, paddingLeft: 15, paddingRight: 15, alignItems: 'center',
            }}
            >
              <Pressable style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => navigation.openDrawer()}>
                <SideNavIcon />
              </Pressable>
              <View style={{ marginLeft: WIDTH / 2 - 110 }}>
                <GedzaWhite width={140} height={29} />
              </View>
            </View>
          ),
          tabBarButton: () => undefined,
        }}
      />
    </Tab.Navigator>
  );
}
