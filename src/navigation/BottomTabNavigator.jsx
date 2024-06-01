/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import * as React from 'react';
import MaskInput from 'react-native-mask-input';
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
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm, Controller } from 'react-hook-form';
import Checkbox from 'expo-checkbox';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneNumberInput from '../components/PhoneNumberInput';
import ContactsScreen from '../BottomTabs/Contacts';
import BonusSlider from '../components/BonusSlider';
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
  setGiftVisible,
  spendBonuses,
  activatePromocode,
} from '../Redux/CartReducer';
import GedzaWhite from '../Icons/GedzaWhite';
import SideNavIcon from '../Icons/SideNavIcon';
import AccountIcon from '../Icons/AccountIcon';
import OrderListIcon from '../Icons/OrderListIcon';
import {
  exitUser, setUser, setUserOrderHistory, addtoUserList, login, register,
} from '../Redux/UserReducer';
import GiftChoose from '../components/GiftChoose';
import DecreaseCount from '../Icons/DecreaseCount';
import IncreaseCount from '../Icons/IncreaseCount';
import QuitIcon from '../Icons/QuitIcon';
import ArrowIcon from '../Icons/ArrowIcon';
import normalizeCountForm from '../utils/functions';

const { StatusBarManager } = NativeModules;

const WIDTH = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CartStack() {
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

const inputs = {
  contact_info: [
    {
      name: 'fullname',
      label: 'Имя',
      required: true,
    },
    {
      name: 'phone',
      label: 'Телефон',
      required: true,
    },
    {
      name: 'email',
      label: 'E-mail',
    },
  ],
  delivery_by_courier: [
    {
      name: 'street',
      label: 'Улица*',
      required: true,
    },
    {
      name: 'home',
      label: 'Дом*',
      required: true,
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
      label: 'Квартира/Офис*',
      required: true,
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
      defaultValue: '1',
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
  const user = useSelector((state) => state?.user.currentUser);
  const fullcart = useSelector((state) => state?.cart);
  const noAddCart = fullcart.cart;
  console.log(noAddCart);
  const [tab, setTab] = React.useState(0);
  const [tab2, setTab2] = React.useState(0);
  const [timeYes, setTimeYes] = React.useState(false);
  console.log(tab);
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
    dispatch(setUser({ ...user, ...values }));
  };

  const [date, setDate] = React.useState({
    time: new Date(),
    date: new Date(),
  });
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [pickup, setPickup] = React.useState('java');

  const onChange = (_, selectedDate) => {
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
            onPress={() => {
              setTab(1);
            }}
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
          <>
            {inputs.delivery_by_courier.map((input) => (
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
                  rules={{ required: input.required === true }}
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
            <Text>* — отмечены поля обязательные для заполнения</Text>
          </>
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
            <Text style={styles.label}>Со скольки приготовить сдачу?</Text>
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
                  defaultValue={input.defaultValue}
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

        {/* <Pressable
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
        </Pressable> */}
        {
          user.bonuses !== 0 && (
          <View>
            <Text style={{ padding: 20, borderWidth: 2 }}>
              Доступно бонусов для списания:
              {' '}
              {user.bonuses}
            </Text>
            <BonusSlider user={user} />
          </View>
          )
        }
        {
          user.bonuses === 0 && (
            <Text style={{ padding: 20, borderWidth: 2 }}>
              У вас нет бонусов для списания
            </Text>
          )
        }
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
              {normalizeCountForm(fullcart.count, ['товар', 'товара', 'товаров'])}
            </Text>
            {
              fullcart.spendBonuses || fullcart.spendBonuses !== 0 ? (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    lineHeight: 27,
                    textAlign: 'center',
                  }}
                >
                  Скидка:
                  {fullcart.promocodeStatus === 'activated' ? Math.trunc(fullcart.total * 0.2) + fullcart.spendBonuses : fullcart.spendBonuses}
                  {'\u20BD'}
                </Text>
              ) : (null)
            }
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
              {fullcart.promocodeStatus === 'activated'
                ? Math.trunc(fullcart.total * 0.8) - fullcart.spendBonuses
                : fullcart.total - fullcart.spendBonuses}
              {'\u20BD'}
            </Text>
          </View>
          <Pressable
            disabled={tab === 1 ? false : !isValid}
            style={({ pressed }) => [
              {
                width: '100%',
                backgroundColor: (tab === 1 || isValid) ? '#cf1c1d' : '#dedede',
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
                setUserOrderHistory(
                  {
                    time: moment().format('DD-MM-YYYY HH:mm:ss'),
                    cart: fullcart.cart,
                    total_amount:
                      fullcart.promocodeStatus === 'activated'
                        ? Math.trunc(fullcart.total * ((100 - fullcart.discountSize) / 100)) - fullcart.spendBonuses
                        : fullcart.total - fullcart.spendBonuses,
                    promocode: fullcart.promocodeStatus,
                    bonucesCount: fullcart.promocodeStatus === 'activated' ? Math.trunc((Math.trunc(fullcart.total * 0.8) - fullcart.spendBonuses) * 0.03)
                      : Math.trunc((fullcart.total - fullcart.spendBonuses) * 0.03),
                    spendBonus: fullcart.spendBonuses,
                  },
                ),
              );
              dispatch(activatePromocode('clean'));
              dispatch(setUser({}));
              dispatch(spendBonuses(0));
              dispatch(setCart([]));
              navigation.goBack();
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

function PersonalAccount() {
  console.log('RENDER OF PersonalAccount..');
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user.currentUser);
  console.log('Вызов!');
  console.log(user);

  const [open, setOpen] = React.useState(true);
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [orderOpen, setOrderOpen] = React.useState(false);
  const [orderOpenIndex, setOrderOpenIndex] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    dispatch(
      setUser({ ...user, birthday: moment(currentDate).format('DD.MM.YYYY') }),
    );
  };

  useEffect(() => {
    if (user.logged === true) {
      setOpen(false);
    } else if (user.logged === 'success_registration') {
      setIsLoginForm(true);
    }
  }, [user.logged]);

  const handleRegistration = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(register(user));
      setLoading(false);
    }, 1000);
  };

  const handleSaveProfile = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
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
      {open === true ? (
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
                  {isLoginForm ? 'Авторизация' : 'Регистрация'}
                </Text>
                {isLoginForm ? (
                  <>
                    <MaskInput
                      value={user?.phone?.slice(2)}
                      onChangeText={(_, unmasked) => {
                        console.log(unmasked);
                        dispatch(setUser({ phone: `+7${unmasked}` }));
                      }}
                      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
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
                      placeholderFillCharacter="0"
                    />
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
                      onChangeText={(text) => dispatch(setUser({ password: text }))}
                      value={user?.password}
                      secureTextEntry
                    />
                    {loading ? (
                      <ActivityIndicator color="red" size="small" />
                    ) : (
                      <Button
                        title="Войти"
                        disabled={!user?.phone || !user?.password}
                        onPress={() => {
                          setLoading(true);
                          setTimeout(() => {
                            dispatch(
                              login({
                                ...user,
                              }),
                            );
                            if (user.logged === true) {
                              setOpen(false);
                            }
                            setLoading(false);
                          }, 1000);
                        }}
                      />
                    )}
                    <Pressable onPress={() => setIsLoginForm(false)}>
                      <Text>Нет аккаунта? Зарегистрируйтесь!</Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    <MaskInput
                      value={user?.phone?.slice(2)}
                      onChangeText={(_, unmasked) => {
                        console.log(unmasked);
                        dispatch(setUser({ phone: `+7${unmasked}` }));
                      }}
                      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
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
                      placeholderFillCharacter="0"
                    />
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
                      onChangeText={(text) => dispatch(setUser({ fullname: text }))}
                      value={user?.fullname}
                    />
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
                      onChangeText={(text) => dispatch(setUser({ password: text }))}
                      value={user?.password}
                      secureTextEntry
                    />
                    {loading ? (
                      <ActivityIndicator color="red" size="small" />
                    ) : (
                      <Button
                        title="Регистрация"
                        disabled={
                          !user?.phone || !user?.password || !user?.fullname
                        }
                        onPress={handleRegistration}
                      />
                    )}
                    <Pressable onPress={() => setIsLoginForm(true)}>
                      <Text>Уже есть аккаунт? Войдите!</Text>
                    </Pressable>
                  </>
                )}
                {user.logged === 'error' && (
                  <Text>Введен неверный номер телефона или пароль!</Text>
                )}
                {user.logged === 'already_registered' && (
                <Text>Такой аккаунт уже существует!</Text>
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
                {user?.history?.slice().sort((a, b) => new Date(b.time) - new Date(a.time))?.map((item, index) => (
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
                          {`Начислено бонусов: ${item?.bonucesCount} \u20BD`}
                        </Text>
                        {item.spendBonuses !== 0 && (
                          <Text style={styles.accord_header}>
                            {`Списано бонусов: ${item?.spendBonus} \u20BD`}
                          </Text>
                        )}
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
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontWeight: '500',
                                marginBottom: 5,
                              }}
                            >
                              {`Количество: ${product?.quantity} шт.`}
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
                {`Всего заказов: ${user.history?.length}`}
              </Text>
            </SafeAreaView>
          </Modal>
          <Modal animationType="slide" transparent visible={open === 'edit'}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
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
                  Обновление данных
                </Text>
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
                    onChangeText={(text) => {
                      dispatch(setUser({ ...user, email: text }));
                    }}
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
                      onChangeText={() => dispatch(
                        setUser({
                          ...user,
                          birthday: moment(date).format('DD.MM.YYYY'),
                        }),
                      )}
                      value={user?.birthday}
                    />
                  </Pressable>
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
                    onChangeText={(text) => dispatch(setUser({ password: text }))}
                    value={user?.password}
                    secureTextEntry
                  />
                </>
                <Button
                  title="Сохранить"
                  onPress={handleSaveProfile}
                />
              </View>
            </View>
          </Modal>
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
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#cf1c1d',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  {user.bonuses ?? 0}
                </Text>
                <Text style={{ color: '#cf1c1d', fontWeight: 'bold' }}>
                  баллов
                </Text>
              </View>
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
                    dispatch(addtoUserList({ ...user }));
                    dispatch(exitUser());
                    setOpen(true);
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
        </>
      )}
    </View>
  );
}

export default function BottomTabNavigator(props) {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const isCartFocused = useSelector((state) => state.focus.isCartFocused);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalAmount());
  }, [cart, dispatch]);

  return (
    <Tab.Navigator
      initialRouteName="Меню"
      sceneContainerStyle={{ backgroundColor: '#fff', paddingTop: StatusBarManager.HEIGHT }}
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
        component={CartStack}
        options={{
          tabBarLabel: 'Корзина',
          tabBarIcon: () => <ShoppingCart />,
          tabBarBadge:
            isCartFocused || cart.length === 0
              ? undefined
              : cart.length,

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
        component={ContactsScreen}
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
