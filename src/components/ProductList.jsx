import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { ProductListStyle } from '../styles/ProductList';
import ProductItem from './ProductItem';
import { navigateListAdd } from '../Redux/NavigateReducer';

function ProductList({ products, title }) {
  const dispatch = useDispatch();
  const addToNavigateList = (title, coord) => {
    const TestObj = { title, coord };
    dispatch(navigateListAdd(TestObj));
  };

  return (
    <View
      style={ProductListStyle.container}
      onLayout={(event) => {
        addToNavigateList(title, event.nativeEvent.layout.y);
      }}
    >
      <Text style={ProductListStyle.title}>{title}</Text>
      {
                 products.map((product) => <ProductItem product={product} key={product.id} />)
            }
    </View>
  );
}

export default ProductList;
