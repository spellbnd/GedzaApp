import React from 'react';
import {
  View, Text, StyleSheet, Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import GoBackButton from '../Icons/GoBackButton';

function Bonuses() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ width: '100%', paddingRight: 15, paddingLeft: 15, paddingTop: 20, }}>
        <Text style={{
          fontSize: 35, marginBottom: 5,
        }}
        >
          Бонусы
        </Text>
      </View>
      <Pressable
        style={{
          width: 60, height: 60, justifyContent: 'center', alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Меню')}
      >
        <GoBackButton />
      </Pressable>
      <View style={{ width: '100%', paddingRight: 15, paddingLeft: 15 }}>
        <Text style={styles.p_heading_text}>Как получить?</Text>
        <Text style={styles.p_text}>Со своего первого заказа в Gedza вы становитесь участником нашей бонусной программы.</Text>
        <Text style={styles.p_heading_text}>Как посмотреть?</Text>
        <Text style={styles.p_text}>Бонусный счет привязывается к номеру телефона. Проверить его можно в корзине в приложении после авторизации.</Text>
        <Text style={styles.p_heading_text}>Как начисляются?</Text>
        <Text style={styles.p_text}>Бонусы начисляются каждому клиенту при каждом заказе в размере 3% от суммы заказа.</Text>
        <Text style={styles.p_heading_text}>Как тратить?</Text>
        <Text style={styles.p_text}>Бонусы можно копить и&nbsp;тратить на&nbsp;последующие заказы в соотношении 1 бонус = 1 рубль.</Text>
        <Text style={styles.p_heading_text}>На что не начисляются?</Text>
        <Text style={styles.p_text}>Бонусы не начисляются на стоимость доставки и акционные товары.</Text>
        <Text style={styles.p_text}>Неиспользованные бонусы сгорают спустя 3 месяца после начисления.</Text>
      </View>
    </ScrollView>
  );
}

export default Bonuses;

const styles = StyleSheet.create({
  p_heading_text: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  p_text: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
});
