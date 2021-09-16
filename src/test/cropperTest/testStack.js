import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button} from 'react-native-paper';

import V1 from './V1';
import V2 from './V2';

const Stack = createStackNavigator();

export default function TestStack(props) {
  return (
    <Stack.Navigator initialRouteName="test-picker">
      <Stack.Screen name="test-picker" component={V1} />
      <Stack.Screen name="test-cropper" component={V2} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
