import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import TabBar from './TabBar';
import DrawerStack from './DrawerStack';

export default function Routes(props) {
  // console.log(StatusBar.currentHeight);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <DrawerStack />
      </NavigationContainer>
    </>
  );
}
