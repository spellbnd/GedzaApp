import React from 'react';
import {
  View, Text, Dimensions, StyleSheet, Image, Pressable, Linking,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CrossGiftIcon from '../Icons/CrossGiftIcon';
import { setYandexModalVisible } from '../Redux/FocusReducer';

const WIDTH = Dimensions.get('window').width;

function ReviewLinkModal() {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.focus.isYandexModalVisible);
  return (
    isVisible && (
    <View style={styles.modal_view}>
      <View style={styles.modal_view_inside}>
        <Pressable style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => dispatch(setYandexModalVisible(false))}>
          <CrossGiftIcon />
        </Pressable>
        <Image
          width={208}
          height={86}
          resizeMode="contain"
          source={{
            uri: 'https://gedzagroup.ru/assets/img/yasp-n.jpg',
          }}
        />
        <View style={{ justifyContent: 'flex-start', rowGap: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 700, lineHeight: 24 }}>Выберите адрес точки, где  желаете оставить отзыв</Text>
          <View style={{ width: 300 }}>
            <Pressable
              style={{
                borderColor: '#cf1c1d', borderWidth: 2, borderRadius: 100, padding: 10, alignItems: 'center',
              }}
              onPress={() => Linking.openURL('https://yandex.ru/maps/org/gedza/42933040020/reviews')}
            >
              <Text style={{ color: '#cf1c1d' }}>ул. Набережная реки Уфы, д. 41</Text>
            </Pressable>
          </View>
          <View style={{ width: 300 }}>
            <Pressable
              style={{
                borderColor: '#cf1c1d', borderWidth: 2, borderRadius: 100, padding: 10, alignItems: 'center',
              }}
              onPress={() => Linking.openURL('https://yandex.ru/maps/org/gedza/216449990516/reviews')}
            >
              <Text style={{ color: '#cf1c1d' }}>ул. Проспект Октября, д. 49</Text>
            </Pressable>
          </View>
          <View style={{ width: 300 }}>
            <Pressable
              style={{
                borderColor: '#cf1c1d', borderWidth: 2, borderRadius: 100, padding: 10, alignItems: 'center',
              }}
              onPress={() => Linking.openURL('https://yandex.ru/maps/org/gedza/142614826984/reviews')}
            >
              <Text style={{ color: '#cf1c1d' }}>ул. Софьи Перовской, д. 42</Text>
            </Pressable>
          </View>
          <View style={{ width: 300 }}>
            <Pressable
              style={{
                borderColor: '#cf1c1d', borderWidth: 2, borderRadius: 100, padding: 10, alignItems: 'center',
              }}
              onPress={() => Linking.openURL('https://yandex.ru/maps/org/gedza/210044907707/reviews')}
            >
              <Text style={{ color: '#cf1c1d' }}>ул. Ульяновых, д.31</Text>
            </Pressable>
          </View>
          <View style={{ width: 300 }}>
            <Pressable
              style={{
                borderColor: '#cf1c1d', borderWidth: 2, borderRadius: 100, padding: 10, alignItems: 'center',
              }}
              onPress={() => Linking.openURL('https://yandex.ru/maps/org/gedza/160905415949/reviews')}
            >
              <Text style={{ color: '#cf1c1d' }}>ул. Карла Маркса, д. 25</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
    )
  );
}

export default ReviewLinkModal;

const styles = StyleSheet.create({
  modal_view: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.50196)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_view_inside: {
    backgroundColor: '#fff',
    padding: 20,
    rowGap: 30,
    width: WIDTH - 50,
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
});
