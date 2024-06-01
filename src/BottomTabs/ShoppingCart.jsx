/* eslint-disable no-trailing-spaces */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import IncreaseCount from '../Icons/IncreaseCount';
import DecreaseCount from '../Icons/DecreaseCount';
import GiftChoose from '../components/GiftChoose';
import GoBackButton from '../Icons/GoBackButton';

import {
  incrementQuantity,
  decrementQuantity,
  setGiftVisible,
} from '../Redux/CartReducer';
import GiftIcon from '../Icons/GiftIcon';

import { setCartFocus } from '../Redux/FocusReducer';
import Promocode from '../components/Promocode';
import normalizeCountForm from '../utils/functions';

function ShoppingCartScreen({ navigation }) {
  const user = useSelector((state) => state?.user.currentUser);
  const isFocused = useIsFocused();
  const cart = useSelector((state) => state.cart.cart);
  const additionalList = useSelector((state) => state.cart.additionalList);
  console.log(cart);

  const noAddCart = cart.filter(
    (thisitem) => !additionalList.find((item) => item.name === thisitem.name),
  );
  const fullcart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(setCartFocus(isFocused));
  }, [dispatch, isFocused]);
  const dispatch = useDispatch();
  const IncreaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const DecreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  return (
    <View>
      {cart.length === 0 && (
        <View style={styles.empty_cart}>
          <Text style={{ fontWeight: 700, fontSize: 27.2, marginBottom: 8 }}>
            Корзина пустая
          </Text>
          <Pressable
            style={styles.emptyCart_btn}
            onPress={() => navigation.jumpTo('Меню')}
          >
            <Text style={{ color: '#cf1c1d', fontSize: 16 }}>
              Вернуться к покупкам
            </Text>
          </Pressable>
        </View>
      )}
      {cart.length !== 0 && (
        <View>
          <GiftChoose />
          <ScrollView style={styles.container}>
            <View style={styles.cart_table}>
              <View style={styles.title_row}>
                <Pressable
                  style={{
                    width: 24, height: 24, justifyContent: 'center', alignItems: 'center',
                  }}
                  onPress={() => navigation.jumpTo('Меню')}
                >
                  <GoBackButton />
                </Pressable>
                <Text style={{ fontWeight: 700, fontSize: 24, flex: 0.7 }}>
                  Корзина
                </Text>
              </View>
              <View>
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
                      {!Object.prototype.hasOwnProperty.call(
                        cartitem,
                        'gift',
                      ) && (
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
                      {Object.prototype.hasOwnProperty.call(
                        cartitem,
                        'gift',
                      ) && (
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
            </View>
            <View>
              <View style={styles.cart_total}>
                <View style={styles.total_amount}>
                  <Text
                    style={{ fontSize: 18, fontWeight: 'bold', lineHeight: 27 }}
                  >
                    В корзине:
                    {' '}
                    {fullcart.count}
                    {' '}
                    {normalizeCountForm(fullcart.count, ['товар', 'товара', 'товаров'])}
                    {' '}
                    на
                    {' '}
                    {fullcart.total} 
                    {' '}
                    {'\u20BD'}
                  </Text>
                  {fullcart.promocodeStatus === 'activated' && (
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        lineHeight: 27,
                      }}
                    >
                      Скидка: 
                      {' '}
                      {fullcart.discountSize}
                      {' '}
                      %
                    </Text>
                  )}
                  <Text
                    style={{ fontSize: 18, fontWeight: 'bold', lineHeight: 27 }}
                  >
                    Итого:
                    {' '}
                    {fullcart.promocodeStatus === 'activated'
                      && Math.trunc(fullcart.total * ((100 - fullcart.discountSize) / 100))}
                    {fullcart.promocodeStatus !== 'activated' && fullcart.total}
                    {'\u20BD'}
                  </Text>
                </View>
              </View>
              <Promocode />
              <View style={styles.presentLine}>
                <View style={styles.gift_line}>
                  <GiftIcon />
                </View>
                {fullcart.total < 2000 && (
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontWeight: 'bold',
                      fontSize: 21,
                    }}
                  >
                    Добавьте товаров еще на
                    {' '}
                    <Text style={{ color: '#CF191C' }}>
                      {2000 - fullcart.total}
                      {'\u20BD'}
                    </Text>
                    {' '}
                    - и получите подарок!
                  </Text>
                )}
                {fullcart.total >= 2000 && (
                  <View>
                    {cart.find((item) => Object.prototype.hasOwnProperty.call(item, 'gift')) === undefined && (
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
                    {cart.find((item) => Object.prototype.hasOwnProperty.call(item, 'gift')) !== undefined && (
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
                      {cart.find((item) => Object.prototype.hasOwnProperty.call(item, 'gift')) === undefined && (
                        <Text style={{ color: '#cf1c1d' }}>
                          Выбрать подарок
                        </Text>
                      )}
                      {cart.find((item) => Object.prototype.hasOwnProperty.call(item, 'gift')) !== undefined && (
                        <Text style={{ color: '#cf1c1d' }}>Выбрать другой</Text>
                      )}
                    </Pressable>
                  </View>
                )}
              </View>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 24,
                  textAlign: 'center',
                  marginBottom: 10,
                }}
              >
                Добавить к заказу
              </Text>
              <View>
                {
                        additionalList.map((additionalItem) => (
                          <View style={styles.cartItem} key={additionalItem.id}>
                            <Image
                              source={{ uri: additionalItem.imageLink }}
                              style={styles.cartPhoto}
                            />
                            <View style={styles.cart_desc}>
                              <View style={styles.product_name}>
                                <Text style={{ fontSize: 18, fontWeight: 700 }}>{additionalItem.name}</Text>
                              </View>
                              {
                                !additionalItem.hasOwnProperty('gift') && (
                                  <View style={styles.cartProduct}>
                                    <View style={styles.icon_items}>
                                      <Pressable
                                        style={{
                                          height: 25, width: 25, backgroundColor: '#EEEEEE', borderRadius: 12.5, padding: 7,
                                        }}
                                        onPress={() => DecreaseQuantity(additionalItem)}
                                      >
                                        <DecreaseCount />
                                      </Pressable>
                                      {(cart.find((item) => item.name === additionalItem.name) === undefined) && <Text>0</Text> }
                                      {(cart.find((item) => item.name === additionalItem.name) !== undefined) && (
                                      <Text>
                                        {
                                        cart.find((item) => item.name === additionalItem.name).quantity
                                        }
                                      </Text>
                                      ) }
                                      <Pressable
                                        style={{
                                          height: 25, width: 25, backgroundColor: '#EEEEEE', borderRadius: 12.5, padding: 7,
                                        }}
                                        onPress={() => IncreaseQuantity(additionalItem)}
                                      >
                                        <IncreaseCount />
                                      </Pressable>
                                    </View>
                                    <Text style={styles.price}>
                                      {additionalItem.price}
                                      {'\u20BD'}
                                    </Text>
                                  </View>
                                )
                              }
                            </View>
                          </View>
                        ))
                    }
              </View>
              {user.logged === true
              && (
              <Pressable
                style={styles.proceed_next}
                onPress={() => navigation.navigate('Продолжение оформления')}
              >
                <Text style={styles.proceed_next_text}>К доставке и оплате</Text>
              </Pressable>
              )}
              {user.logged !== true
              && (
              <Pressable
                style={styles.proceed_next}
                onPress={() => navigation.jumpTo('Личный кабинет')}
              >
                <Text style={styles.proceed_next_text}>К доставке и оплате</Text>
              </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    height: '100%',
    backgroundColor: '#fff',
  },
  btn: {
    borderColor: 'red',
    borderRadius: 15,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    lineHeight: 32,
  },
  btn_text: {
    color: 'red',
    fontSize: 16,
  },
  cart_table: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  title_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
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
    width: 170,
    height: 74,
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
  cart_total: {
    marginTop: 20,
    width: '100%',
  },
  total_amount: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  gift_line: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  empty_cart: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCart_btn: {
    borderWidth: 1,
    borderColor: '#cf1c1d',
    borderRadius: 15,
    paddingRight: 16,
    paddingLeft: 16,
    lineHeight: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choose_gift_btn: {
    borderWidth: 2,
    borderColor: '#cf1c1d',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 100,
  },
  proceed_next: {
    marginTop: 20,
    backgroundColor: '#cf1c1d',
    borderRadius: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
  },
  proceed_next_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  promocode_block: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count_change_button: {
    height: 25,
    width: 25,
    backgroundColor: '#EEEEEE',
    borderRadius: 12.5,
    padding: 7,
  },
});

export default ShoppingCartScreen;
