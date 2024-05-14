/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  Button,
  NativeModules,
  ActivityIndicator,
  Modal,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm, Controller } from 'react-hook-form';
import Checkbox from 'expo-checkbox';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Catalog from '../BottomTabs/Catalog';
import MenuIcon from '../Icons/MenuIcon';
import ContactsIcon from '../Icons/ContactsIcon';
import ShoppingCart from '../Icons/ShoppingCart';
import ShoppingCartScreen from '../BottomTabs/ShoppingCart';
import {
  decrementQuantity,
  getTotalAmount,
  incrementQuantity,
  setCart,
  setCartHistory,
  setGiftVisible,
} from '../Redux/CartReducer';
import GedzaWhite from '../Icons/GedzaWhite';
import SideNavIcon from '../Icons/SideNavIcon';
import AccountIcon from '../Icons/AccountIcon';
import OrderListIcon from '../Icons/OrderListIcon';
import { setUser } from '../Redux/UserReducer';
import GiftChoose from '../components/GiftChoose';
import DecreaseCount from '../Icons/DecreaseCount';
import IncreaseCount from '../Icons/IncreaseCount';
import QuitIcon from '../Icons/QuitIcon';
import ArrowIcon from '../Icons/ArrowIcon';

const { StatusBarManager } = NativeModules;

const WIDTH = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      sceneContainerStyle={{ backgroundColor: 'blue' }}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Cart" component={ShoppingCartScreen} />
      <Stack.Screen name="Продолжение оформления" component={MakingOrder} />
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
      <Text style={styles.contacts_text}>
        Заказы принимаем с 10:00 до 22:30
      </Text>
      <Text style={styles.contacts_text}>Точки самовывоза</Text>
      <Text style={styles.contacts_text}>
        г.Уфа ул. Набережная реки Уфы, д. 41
      </Text>
      <Text style={styles.contacts_text}>
        г.Уфа ул. Проспект Октября, д. 49
      </Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Софьи Перовской, д. 42</Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Ульяновых, д. 31</Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Карла Маркса, д. 25</Text>
    </View>
  );
}

const inputs = {
  contact_info: [
    {
      name: 'fullname',
      label: 'Имя',
    },
    {
      name: 'phone',
      label: 'Телефон',
    },
    {
      name: 'email',
      label: 'E-mail',
    },
  ],
  delivery_by_courier: [
    {
      name: 'street',
      label: 'Улица',
    },
    {
      name: 'home',
      label: 'Дом',
    },
    {
      name: 'entrance',
      label: 'Подъезд',
    },
    {
      name: 'floor',
      label: 'Этаж',
    },
    {
      name: 'delivery_apartment',
      label: 'Квартира/Офис',
    },
    {
      name: 'delivery_domofon',
      label: 'Код двери/Домофон',
    },
  ],
  pickup: [
    {
      name: 'takeaway_terminal',
      label: 'Пункт самовывоза',
    },
  ],
  order_date: [
    {
      name: 'order_date',
      label: 'Дата заказа',
    },
    {
      name: 'order_time',
      label: 'Время заказа',
    },
  ],
  payment_method: [
    {
      name: 'person_count',
      label: 'Количество персон',
    },
    {
      name: 'confirm_comment',
      label: 'Комментарий к заказу',
      line: 3,
    },
  ],
};

