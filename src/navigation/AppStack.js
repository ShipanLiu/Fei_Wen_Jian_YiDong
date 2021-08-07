import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import DocScreen from '../screen/DocScreen';
import ScannerScreen from '../screen/ScannerScreen';
import ProfileScreen from '../screen/ProfileScreen';
// import PreviewScreen from '../screen/PreviewScreen';
import UploadScreen from '../screen/UploadScreen';

const Stack = createStackNavigator();

function DocStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="docs"
      screenOptions={{
        headerStyle: {backgroundColor: 'tomato'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="docs"
        component={DocScreen}
        options={() => ({
          title: 'My Docs',
        })}
      />
      <Stack.Screen
        name="camera"
        component={ScannerScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      {/* <Stack.Screen
        name="preview"
        component={PreviewScreen}
        options={() => ({
          title: 'Preview',
        })}
      /> */}
      <Stack.Screen
        name="upload"
        component={UploadScreen}
        options={() => ({
          title: 'Upload',
        })}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={{
        headerStyle: {backgroundColor: 'tomato'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

export {DocStack, ProfileStack};
