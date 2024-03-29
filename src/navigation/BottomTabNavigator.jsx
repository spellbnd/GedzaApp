import * as React from 'react';
import {
  Text, View, NativeModules, Dimensions, Pressable, StyleSheet,
} from 'react-native';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Catalog from '../BottomTabs/Catalog';
import MenuIcon from '../Icons/MenuIcon';
import ContactsIcon from '../Icons/ContactsIcon';
import ShoppingCart from '../Icons/ShoppingCart';
import ShoppingCartScreen from '../BottomTabs/ShoppingCart';
import { getTotalAmount } from '../Redux/CartReducer';
import GedzaWhite from '../Icons/GedzaWhite';
import SideNavIcon from '../Icons/SideNavIcon';
import Bonuses from '../BottomTabs/Bonuses';
import Vacancy from '../BottomTabs/Vacancy';
import AccountIcon from '../Icons/AccountIcon';
import OrderListIcon from '../Icons/OrderListIcon';
import Reviews from '../BottomTabs/Reviews';

const WIDTH = Dimensions.get('window').width;
const { StatusBarManager } = NativeModules;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator sceneContainerStyle={{ backgroundColor: 'blue' }} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Корзина" component={ShoppingCartScreen} />
      <Stack.Screen name="Продолжение оформления" component={SettingsScreenX} />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ width: '100%', paddingRight: 15, paddingLeft: 15 }}>
      <Text style={styles.contacts_text_header}>Контакты</Text>
      <Text style={styles.contacts_text}>+7(347)200-30-04</Text>
      <Text style={styles.contacts_text}>Режим работы</Text>
      <Text style={styles.contacts_text}>Ежидневно с 10:00 до 23:00</Text>
      <Text style={styles.contacts_text}>Заказы принимаем с 10:00 до 22:30</Text>
      <Text style={styles.contacts_text}>Точки самовывоза</Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Набережная реки Уфы, д. 41</Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Проспект Октября, д. 49</Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Софьи Перовской, д. 42</Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Ульяновых, д. 31</Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Карла Маркса, д. 25</Text>
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

function PersonalAccount() {
  return (
    <View style={{
      flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20,
    }}
    >
      <View style={{
        borderWidth: 1, width: '100%', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', padding: 30, borderColor: 'rgba(0,0,0, 0.25)', alignItems: 'center',
      }}
      >
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Дмитрий</Text>
          <Text>7 987 100 20 95</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#cf1c1d', fontSize: 20, fontWeight: 'bold' }}>485</Text>
          <Text style={{ color: '#cf1c1d', fontWeight: 'bold' }}>баллов</Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row', width: '100%', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.15)', alignItems: 'center', padding: 15,
      }}
      >
        <View style={{
          borderWidth: 1, borderColor: 'rgba(0,0,0,0.28)', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 20, width: 40, height: 40,
        }}
        >
          <OrderListIcon />
        </View>
        <View>
          <Text>Заказы</Text>
          <Text>Список заказов</Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row', width: '100%', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.15)', alignItems: 'center', padding: 15,
      }}
      >
        <View style={{
          borderWidth: 1, borderColor: 'rgba(0,0,0,0.28)', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 20, width: 40, height: 40,
        }}
        >
          <OrderListIcon />
        </View>
        <View>
          <Text>Профиль</Text>
          <Text>Просмотр и изменение личных данных</Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row', width: '100%', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.15)', alignItems: 'center', padding: 15,
      }}
      >
        <View style={{
          borderWidth: 1, borderColor: 'rgba(0,0,0,0.28)', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 20, width: 40, height: 40,
        }}
        >
          <OrderListIcon />
        </View>
        <View>
          <Text>Выйти</Text>
          <Text>Выход из личного кабинета</Text>
        </View>
      </View>
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
        component={MyStack}
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
      <Tab.Screen
        name="Бонусы"
        component={Bonuses}
        options={{
          tabBarlabel: 'Бонусы',
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
      <Tab.Screen
        name="Вакансии"
        component={Vacancy}
        options={{
          tabBarlabel: 'Вакансии',
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
      <Tab.Screen
        name="Отзывы"
        component={Reviews}
        options={{
          tabBarLabel: 'Отзывы',
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

const styles = StyleSheet.create({
  contacts_text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  contacts_text_header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 35,
  },
});