function MakingOrder() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const fullcart = useSelector((state) => state?.cart);
  const additionalList = useSelector((state) => state.cart.additionalList);
  const noAddCart = fullcart.cart;
  console.log(noAddCart);
  const [tab, setTab] = React.useState(0);
  const [tab2, setTab2] = React.useState(0);
  const [timeYes, setTimeYes] = React.useState(false);
  const IncreaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const DecreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullname: user?.fullname,
      phone: user?.phone,
      email: user?.email,
      street: user?.street,
      home: user?.home,
      entrance: user?.entrance,
      floor: user?.floor,
      delivery_apartment: user?.delivery_apartment,
      delivery_domofon: user?.delivery_domofon,
      takeaway_terminal: user?.takeaway_terminal,
    },
  });

  const onSubmit = (values) => {
    if (user?.id) {
      dispatch(setUser({ ...user, ...values }));
    } else {
      dispatch(
        setUser({
          ...user,
          ...values,
          id: Math.random() * 60,
          password: '12345',
        }),
      );
    }
  };

  const [date, setDate] = React.useState({
    time: new Date(),
    date: new Date(),
  });
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [pickup, setPickup] = React.useState('java');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate({ ...date, [mode]: currentDate });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.contact_info}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '500',
            marginTop: 10,
          }}
        >
          Контактная информация
        </Text>
        {inputs.contact_info.map((input) => (
          <View key={input.name}>
            <Text
              style={[
                styles.label,
                errors[input.name] ? { color: '#f50' } : {},
              ]}
            >
              {input.label}
            </Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={[
                    styles.input,
                    errors[input.name] ? { borderColor: '#f50' } : {},
                  ]}
                  placeholder={input.label}
                  placeholderTextColor={
                    errors[input.name] ? '#f50' : 'rgba(0, 66, 105, 0.28)'
                  }
                />
              )}
              name={input.name}
            />
          </View>
        ))}

        <View style={styles.row}>
          <Pressable
            onPress={() => setTab(0)}
            style={[
              styles.tab_btn,
              { marginRight: 5 },
              tab === 0 ? styles.tab_btn_active : {},
            ]}
          >
            <Text
              style={[styles.tab_text, tab === 0 ? styles.tab_active_text : {}]}
            >
              Доставка курьером
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTab(1)}
            style={[styles.tab_btn, tab === 1 ? styles.tab_btn_active : {}]}
          >
            <Text
              style={[styles.tab_text, tab === 1 ? styles.tab_active_text : {}]}
            >
              Самовывоз
            </Text>
          </Pressable>
        </View>
        {tab === 0 ? (
          inputs.delivery_by_courier.map((input) => (
            <View key={input.name}>
              <Text
                style={[
                  styles.label,
                  errors[input.name] ? { color: '#f50' } : {},
                ]}
              >
                {input.label}
              </Text>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[
                      styles.input,
                      errors[input.name] ? { borderColor: '#f50' } : {},
                    ]}
                    placeholder={input.label}
                    placeholderTextColor={
                      errors[input.name] ? '#f50' : 'rgba(0, 66, 105, 0.28)'
                    }
                  />
                )}
                name={input.name}
              />
            </View>
          ))
        ) : (
          <>
            {inputs.pickup.map((input) => (
              <View key={input.name}>
                <Text
                  style={[
                    styles.label,
                    errors[input.name] ? { color: '#f50' } : {},
                  ]}
                >
                  {input.label}
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    height: 70,
                    padding: 8,
                    borderColor: 'rgba(0, 66, 105, 0.28)',
                  }}
                >
                  <Picker
                    mode="dropdown"
                    selectedValue={pickup}
                    onValueChange={(itemValue, itemIndex) => setPickup(itemValue)}
                    style={{ borderWidth: 1, borderColor: '#000' }}
                  >
                    <Picker.Item
                      label="г. Уфа ул. Набережная реки Уфы, д. 41"
                      value="г. Уфа ул. Набережная реки Уфы, д. 41"
                    />
                    <Picker.Item
                      label="г. Уфа ул. Проспект Октября, д. 49"
                      value="г. Уфа ул. Проспект Октября, д. 49"
                    />
                    <Picker.Item
                      label="г. Уфа ул. Софьи Перовской, д. 42"
                      value="г. Уфа ул. Софьи Перовской, д. 42"
                    />
                    <Picker.Item
                      label="г. Уфа ул. Ульяновых, д. 31"
                      value="г. Уфа ул. Ульяновых, д. 31"
                    />
                    <Picker.Item
                      label="г. Уфа ул. Карла Маркса, д. 25"
                      value="г. Уфа ул. Карла Маркса, д. 25"
                    />
                  </Picker>
                </View>
              </View>
            ))}
            <View style={styles.checkbox}>
              <Checkbox
                onValueChange={(bool) => setTimeYes(bool)}
                value={timeYes}
                style={{ marginRight: 5 }}
                color="#cf1c1d"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                }}
                onPress={() => setTimeYes((bool) => !bool)}
              >
                Предзаказ ко времени
              </Text>
            </View>
            {timeYes ? (
              <View>
                <Text style={styles.label}>Дата заказа</Text>
                <Pressable
                  style={[styles.input, { marginVertical: 10 }]}
                  onPress={showDatepicker}
                >
                  <Text style={{ color: '#000', fontSize: 14 }}>
                    {moment(date.time).format('DD.MM.YYYY')}
                  </Text>
                </Pressable>
                <Pressable style={styles.input} onPress={showTimepicker}>
                  <Text style={{ color: '#000', fontSize: 14 }}>
                    {moment(date.time).format('HH:mm')}
                  </Text>
                </Pressable>
                {show && (
                  <DateTimePicker
                    value={date[mode]}
                    mode={mode}
                    is24Hour
                    onChange={onChange}
                  />
                )}
              </View>
            ) : null}
          </>
        )}
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '500',
            marginTop: 10,
          }}
        >
          Способ оплаты
        </Text>
        <View style={styles.row}>
          <Pressable
            onPress={() => setTab2(0)}
            style={[
              styles.tab_btn,
              { marginRight: 5 },
              tab2 === 0 ? styles.tab_btn_active : {},
            ]}
          >
            <Text
              style={[
                styles.tab_text,
                tab2 === 0 ? styles.tab_active_text : {},
              ]}
            >
              Наличные
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTab2(1)}
            style={[
              styles.tab_btn,
              { marginRight: 5 },
              tab2 === 1 ? styles.tab_btn_active : {},
            ]}
          >
            <Text
              style={[
                styles.tab_text,
                tab2 === 1 ? styles.tab_active_text : {},
              ]}
            >
              По карте
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTab2(2)}
            style={[styles.tab_btn, tab2 === 2 ? styles.tab_btn_active : {}]}
          >
            <Text
              style={[
                styles.tab_text,
                tab2 === 2 ? styles.tab_active_text : {},
              ]}
            >
              Онлайн
            </Text>
          </Pressable>
        </View>
        {tab2 === 0 ? (
          <View>
            <Text style={styles.label}>Сколько нужно приготовить сдачу?</Text>
            <TextInput
              style={styles.input}
              placeholder={'\u20BD'}
              placeholderTextColor="rgba(0, 66, 105, 0.28)"
            />
          </View>
        ) : null}
        {inputs.payment_method.map((input) => (
          <View key={input.name}>
            <Text
              style={[
                styles.label,
                errors[input.name] ? { color: '#f50' } : {},
              ]}
            >
              {input.label}
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  multiline={!!input.line}
                  numberOfLines={input.line}
                  textAlignVertical={input.line ? 'top' : 'center'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={[
                    styles.input,
                    errors[input.name] ? { borderColor: '#f50' } : {},
                    input.line ? { height: 'auto' } : {},
                  ]}
                  placeholder={input.label}
                  placeholderTextColor={
                    errors[input.name] ? '#f50' : 'rgba(0, 66, 105, 0.28)'
                  }
                />
              )}
              name={input.name}
            />
          </View>
        ))}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={({ pressed }) => [
            styles.choose_gift_btn,
            pressed ? { transform: [{ scale: 0.98 }] } : {},
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#000',
            }}
          >
            Сохранить данные
          </Text>
        </Pressable>
      </View>
      <GiftChoose />
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4F4F7',
          padding: 20,
          textAlign: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '500',
            marginBottom: 20,
          }}
        >
          Оформление заказа
        </Text>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 4,
            marginBottom: 10,
          }}
        >
          {noAddCart?.map((cartitem) => (
            <View style={styles.cartItem} key={cartitem.id}>
              <Image
                source={{ uri: cartitem.imageLink }}
                style={styles.cartPhoto}
              />
              <View style={styles.cart_desc}>
                <View style={styles.product_name}>
                  <Text style={{ fontSize: 18, fontWeight: 700 }}>
                    {cartitem.name}
                  </Text>
                </View>
                {!Object.prototype.hasOwnProperty.call(cartitem, 'gift') && (
                  <View style={styles.cartProduct}>
                    <View style={styles.icon_items}>
                      <Pressable
                        style={{
                          height: 32,
                          width: 32,
                          backgroundColor: '#EEEEEE',
                          borderRadius: 16,
                          padding: 10,
                        }}
                        onPress={() => DecreaseQuantity(cartitem)}
                      >
                        <DecreaseCount />
                      </Pressable>
                      <Text>{cartitem.quantity}</Text>
                      <Pressable
                        style={{
                          height: 32,
                          width: 32,
                          backgroundColor: '#EEEEEE',
                          borderRadius: 16,
                          padding: 10,
                        }}
                        onPress={() => IncreaseQuantity(cartitem)}
                      >
                        <IncreaseCount />
                      </Pressable>
                    </View>
                    <Text style={styles.price}>
                      {cartitem.price}
                      {'\u20BD'}
                    </Text>
                  </View>
                )}
                {Object.prototype.hasOwnProperty.call(cartitem, 'gift') && (
                  <View style={styles.cartProduct}>
                    <View style={styles.icon_items}>
                      <Text>{cartitem.quantity}</Text>
                    </View>
                    <Text style={styles.price}>
                      {cartitem.price}
                      {'\u20BD'}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.cart_total}>
          <View style={styles.total_amount}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                lineHeight: 27,
                textAlign: 'center',
              }}
            >
              В корзине:
              {fullcart.count}
              {' '}
              товаров
              {'\n'}
              На
              {' '}
              {fullcart.total}
              {' '}
              {'\u20BD'}
            </Text>
            {fullcart.activatedPromocode === true && (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  lineHeight: 27,
                }}
              >
                Скидка: 20%
              </Text>
            )}
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                lineHeight: 27,
                textAlign: 'center',
              }}
            >
              Итого:
              {' '}
              {fullcart.activatedPromocode === true
                ? Math.trunc(fullcart.total * 0.8)
                : fullcart.total}
              {'\u20BD'}
            </Text>
          </View>
          <Pressable
            disabled={!isValid}
            style={({ pressed }) => [
              {
                width: '100%',
                backgroundColor: isValid ? '#cf1c1d' : '#dedede',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                marginTop: 10,
              },
              pressed ? { transform: [{ scale: 0.98 }] } : {},
            ]}
            onPress={() => {
              dispatch(
                setCartHistory([
                  ...fullcart.history,
                  {
                    time: moment().format('DD-MM-YYYY HH:MM:SS'),
                    cart: fullcart.cart,
                    total_amount:
                      fullcart.activatedPromocode === true
                        ? Math.trunc(fullcart.total * 0.8)
                        : fullcart.total,
                    promocode: fullcart.activatedPromocode,
                  },
                ]),
              );
              dispatch(setCart([]));
              navigation.navigate('Личный кабинет');
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
              }}
            >
              Оформить заказ
            </Text>
          </Pressable>
        </View>
        {fullcart.total >= 2000 && (
          <View style={styles.cart_total}>
            <View>
              {fullcart.cart.find((item) => Object.prototype.hasOwnProperty.call(item, 'gift')) === undefined && (
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 21,
                  }}
                >
                  Выберите подарок
                </Text>
              )}
              {fullcart.cart.find((item) => Object.prototype.hasOwnProperty.call(item, 'gift')) !== undefined && (
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 21,
                  }}
                >
                  Подарок в корзине
                </Text>
              )}
              <Pressable
                style={styles.choose_gift_btn}
                onPress={() => dispatch(setGiftVisible(true))}
              >
                {fullcart.cart.find((item) => Object.prototype.hasOwnProperty.call(item, 'gift')) === undefined && (
                  <Text style={{ color: '#cf1c1d' }}>Выбрать подарок</Text>
                )}
                {fullcart.cart.find((item) => Object.prototype.hasOwnProperty.call(item, 'gift')) !== undefined && (
                  <Text style={{ color: '#cf1c1d' }}>Выбрать другой</Text>
                )}
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const { height } = Dimensions.get('window');

