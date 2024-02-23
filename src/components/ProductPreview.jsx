import React from 'react';
import {
  Modal, Text, View, StyleSheet, Image, Pressable, Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import SVGComponent from '../Icons/TestComponent';
import { addToCart, setModalCartVisible } from '../Redux/CartReducer';
import AddItemModal from './AddItemModal';

const WIDTH = Dimensions.get('window').width;
function ProductPreview({ visible, changeState, productInfo }) {
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const setModalStatus = (status) => {
    dispatch(setModalCartVisible(status));
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <AddItemModal />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: '90%',
            borderRadius: 10,
          }}
        >
          <Pressable style={styles.product_close} onPress={() => changeState(false)}>
            <SVGComponent />
          </Pressable>
          <Image
            style={styles.img}
            source={{
              uri: productInfo.imageLink,
            }}
          />
          <View style={styles.product_order}>
            <Text style={{ fontWeight: 700, fontSize: 22.4, marginBottom: 8 }}>{productInfo.name}</Text>
            <View>
              <Text style={styles.product_desc}>{productInfo.sostav}</Text>
            </View>
            <Text style={{
              fontWeight: '700', marginBottom: 5, textAlign: 'center', fontSize: 14,
            }}
            >
              Годен в течении 3 часов при t 20°C, 12 часов при t 4±2°C
            </Text>
            <Text style={{
              marginBottom: 5, textAlign: 'center', fontSize: 14, color: '#AEAEAE',
            }}
            >
              Изображение в приложении и внешний вид продукта могут отличаться
            </Text>
            <View style={styles.viewStyleForLine} />
            <View style={styles.energy_amount}>
              <Text>Энерг. ценность</Text>
              <Text>
                {productInfo.productValue.energy_amount}
                {' '}
                ккал.
              </Text>
            </View>
            <View style={styles.fiber_amount}>
              <Text>Белки</Text>
              <Text>
                {productInfo.productValue.fiber_amount}
                {' '}
                г
              </Text>
            </View>
            <View style={styles.fat_amount}>
              <Text>Жиры</Text>
              <Text>
                {productInfo.productValue.fat_amount}
                {' '}
                г
              </Text>
            </View>
            <View style={styles.fat_amount}>
              <Text>Углеводы</Text>
              <Text>
                {productInfo.productValue.carbohydrate_amount}
                {' '}
                г
              </Text>
            </View>
            <View style={styles.fat_amount}>
              <Text>Вес</Text>
              <Text>
                {productInfo.productValue.weight_amount}
                {' '}
                г.
              </Text>
            </View>
            <View style={styles.product_purchase}>
              <Pressable
                style={styles.btn}
                onPress={() => {
                  addItemToCart(productInfo);
                  setModalStatus(true);
                  setTimeout(() => {
                    setModalStatus(false);
                  }, 2000);
                }}
              >
                <Text style={styles.btn_text}>В корзину</Text>
              </Pressable>
              <Text style={{ fontWeight: 600, fontSize: 20 }}>
                {productInfo.price}
                {'\u20BD'}
              </Text>
            </View>

          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  img_inside: {
    marginBottom: 10,
  },
  img: {
    position: 'relative',
    height: '40%',
    width: '100%',
    marginBottom: 10,
  },
  product_order: {
    paddingRight: 20,
    paddingBottom: 60,
    paddingLeft: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  product_desc: {
    textAlign: 'center',
    fontSize: 16,
  },
  viewStyleForLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  energy_amount: {
    width: '100%',
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fiber_amount: {
    width: '100%',
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fat_amount: {
    width: '100%',
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  product_close: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    top: 0,
    width: 60,
    height: 60,
    margin: 0,
  },
  product_purchase: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'absolute',
    bottom: 0,
    width: WIDTH,
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1.5,
    borderColor: 'rgba(0,0,0, 0.01)',
    borderWidth: 1,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#cf1c1d',
    backgroundColor: '#cf1c1d',
    borderRadius: 15,
    height: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center',
  },
  btn_text: {
    color: '#fff',
  },

});

export default ProductPreview;
