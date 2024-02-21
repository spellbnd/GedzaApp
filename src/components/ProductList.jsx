import React from 'react';
import {View, Text} from 'react-native';
import { ProductListStyle } from '../styles/ProductList';
import ProductItem from './ProductItem';
import { useDispatch } from 'react-redux';
import {navigateListAdd} from '../Redux/NavigateReducer';

const ProductList = ({products, title, onLayout}) => {
    const dispatch = useDispatch();
    const addToNavigateList = (title, coord) => {
        const TestObj = {title, coord};
       dispatch(navigateListAdd(TestObj));
    }
    const layoutFunc=(event)=> {
        console.log(event.nativeEvent.layout.y);
      }

    return (
        <View style={ProductListStyle.container} onLayout={(event) => {
           addToNavigateList(title, event.nativeEvent.layout.y)
        }}>
            <Text style={ProductListStyle.title}>{title}</Text>
            {
                 products.map(product =>
                    <ProductItem product={product} key = {product.id}/>)
            }
        </View>
    )
};

export default ProductList;