import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';

export default function AppIcon({
  name = 'email',
  size = 30,
  iconColor = '#fff',
  backgroundColor = '#000',
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name={name} size={size / 1.6} color={iconColor} />
    </View>
  );
}
