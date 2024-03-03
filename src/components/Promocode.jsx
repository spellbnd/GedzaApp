import React, { useState } from 'react';
import {
  View, TextInput, Pressable, Text, StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { activatePromocode } from '../Redux/CartReducer';

function Promocode() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const promocode = useSelector((state) => state.cart);
  console.log(promocode.activatedPromocode);
  console.log(text);
  return (
    <View style={styles.promocode_block}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Промокод</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          style={{
            borderWidth: 1, borderRightWidth: 0, paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15, borderColor: 'rgba(0, 66, 105, 0.2784313725)',
          }}
          onChangeText={(newText) => setText(newText)}
          placeholder="Введите промокод"
        />
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            width: 150,
            borderWidth: 1,
            borderLeftWidth: 0,
            borderColor: 'rgba(0, 66, 105, 0.2784313725)',
          }}
          onPress={() => {
            console.log('TEST');
            dispatch(activatePromocode(text));
          }}
        >
          <Text style={{ color: '#cf1c1d' }}>Применить</Text>
        </Pressable>
      </View>
      <View>
        {
            promocode.activatedPromocode === true && <Text style={{textAlign: 'center'}}>Успешная активация промокода! Скидка составляет 20%</Text>
        }
        {
            promocode.activatedPromocode === 'error' && <Text>Введен неверный промокод!</Text>
        }
      </View>
    </View>
  );
}

export default Promocode;

const styles = StyleSheet.create({
  promocode_block: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
