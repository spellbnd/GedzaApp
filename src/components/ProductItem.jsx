import React, {useState} from 'react';
import {Text, View, Image, Pressable, TouchableOpacity} from 'react-native';
import { ProductStyle } from '../styles/ProductItem';
import ProductPreview from './ProductPreview';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CartReducer';
import { setModalCartVisible } from '../Redux/CartReducer';


const ProductItem = (props) => {

  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item))
  };
  const setModalStatus = (status) => {
    dispatch(setModalCartVisible(status))
  }
  const [openPreview, setOpenPreview] = useState(false);
    return (
        <View style={ProductStyle.product_item}>
          <ProductPreview visible={openPreview} productInfo={props.product} changeState={setOpenPreview}/>
        <View style={ProductStyle.product_desc}>
        <View>
            <Text style={ProductStyle.product_name}>{props.product.name}</Text>
            </View>
        <Text onPress={() => setOpenPreview(true)} style={ProductStyle.sostav}>
          {props.product.sostav}</Text>
          {
            props.product.hasOwnProperty('oldprice') && <Text style={ProductStyle.oldprice}>{props.product.oldprice}₽</Text>
          }
          <Pressable style={ProductStyle.product_addButton} onPress={() => {
            addItemToCart(props.product);
            setModalStatus(true);
            setTimeout(()=> {
              setModalStatus(false);
            }, 2000)}
            } >
            <Text style={ProductStyle.product_addButton_text}>{props.product.price}{'\u20BD'}</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => setOpenPreview(true)} style={ProductStyle.img}>
        <Image
        style = {ProductStyle.img_inside}
        source ={{
          uri: props.product.imageLink,
        }}></Image>
        </Pressable>
        </View>
    )
};

export default ProductItem;