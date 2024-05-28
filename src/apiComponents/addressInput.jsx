import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

function AddressInput() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [street, setStreet] = useState('');
  const [streetSuggestions, setStreetSuggestions] = useState([]);
  const [houseNumber, setHouseNumber] = useState('');
  const [entranceNumber, setEntranceNumber] = useState('');
  const [doorCode, setDoorCode] = useState('');
  const [floor, setFloor] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');

  const fetchStreetSuggestions = async () => {
    try {
      if (street.length > 2) {
        const formData = new FormData();
        formData.append('action', 'searchStreets');
        formData.append('q', street);
        const response = await fetch('https://gedzagroup.ru/api/address', {
          method: 'post',
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setStreetSuggestions(data);
      } else {
        setStreetSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching street suggestions:', error);
    }
  };

  useEffect(() => {
    if (street.length > 2 && showSuggestions) {
      const timeoutId = setTimeout(fetchStreetSuggestions, 300);
      return () => clearTimeout(timeoutId);
    }
    setStreetSuggestions([]);
  }, [street, showSuggestions]);

  const handleStreetSelection = (selectedStreet) => {
    setStreet(selectedStreet.text);
    setStreetSuggestions([]);
    setShowSuggestions(false);
  };

  const handleInputChange = (text) => {
    setStreet(text);
    setShowSuggestions(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.label}>Улица:</Text>
        <TextInput
          style={styles.input}
          value={street}
          onChangeText={handleInputChange}
        />
        {showSuggestions && streetSuggestions.length > 0 && (
          <ScrollView style={styles.suggestionContainer}>
            {streetSuggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleStreetSelection(item)}
              >
                <Text style={styles.suggestionText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      <View>
        <Text style={styles.label}>Дом:</Text>
        <TextInput
          style={styles.input}
          value={houseNumber}
          onChangeText={setHouseNumber}
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text style={styles.label}>Подъезд:</Text>
        <TextInput
          style={styles.input}
          value={entranceNumber}
          onChangeText={setEntranceNumber}
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text style={styles.label}>Код двери/домофон:</Text>
        <TextInput
          style={styles.input}
          value={doorCode}
          onChangeText={setDoorCode}
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text style={styles.label}>Этаж:</Text>
        <TextInput
          style={styles.input}
          value={floor}
          onChangeText={setFloor}
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text style={styles.label}>Квартира:</Text>
        <TextInput
          style={styles.input}
          value={apartmentNumber}
          onChangeText={setApartmentNumber}
          keyboardType="number-pad"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 8,
    borderColor: 'rgba(0, 66, 105, 0.28)',
    color: '#000',
    fontSize: 14,
  },
  suggestionContainer: {
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 5,
    borderRadius: 5,
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default AddressInput;
