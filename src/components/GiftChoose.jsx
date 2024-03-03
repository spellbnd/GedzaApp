import React from 'react';
import {
  View, Text, StyleSheet, Dimensions, Pressable, Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import giftList from '../data/gift.json';
import CrossGiftIcon from '../Icons/CrossGiftIcon';

import { setGiftVisible, addToCart, removeFromCart } from '../Redux/CartReducer';

const WIDTH = Dimensions.get('window').width;

function GiftChoose() {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.cart.isGiftVisible);
  const cart = useSelector((state) => state.cart.cart);
  const giftCart = cart.find((item) => item.hasOwnProperty('gift'));
  return (
    isVisible && (
    <View style={styles.modal_view}>
      <View style={styles.modal_view_inside}>
        <Pressable
          style={{ position: 'absolute', right: 5, top: 5 }}
          onPress={() => {
            dispatch(setGiftVisible(false));
          }}
        >
          <CrossGiftIcon />
        </Pressable>
        <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>Выберите подарок!</Text>
        {
            giftList.map((giftItem) => (
              <View style={styles.productListElement}>
                <View style={{ width: '50%', flexShrink: 2 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{giftItem.name}</Text>
                  <View style={{ marginBottom: 5 }}>
                    {
                        giftItem.hasOwnProperty('sostav') && <Text numberOfLines={3} style={{ color: '#AEAEAE' }}>{giftItem.sostav}</Text>
                    }
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Pressable
                      style={styles.chooseGiftBtn}
                      onPress={() => {
                        if (giftCart !== undefined) {
                          if (giftItem.id === giftCart?.id) {
                            dispatch(removeFromCart(giftItem));
                          }
                        } else {
                          dispatch(addToCart(giftItem));
                        }
                      }}
                    >
                      {
                        (giftItem?.name === giftCart?.name) && <Text style={{ color: '#fff' }}>Выбрать другой</Text>
                      }
                      {
                        (giftItem?.name !== giftCart?.name) && <Text style={{ color: '#fff' }}>Выбрать</Text>
                      }
                    </Pressable>
                  </View>
                </View>
                <View style={styles.img}>
                  <Image
                    width={160}
                    height={120}
                    resizeMode="contain"
                    source={{
                      uri: giftItem.imageLink,
                    }}
                  />
                </View>
              </View>
            ))
        }
      </View>
    </View>
    )
  );
}

export default GiftChoose;

const styles = StyleSheet.create({
  modal_view: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.50196)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_view_inside: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    rowGap: 30,
    width: WIDTH - 20,
    marginTop: 20,
    marginBottom: 40,
  },
  productListElement: {
    paddingTop: 15,
    paddingBottom: 15,
    width: '100%',
    borderBottomColor: 'rgba(0,0,0, 0.08)',
    borderBottomWidth: 1,
    columnGap: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  chooseGiftBtn: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 19,
    paddingRight: 19,
    borderColor: '#cf1c1d',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#cf1c1d',
  },
  img: {
    width: '50%',
  },
});
