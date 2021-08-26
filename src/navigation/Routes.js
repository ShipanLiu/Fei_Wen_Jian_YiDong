import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import TabBar from './TabBar';
import DrawerStack from './DrawerStack';

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export default function Routes(props) {
  // console.log(StatusBar.currentHeight);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={myTheme}>
        <DrawerStack />
      </NavigationContainer>
    </>
  );
}
