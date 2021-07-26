import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function AppIcon({name = 'email', size = 30, color}) {
  return (
    <View style={styles.container}>
      <Icon name={name} size={size} color={color} />
    </View>
  );
}
