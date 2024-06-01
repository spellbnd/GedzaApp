import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

import { useDispatch } from 'react-redux';

import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import catalog from '../data/catalog_done.json';
import { setScrollTop } from '../Redux/NavigateReducer';

const images = [
  'https://gedzagroup.ru/assets/img/vs.jpg',
  'https://gedzagroup.ru/assets/img/3and1.webp',
  'https://gedzagroup.ru/assets/img/karasava-new.webp',
];
const WIDTH = Dimensions.get('window').width;
function Catalog() {
  const dispatch = useDispatch();

  const scrollViewRef = useRef(null);
  return (
    <View>
      <View>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1 }}
          stickyHeaderIndices={[1]}
          onScroll={({ nativeEvent }) => dispatch(setScrollTop(nativeEvent.contentOffset.y))}
          nestedScrollEnabled
        >
          <View style={styles.carousel}>
            <Swiper
              style={styles.wrapper}
              paginationStyle={{ bottom: 5 }}
              showsButtons
              autoplay
              activeDotColor="red"
              nextButton={
                <Text style={styles.swiperButtons}>›</Text>
              }
              prevButton={
                <Text style={styles.swiperButtons}>‹</Text>
              }
            >
              {
                images.map((item, index) => (
                  <Image
                    source={{ uri: item }}
                    resizeMode="contain"
                    style={styles.wrap}
                    key={index}
                  />
                ))
              }
            </Swiper>
          </View>
          <View style={styles.categories}>
            <CategoryList
              scrollViewRef={scrollViewRef}
            />
          </View>
          {
            catalog.map((item) => (
              <ProductList key={item.id} products={item.items_list} title={item.category_name} />
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalList: {
    width: WIDTH,
    height: 'auto',
  },
  categories: {
    width: '100%',
    height: 52,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
  },
  categories_first_item: {
    paddingTop: 5,
    justifyContent: 'center',
    margin: 0,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 18,
    height: 42,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    marginLeft: 10,
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
  wrap: {
    width: WIDTH,
    height: '100%',
  },
  carousel: {
    width: WIDTH,
    height: (WIDTH / 412) * 128,
  },
  wrapDot: {
    position: 'relative',
    marginTop: 5,
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 1,
    color: 'black',
  },
  dot: {
    margin: 1,
    color: '#888',
  },
  wrapper: {
    height: '100%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
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
  swiperButtons: {
    color: '#e5e4e2', fontSize: 70,
  },
});

export default Catalog;
