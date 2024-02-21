import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Pressable, Platform, ScrollView, Dimensions} from 'react-native';
import ProductList from '../components/ProductList';
import Swiper from 'react-native-swiper';
import products from '../data/catalog.json';
import AddItemModal from '../components/AddItemModal';
import {useRef} from "react";
import { NativeModules, SafeAreaView} from 'react-native';
const {StatusBarManager} = NativeModules;
import { useSelector } from 'react-redux';
import CategoryItem from '../components/CategoryItem';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Catalog = () => {
  const navigateData = useSelector((state) => state.navigateHeaders.navigateHeaders);
  console.log(HEIGHT);

  const images = [
    'https://gedzagroup.ru/assets/img/yami-n.jpg',
    'https://gedzagroup.ru/assets/img/new_hitori.jpg',
    'https://gedzagroup.ru/assets/img/888.jpg',
    'https://gedzagroup.ru/assets/img/3and1.webp',
    'https://gedzagroup.ru/assets/img/karasava-new.webp'
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [imgActive, setimgActive] = useState(0);
  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  }
  const scrollViewRef = useRef(null);
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
    }}>
      <View style={styles.carousel}>
      <Swiper style={styles.wrapper} paginationStyle={{bottom: 5}} showsButtons={true} autoplay={true} activeDotColor='red'  nextButton={<Text style={{color: '#e5e4e2', fontSize: 70}}>›</Text>} prevButton={<Text style={{color: '#e5e4e2', fontSize: 70}}>‹</Text>}>
        <Image
        source={{uri: images[0],}}
        resizeMode="contain"
        style={styles.wrap}
        />
        <Image
        source={{uri: images[1],}}
        resizeMode="contain"
        style={styles.wrap}
        />
         <Image
        source={{uri: images[2],}}
        resizeMode="contain"
        style={styles.wrap}
        />
        <Image
        source={{uri: images[3],}}
        resizeMode="contain"
        style={styles.wrap}
        />
        <Image
        source={{uri: images[4],}}
        resizeMode="contain"
        style={styles.wrap}
        />
      </Swiper>
      </View>
      <View style={styles.categories}>
      <ScrollView horizontal={true} style={styles.horizontalList} showsHorizontalScrollIndicator={false} >
        {
          navigateData.map(itemCategory => 
            <CategoryItem
            itemCategory={itemCategory}
            scrollViewRef={scrollViewRef}/>
          )
        }
        {/*
      <View style={styles.categories_first_item}>
        <Text style={styles.categories_item_text}>Премиум{"\n"}роллы</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Запеченные{"\n"}роллы</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Холодные{"\n"}роллы</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Темпурные{"\n"}роллы</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Мини{"\n"}роллы</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Сеты{"\n"}мини</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Сеты</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Классические{"\n"}роллы</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Пицца</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Супы</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>WOK-{"\n"}лапша</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Поке</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Салаты</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Суши</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Закуски</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Десерты</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Напитки</Text>
      </View>
      <View style={styles.categories_item}>
        <Text style={styles.categories_item_text}>Дополнительно</Text>
      </View>
      */}
      </ScrollView>
      </View>
      <View >
      <ScrollView ref={scrollViewRef}  contentContainerStyle={{flexGrow: 1, paddingBottom: 0.476*HEIGHT}} >
      <ProductList products={products} title='Премиум Роллы'/>
      <ProductList products={products} title='Запеченные Роллы'/>
      <ProductList products={products} title='Холодные Роллы'/>
      <ProductList products={products} title='Темпурные Роллы'/>
      <ProductList products={products} title='Мини Роллы'/>
      <ProductList products={products} title='Холодные ХРоллы'/>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
container: {},
  wrap: {
    width: WIDTH,
    height: '100%',
  },
  carousel: {
    width: WIDTH,
    height: WIDTH / 412 * 128,
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
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
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
  }
})

export default Catalog;
