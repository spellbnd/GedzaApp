/* eslint-disable no-shadow */
import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { ProductListStyle } from '../styles/ProductList';
import ProductItem from './ProductItem';
import { navigateListAdd } from '../Redux/NavigateReducer';

function ProductList({ products, title }) {
  const dispatch = useDispatch();
  const addToNavigateList = (title, coord) => {
    const HeadersData = { title, coord };
    dispatch(navigateListAdd(HeadersData));
  };

  return (
    <View
      style={ProductListStyle.container}
      onLayout={(event) => {
        addToNavigateList(title, event.nativeEvent.layout.y - 30);
      }}
    >
      <Text style={ProductListStyle.title}>{title}</Text>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </View>
  );
}

export default ProductList;