function PersonalAccount() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const fullcart = useSelector((state) => state?.cart);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [orderOpen, setOrderOpen] = React.useState(false);
  const [orderOpenIndex, setOrderOpenIndex] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    dispatch(
      setUser({ ...user, birthday: moment(currentDate).format('DD.MM.YYYY') }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
      }}
    >
      {open ? (
        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%' }}
          behavior={Platform.OS === 'ios' ? 'position' : undefined}
        >
          <ScrollView
            style={{
              flex: 1,
              width: '100%',
            }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Pressable
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                onPress={() => setOpen(false)}
              />
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  padding: 16,
                  zIndex: 3,
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: '#000',
                    fontWeight: '500',
                    marginBottom: 20,
                  }}
                >
                  {open === 'edit' ? 'Обновление данных' : 'Авторизация'}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '400',
                  }}
                >
                  Имя
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: '#dedede',
                    marginVertical: 10,
                    paddingHorizontal: 8,
                    fontSize: 18,
                    color: '#000',
                    height: 40,
                  }}
                  placeholder="Имя"
                  returnKeyType="next"
                  placeholderTextColor="#dedede"
                  onChangeText={(text) => dispatch(setUser({ ...user, fullname: text }))}
                  value={user?.fullname}
                />
                {open === 'edit' ? (
                  <>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: '400',
                      }}
                    >
                      Email
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: '#dedede',
                        marginVertical: 10,
                        paddingHorizontal: 8,
                        fontSize: 18,
                        color: '#000',
                        height: 40,
                      }}
                      placeholder="Email"
                      returnKeyType="next"
                      placeholderTextColor="#dedede"
                      onChangeText={(text) => dispatch(setUser({ ...user, email: text }))}
                      value={user?.email}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: '400',
                      }}
                    >
                      День рождения
                    </Text>
                    {show && (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        is24Hour
                        onChange={onChange}
                      />
                    )}
                    <Pressable onPressIn={() => setShow(true)}>
                      <TextInput
                        style={{
                          borderWidth: 1,
                          borderRadius: 4,
                          borderColor: '#dedede',
                          marginVertical: 10,
                          paddingHorizontal: 8,
                          fontSize: 18,
                          color: '#000',
                          height: 40,
                          pointerEvents: 'none',
                        }}
                        placeholder="День рождения"
                        returnKeyType="next"
                        editable={false}
                        placeholderTextColor="#dedede"
                        onChangeText={(text) => dispatch(
                          setUser({
                            ...user,
                            birthday: moment(date).format('DD.MM.YYYY'),
                          }),
                        )}
                        value={user?.birthday}
                      />
                    </Pressable>
                  </>
                ) : null}

                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '400',
                  }}
                >
                  Телефон
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: '#dedede',
                    marginVertical: 10,
                    paddingHorizontal: 8,
                    fontSize: 18,
                    color: '#000',
                    height: 40,
                  }}
                  placeholder="Телефон"
                  returnKeyType="next"
                  placeholderTextColor="#dedede"
                  onChangeText={(text) => dispatch(setUser({ ...user, phone: text }))}
                  value={user?.phone}
                  keyboardType="phone-pad"
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '400',
                  }}
                >
                  Пароль
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: '#dedede',
                    marginVertical: 10,
                    paddingHorizontal: 8,
                    fontSize: 18,
                    height: 40,
                    color: '#000',
                  }}
                  placeholder="Пароль"
                  placeholderTextColor="#dedede"
                  returnKeyType="go"
                  onChangeText={(text) => dispatch(setUser({ ...user, password: text }))}
                  value={user?.password}
                  secureTextEntry
                />
                {loading ? (
                  <ActivityIndicator color="red" size="small" />
                ) : (
                  <Button
                    title={open === 'edit' ? 'Сохранить' : 'Логин'}
                    disabled={
                      !user?.fullname || !user?.password || !user?.phone
                    }
                    onPress={() => {
                      setLoading(true);
                      setTimeout(() => {
                        dispatch(
                          setUser({
                            ...user,
                            id: Math.random() * 600,
                          }),
                        );
                        setOpen(false);
                        setLoading(false);
                      }, 1000);
                    }}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <>
          <Modal animationType="slide" transparent visible={orderOpen}>
            <SafeAreaView
              style={{
                padding: 16,
                paddingTop: StatusBarManager.HEIGHT,
                flex: 1,
                backgroundColor: 'rgba(255,255,255,1)',
              }}
            >
              <Pressable
                style={{
                  marginBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => setOrderOpen(false)}
              >
                <QuitIcon fill="#000" />
                <Text
                  style={{
                    color: '#000',
                    fontSize: 22,
                    fontWeight: '500',
                    textAlign: 'center',
                    flex: 1,
                  }}
                >
                  История заказов
                </Text>
              </Pressable>
              <ScrollView
                showsVerticalScrollIndicator={false}
                onScrollEndDrag={({ nativeEvent }) => {
                  if (nativeEvent.contentOffset.y < -50) {
                    setOrderOpen(false);
                  }
                }}
                nestedScrollEnabled
                scrollEventThrottle={16}
              >
                {fullcart?.history?.map((item, index) => (
                  <View key={item?.time}>
                    <Pressable
                      onPress={() => setOrderOpenIndex(
                        orderOpenIndex === index ? null : index,
                      )}
                      style={({ pressed }) => [
                        {
                          backgroundColor: '#cf1c1d',
                          marginBottom: 10,
                          padding: 10,
                          borderRadius: 8,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        },
                        pressed ? { transform: [{ scale: 0.98 }] } : {},
                      ]}
                    >
                      <View>
                        <Text style={styles.accord_header}>
                          {`Время заказа: ${item?.time}`}
                        </Text>
                        <Text style={styles.accord_header}>
                          {`Общая сумма: ${item?.total_amount} \u20BD`}
                        </Text>
                        <Text style={styles.accord_header}>
                          {`Бонус: ${((item?.total_amount || 1) * 0.03).toFixed(
                            2,
                          )} \u20BD`}
                        </Text>
                        <Text style={styles.accord_header}>
                          {`Промокод: ${item?.promocode ? 'Да' : 'Нет'}`}
                        </Text>
                      </View>
                      <View
                        style={{
                          transform: [
                            {
                              rotate:
                                orderOpenIndex === index ? '180deg' : '0deg',
                            },
                          ],
                        }}
                      >
                        <ArrowIcon fill="#fff" />
                      </View>
                    </Pressable>
                    {orderOpenIndex === index ? (
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {item?.cart?.map((product) => (
                          <View
                            key={product?.id}
                            style={{
                              width: '48%',
                              marginHorizontal: '1%',
                              marginVertical: 10,
                              backgroundColor: '#cf1c1c6a',
                              padding: 6,
                              borderRadius: 4,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontWeight: '500',
                                marginBottom: 5,
                              }}
                            >
                              {product?.name}
                            </Text>
                            <Image
                              source={{ uri: product.imageLink }}
                              style={{
                                width: '100%',
                                height: 120,
                                resizeMode: 'cover',
                                borderRadius: 8,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontWeight: '500',
                                marginBottom: 5,
                              }}
                            >
                              {`Цена: ${product?.price} \u20BD`}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                ))}
              </ScrollView>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '500',
                }}
              >
                {`Всего заказов: ${fullcart.history?.length}`}
              </Text>
            </SafeAreaView>
          </Modal>
          {user?.id ? (
            <>
              <View
                style={{
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 30,
                  borderColor: 'rgba(0,0,0, 0.25)',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                    {user?.fullname}
                  </Text>
                  <Text>{user?.phone}</Text>
                </View>
                {(fullcart.history?.reduce(
                  (acc, obj) => acc + obj.total_amount,
                  0,
                ) || 0) * 0.03 ? (
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        color: '#cf1c1d',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      {(
                        (fullcart.history?.reduce(
                          (acc, obj) => acc + obj.total_amount,
                          0,
                        ) || 0) * 0.03
                      ).toFixed(2)}
                    </Text>
                    <Text style={{ color: '#cf1c1d', fontWeight: 'bold' }}>
                      баллов
                    </Text>
                  </View>
                  ) : null}
              </View>
              <Pressable
                onPress={() => setOrderOpen(true)}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0,0,0,0.15)',
                  alignItems: 'center',
                  padding: 15,
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.28)',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 20,
                    width: 40,
                    height: 40,
                  }}
                >
                  <OrderListIcon />
                </View>
                <View>
                  <Text>Заказы</Text>
                  <Text>Список заказов</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setOpen('edit')}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0,0,0,0.15)',
                  alignItems: 'center',
                  padding: 15,
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.28)',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 20,
                    width: 40,
                    height: 40,
                  }}
                >
                  <AccountIcon />
                </View>
                <View>
                  <Text>Профиль</Text>
                  <Text>Просмотр и изменение личных данных</Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0,0,0,0.15)',
                  alignItems: 'center',
                  padding: 15,
                }}
                onPress={() => Alert.alert('Хотите выйти из аккаунта ?', '', [
                  {
                    text: 'Выйти',
                    onPress: () => {
                      dispatch(setUser({}));
                      AsyncStorage.clear();
                      dispatch(setCartHistory([]));
                      dispatch(setCart([]));
                    },
                  },
                  {
                    text: 'Нет',
                  },
                ])}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.28)',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 20,
                    width: 40,
                    height: 40,
                  }}
                >
                  <QuitIcon />
                </View>
                <View>
                  <Text>Выйти</Text>
                  <Text>Выход из личного кабинета</Text>
                </View>
              </Pressable>
            </>
          ) : (
            <>
              <Text
                style={{
                  color: '#000',
                  fontSize: 22,
                }}
              >
                Вы должны зарегистрироваться !
              </Text>
              <View
                style={{
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.28)',
                  borderRadius: 10,
                  width: '100%',
                }}
              >
                <Button title="Войти" onPress={() => setOpen(true)} />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
}

