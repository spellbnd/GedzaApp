import React from 'react';
import {
  View, Text, StyleSheet, Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import GoBackButton from '../Icons/GoBackButton';

function Vacancy() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ width: '100%', paddingRight: 15, paddingLeft: 15, paddingTop: 20, }}>
        <Text style={{
          fontSize: 35, marginBottom: 5,
        }}
        >
          Вакансии
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
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>Повар-сушист</Text>
        <Text style={{
          fontSize: 20, fontWeight: 'bold', marginBottom: 8, lineHeight: 24,
        }}
        >
          Обязанности:
        </Text>
        <Text style={styles.p_text}>• Приготовление блюд в соответствии с технологическими картами</Text>
        <Text style={styles.p_text}>• Соблюдение техники безопасности, санитарных норм и правил использования продуктов и расходных материалов (хранение, обработка)</Text>
        <Text style={styles.p_text}>• Контроль чистоты и порядка на рабочем месте</Text>
        <Text style={styles.p_text}>• Контроль за выходом блюд</Text>
        <Text style={styles.p_text}>• Проведение инвентаризации на торговой точке</Text>
        <Text style={{
          fontSize: 20, fontWeight: 'bold', marginBottom: 8, lineHeight: 24, marginTop: 22,
        }}
        >
          Требования:
        </Text>
        <Text style={styles.p_text}>• Наличие санитарной книжки</Text>
        <Text style={styles.p_text}>• Активная жизненная позиция и развитые навыки коммуникации</Text>
        <Text style={styles.p_text}>• Ответственность, пунктуальность, дисциплинированность, обучаемость</Text>
        <Text style={{
          fontSize: 20, fontWeight: 'bold', marginBottom: 8, lineHeight: 24, marginTop: 22,
        }}
        >
          Условия:
        </Text>
        <Text style={styles.p_text}>• Гибкий график работы по сменам 2/2, 3/3, 5/2</Text>
        <Text style={styles.p_text}>• Стабильная заработная плата</Text>
        <Text style={styles.p_text}>• Бесплатное питание, доставка до дома в вечернее время, фирменная одежда</Text>
        <Text style={styles.p_text}>• Профессиональное и эффективное обучение на рабочем месте</Text>
        <Text style={styles.p_text}>• Трудоустройство по желанию</Text>
        <Text style={styles.p_text}>• Построение личного плана карьерного роста в Компании</Text>
        <Text style={styles.p_text}>• Выплата заработной платы еженедельно</Text>
      </View>
    </ScrollView>
  );
}

export default Vacancy;

const styles = StyleSheet.create({
  p_heading_text: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  p_text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
});
