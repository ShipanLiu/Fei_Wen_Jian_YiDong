import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function AppButton({name, onPress, style}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
