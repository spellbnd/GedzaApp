import React, { useState } from 'react';
import {
  Text, View, Image, Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { ProductStyle } from '../styles/ProductItem';
import ProductPreview from './ProductPreview';
import { addToCart, setModalCartVisible } from '../Redux/CartReducer';

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const setModalStatus = (status) => {
    dispatch(setModalCartVisible(status));
  };
  const [openPreview, setOpenPreview] = useState(false);
  return (
    <View style={ProductStyle.product_item}>
      <ProductPreview visible={openPreview} productInfo={product} changeState={setOpenPreview} />
      <View style={ProductStyle.product_desc}>
        <View>
          <Text style={ProductStyle.product_name}>{product.name}</Text>
        </View>
        <Text onPress={() => setOpenPreview(true)} style={ProductStyle.sostav}>
          {product.sostav}
        </Text>
        {
            Object.prototype.hasOwnProperty.call(product, 'oldprice') && (
            <Text style={ProductStyle.oldprice}>
              {product.oldprice}
              ₽
            </Text>
            )
          }
        <Pressable
          style={ProductStyle.product_addButton}
          onPress={() => {
            addItemToCart(product);
            setModalStatus(true);
            setTimeout(() => {
              setModalStatus(false);
            }, 2000);
          }}
        >
          <Text style={ProductStyle.product_addButton_text}>
            {product.price}
            {'\u20BD'}
          </Text>
        </Pressable>
      </View>
      <Pressable onPress={() => setOpenPreview(true)} style={ProductStyle.img}>
        <Image
          style={ProductStyle.img_inside}
          source={{
            uri: product.imageLink,
          }}
        />
      </Pressable>
    </View>
  );
}

export default ProductItem;
