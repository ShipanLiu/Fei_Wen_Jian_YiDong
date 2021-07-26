import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';
import {DimensionsWidth, DimensionsHeight} from '../utils/dimension';

export default function AppButton({title, onPress, buttonStyle, textStyle}) {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
    width: '20%',
  },

  text: {
    color: colors.white,
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
