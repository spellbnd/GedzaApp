import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useDispatch } from 'react-redux';
import { spendBonuses } from '../Redux/CartReducer';
import normalizeCountForm from '../utils/functions';


function BonusSlider({ user }) {
  const [selectedBonus, setSelectedBonus] = useState(10);
  const dispatch = useDispatch();

  const sliderMaxValue = user.bonuses;

  const handleSliderChange = (value) => {
    setSelectedBonus(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Бонусные баллы</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>1 балл</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={sliderMaxValue}
          step={1}
          value={selectedBonus}
          onValueChange={handleSliderChange}
          thumbTintColor="#ff0000"
          minimumTrackTintColor="#ff0000"
          maximumTrackTintColor="#ffffff"
        />
        <Text style={styles.sliderLabel}>
          {sliderMaxValue}
          {' '}
          {normalizeCountForm(sliderMaxValue, ['балл', 'балла', 'баллов'])}
        </Text>
      </View>
      <Text>
        {selectedBonus}
        {' '}
        {normalizeCountForm(selectedBonus, ['балл', 'балла', 'баллов'])}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => dispatch(spendBonuses(selectedBonus))}>
        <Text style={styles.buttonText}>Потратить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  sliderLabel: {
    fontSize: 16,
  },
  slider: {
    width: '70%',
  },
  button: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BonusSlider;
