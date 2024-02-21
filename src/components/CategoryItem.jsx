import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPressedCategory } from '../Redux/NavigateReducer';

const CategoryItem= ({ itemCategory, scrollViewRef }) => {
    const selectedItem = useSelector((state) => state.navigateHeaders.pressed);
    const dispatch = useDispatch();
  return (
    <Pressable 
      style={ (selectedItem?.title == itemCategory.title) ? styles.pressed_categories_item : styles.categories_item} 
      onPress={() => {
        dispatch(setPressedCategory(itemCategory));
        scrollViewRef.current?.scrollTo({y: itemCategory.coord});
      }}
    >
      { itemCategory.title.split(' ').length > 1 && <Text style={(selectedItem?.title == itemCategory.title) ? styles.pressed_categories_item_text : styles.categories_item_text}>{itemCategory.title.split(' ')[0]}{'\n'}{itemCategory.title.split(' ')[1]}</Text>}
      { itemCategory.title.split(' ').length < 2 && <Text style={(selectedItem?.title == itemCategory.title) ? styles.pressed_categories_item_text : styles.categories_item_text}>{itemCategory.title.split(' ')[0]}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
    pressed_categories_item: {
        paddingTop: 5,
        margin: 0,
        justifyContent: 'center',
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 18,
        height: 42,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        marginLeft: 5,
        backgroundColor: '#cf1c1d',
      },
    categories_item: {
        paddingTop: 5,
        margin: 0,
        justifyContent: 'center',
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 18,
        height: 42,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        marginLeft: 5,
      },
    categories_item_text: {
        fontSize: 12,
        lineHeight: 14,
        color: '#757575',
        textAlign: 'center',
    },
    pressed_categories_item_text: {
        fontSize: 12,
        lineHeight: 14,
        color: 'white',
        textAlign: 'center',
    }
});

export default CategoryItem;