export default function BottomTabNavigator(props) {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const isCartFocused = useSelector((state) => state.focus.isCartFocused);
  const testx = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalAmount());
  }, [cart, dispatch]);

  return (
    <Tab.Navigator
      initialRouteName="Меню"
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: 'tomato',
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Меню"
        component={Catalog}
        options={{
          title: 'Меню',
          tabBarIcon: () => <MenuIcon />,
          header: () => (
            <View
              style={{
                width: '100%',
                height: 45,
                flexDirection: 'row',
                backgroundColor: '#252525',
                paddingLeft: 15,
                paddingRight: 15,
                alignItems: 'center',
              }}
            >
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => props?.navigation.openDrawer()}
              >
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
          tabBarBadge:
            isCartFocused || testx.cart?.length === 0
              ? undefined
              : testx.cart?.length,

          header: () => (
            <View
              style={{
                width: '100%',
                height: 45,
                flexDirection: 'row',
                backgroundColor: '#252525',
                paddingLeft: 15,
                paddingRight: 15,
                alignItems: 'center',
              }}
            >
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => navigation.openDrawer()}
              >
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
            <View
              style={{
                width: '100%',
                height: 45,
                flexDirection: 'row',
                backgroundColor: '#252525',
                paddingLeft: 15,
                paddingRight: 15,
                alignItems: 'center',
              }}
            >
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => navigation.openDrawer()}
              >
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
        name="Личный кабинет"
        component={PersonalAccount}
        options={{
          tabBarLabel: 'Личный кабинет',
          tabBarIcon: () => <AccountIcon />,
          header: () => (
            <View
              style={{
                width: '100%',
                height: 45,
                flexDirection: 'row',
                backgroundColor: '#252525',
                paddingLeft: 15,
                paddingRight: 15,
                alignItems: 'center',
              }}
            >
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => navigation.openDrawer()}
              >
                <SideNavIcon />
              </Pressable>
              <View style={{ marginLeft: WIDTH / 2 - 110 }}>
                <GedzaWhite width={140} height={29} />
              </View>
            </View>
          ),
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
  accord_header: {
    color: '#fff',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tab_btn: {
    flex: 0.5,
    borderColor: '#cf1c1d',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
  tab_btn_active: {
    backgroundColor: '#cf1c1d',
  },
  tab_text: {
    color: '#cf1c1d',
    fontSize: 16,
    textAlign: 'center',
  },
  tab_active_text: {
    color: '#fff',
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 8,
    borderColor: 'rgba(0, 66, 105, 0.28)',
    color: '#000',
    fontSize: 14,
  },
  contact_info: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  contacts_text_header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  cart_total: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  total_amount: {
    alignItems: 'center',
  },
  choose_gift_btn: {
    borderWidth: 2,
    borderColor: '#cf1c1d',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 100,
  },
  cartItem: {
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  cart_desc: {
    flex: 1,
    width: '100%',
  },
  cartPhoto: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
  },
  product_name: {
    paddingTop: 10,
    paddingRight: 10,
  },
  cartProduct: {
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon_items: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
  },
  price: {
    marginLeft: 10,
  },
  presentLine: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    rowGap: 12,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
