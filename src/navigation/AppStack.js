import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import DocScreen from '../screen/DocScreen';
import ScannerScreen from '../screen/ScannerScreen';
import ProfileScreen from '../screen/ProfileScreen';
import UploadScreen from '../screen/UploadScreen';
import RecropScreen from '../screen/RecropScreen';
import PreviewScreen from '../screen/PreviewScreen';
import AddExtraImageScreen from '../screen/AddExtraImageScreen';

const Stack = createStackNavigator();

function DocStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="docs"
      screenOptions={{
        headerStyle: {backgroundColor: 'tomato'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        // headerLeft: null,
      }}>
      <Stack.Screen
        name="docs"
        component={DocScreen}
        options={() => ({
          title: 'My Docs',
          headerLeft: null,
        })}
      />
      <Stack.Screen
        name="camera"
        component={ScannerScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="recrop"
        component={RecropScreen}
        options={() => ({
          title: 'recrop',
        })}
      />
      <Stack.Screen
        name="upload"
        component={UploadScreen}
        options={() => ({
          title: 'Upload',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="preview"
        component={PreviewScreen}
        options={() => ({
          title: 'preview',
        })}
      />
      <Stack.Screen
        name="addextra"
        component={AddExtraImageScreen}
        options={() => ({
          headerShown: false,
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
