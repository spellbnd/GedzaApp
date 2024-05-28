import React from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  Linking,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setYaModalVisible } from '../Redux/CartReducer';
import ReviewLinkModal from '../components/ReviewLinksModal';

function Reviews() {
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <ReviewLinkModal />
      <View style={{ width: '100%', paddingRight: 15, paddingLeft: 15, paddingTop: 20 }}>
        <Text style={{ fontSize: 35, marginBottom: 35, }}>Отзывы</Text>
      </View>
      <View style={{ width: '100%', paddingRight: 15, paddingLeft: 15 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          Вы можете оставить свой отзыв о качестве обслуживания и нашей
          продукции.
        </Text>
        <Text style={{ fontSize: 16 }}>
          Оставляя свой отзыв, вы помогаете другим покупателям сделать
          правильный выбор, а нам совершенствоваться, становясь лучше для Вас.
        </Text>
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <View style={{ width: '100%', maxWidth: 250 }}>
            <View
              style={{
                alignItems: 'center',
                elevation: 3,
                borderWidth: 0.01,
                borderColor: 'rgba(0,0,0,0.0001)',
              }}
            >
              <View style={{ padding: 20 }}>
                <Image
                  width={150}
                  height={100}
                  resizeMode="contain"
                  source={{
                    uri: 'https://gedzagroup.ru/assets/img/yasp-n.jpg',
                  }}
                />
                <Pressable
                  style={{
                    backgroundColor: '#cf1c1d',
                    borderRadius: 25,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    alignItems: 'center',
                  }}
                  onPress={() => dispatch(setYaModalVisible(true))}
                >
                  <Text style={{ color: '#fff', fontSize: 14, lineHeight: 20 }}>
                    Оставить отзыв
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <View style={{ width: '100%', maxWidth: 250 }}>
            <View
              style={{
                alignItems: 'center',
                elevation: 3,
                borderWidth: 0.01,
                borderColor: 'rgba(0,0,0,0.0001)',
              }}
            >
              <View style={{ padding: 20 }}>
                <Image
                  width={150}
                  height={100}
                  resizeMode="contain"
                  source={{
                    uri: 'https://gedzagroup.ru/assets/img/google-n.jpg',
                  }}
                />
                <Pressable
                  style={{
                    backgroundColor: '#cf1c1d',
                    borderRadius: 25,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    alignItems: 'center',
                  }}
                  onPress={() => Linking.openURL('https://goo.gl/maps/tCSnJxmh6s4cQ79y8')}
                >
                  <Text style={{ color: '#fff', fontSize: 14, lineHeight: 20 }}>
                    Оставить отзыв
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 20,
          }}
        >
          <View style={{ width: '100%', maxWidth: 250 }}>
            <View
              style={{
                alignItems: 'center',
                elevation: 3,
                borderWidth: 0.01,
                borderColor: 'rgba(0,0,0,0.0001)',
              }}
            >
              <View style={{ padding: 20 }}>
                <Image
                  width={150}
                  height={100}
                  resizeMode="contain"
                  source={{
                    uri: 'https://gedzagroup.ru/assets/img/2gis-n.jpg',
                  }}
                />
                <Pressable
                  style={{
                    backgroundColor: '#cf1c1d',
                    borderRadius: 25,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    alignItems: 'center',
                  }}
                  onPress={() => Linking.openURL('https://goo.gl/maps/tCSnJxmh6s4cQ79y8')}
                >
                  <Text style={{ color: '#fff', fontSize: 14, lineHeight: 20 }}>
                    Оставить отзыв
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Reviews;
