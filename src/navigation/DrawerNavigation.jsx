import * as React from 'react';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import {
  View, Text, Dimensions, Pressable, StyleSheet, NativeModules, Image, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabNavigator from './BottomTabNavigator';
import CloseDrawer from '../Icons/CloseDrawer';
import GedzaBlack from '../Icons/GedzaBlack';
import VKIcon from '../Icons/VKIcon';

const { StatusBarManager } = NativeModules;

const WIDTH = Dimensions.get('window').width;
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: WIDTH,
        },
      }}
      drawerContent={(props) => (
        <SafeAreaView style={{
          marginTop: StatusBarManager.HEIGHT,
        }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 15,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          >
            <View style={styles.header_logo}>
              <GedzaBlack />
            </View>
            <Pressable onPress={() => props.navigation.closeDrawer()}>
              <CloseDrawer />
            </Pressable>
          </View>
          <DrawerItemList {...props} />
          <View style={{
            paddingTop: 5, paddingBottom: 25, paddingLeft: 15, paddingRight: 15,
          }}
          >
            <View style={{
              paddingTop: 10, paddingBottom: 10, paddingLeft: 15, flexDirection: 'row',
            }}
            >
              <Image
                source={require('../../assets/smartphone-call.png')}
                style={{ width: 25, height: 28, marginRight: 15 }}
              />
              <Text style={{ fontSize: 22 }} onPress={() => Linking.openURL('tel:+73472003004')}>8 (347) 200-30-04</Text>
            </View>
            <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
              <Text style={styles.drawer_adress_text}>ул. Набережная реки Уфы, д. 41</Text>
              <Text style={styles.drawer_adress_text}>ул. Проспект Октября, д. 49</Text>
              <Text style={styles.drawer_adress_text}>ул. Софьи Перовской, д. 42</Text>
              <Text style={styles.drawer_adress_text}>ул. Ульяновых, д. 31</Text>
              <Text style={styles.drawer_adress_text}>ул. Карла Маркса, д. 25</Text>
            </View>
            <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
              <Text style={{ fontSize: 16 }}>
                Время работы:
              </Text>
              <View style={{ marginTop: 3 }} />
              <Text style={{ fontSize: 16 }}>10:00 - 23:00</Text>
              <View style={{ marginTop: 3 }} />
              <Text style={{ fontSize: 16 }}>
                Заказы принимаются:
              </Text>
              <View style={{ marginTop: 3 }} />
              <Text style={{ fontSize: 16 }}>10:00 - 22:00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Pressable
                onPress={() => Linking.openURL('https://vk.com/gedzagroup')}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: '#4e4f4d',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VKIcon />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      )}
    >
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
        initialParams={{ params: 'Отзывы' }}
        component={BottomTabNavigator}
        options={{
          title: 'Отзывы',
        }}
      />
      <Drawer.Screen
        name="Test"
        initialParams={{ params: 'Доставка' }}
        component={BottomTabNavigator}
        options={{
          title: 'Доставка',
        }}
      />
      <Drawer.Screen
        name="Bonuses"
        initialParams={{ params: 'Бонусы' }}
        component={BottomTabNavigator}
        options={{
          title: 'Бонусы',
        }}
      />
      <Drawer.Screen
        name="Vacancy"
        initialParams={{ params: 'Вакансии' }}
        component={BottomTabNavigator}
        options={{
          title: 'Вакансии',
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header_logo: {
    marginLeft: WIDTH / 2 - 95,
  },
  drawer_adress_text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
