import React from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CategoryItem from './CategoryItem';

const WIDTH = Dimensions.get('window').width;

function CategoryList({ scrollViewRef }) {
  const navigateData = useSelector(
    (state) => state.navigateHeaders.navigateHeaders,
  );
  console.log(navigateData);

  return (
    <ScrollView
      horizontal
      style={styles.horizontalList}
      showsHorizontalScrollIndicator={false}
    >
      {navigateData.map((itemCategory) => (
        <CategoryItem
          key={itemCategory?.title}
          itemCategory={itemCategory}
          scrollViewRef={scrollViewRef}
        />
      ))}
    </ScrollView>
  );
}

export default CategoryList;

const styles = StyleSheet.create({
  horizontalList: {
    width: WIDTH,
    height: 'auto',
  },
});
