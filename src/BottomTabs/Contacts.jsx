import * as React from 'react';
import {
  View, Linking, Text, StyleSheet,
} from 'react-native';

function ContactsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.contacts_text_header}>Контакты</Text>
      <Text style={styles.contacts_text} onPress={() => Linking.openURL('tel:+73472003004')}>+7(347)200-30-04</Text>
      <Text style={styles.contacts_text}>Режим работы</Text>
      <Text style={styles.contacts_text}>Ежидневно с 10:00 до 23:00</Text>
      <Text style={styles.contacts_text}>
        Заказы принимаем с 10:00 до 22:30
      </Text>
      <Text style={styles.contacts_text}>Точки самовывоза</Text>
      <Text style={styles.contacts_text}>
        г.Уфа ул. Набережная реки Уфы, д. 41
      </Text>
      <Text style={styles.contacts_text}>
        г.Уфа ул. Проспект Октября, д. 49
      </Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Софьи Перовской, д. 42</Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Ульяновых, д. 31</Text>
      <Text style={styles.contacts_text}>г.Уфа ул. Карла Маркса, д. 25</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', paddingRight: 15, paddingLeft: 15,
  },
  contacts_text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  contacts_text_header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 35,
  },
});

export default ContactsScreen;
