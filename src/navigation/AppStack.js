import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Title} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import DocScreen from '../screen/docs/DocScreen';
import ScannerScreen from '../screen/docs/ScannerScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';
import UploadScreen from '../screen/docs/UploadScreen';
import RecropScreen from '../screen/docs/RecropScreen';
import PreviewScreen from '../screen/docs/PreviewScreen';
import GalleryScreen from '../screen/docs/GalleryScreen';
import TeachMachineTest from '../test/TeachMachineTest';
import EditProfileScreen from '../screen/profile/EditProfileScreen';
import SignatureScreen from '../screen/others/SignatureScreen';
import SettingScreen from '../screen/others/SettingScreen';
// import TMTest2 from '../test/TMTest2';
// import TMTest3 from '../test/TMTest3';
// import KnnImageClassifier from '../test/Knn-Image-Classifier';

const Stack = createStackNavigator();

function DocStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="docs"
      screenOptions={{
        headerStyle: {backgroundColor: 'tomato'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        // headerLeft: null,
        headerLeft: ({color, size}) => (
          <Ionicons.Button
            name="ios-menu"
            color={color}
            backgroundColor="tomato"
            iconStyle={{
              color: 'pink',
            }}
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen
        name="docs"
        component={DocScreen}
        options={() => ({
          title: 'My Docs',
          // headerLeft: null,
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
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="gallery"
        component={GalleryScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

function SettingStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="setting"
      screenOptions={(color, size) => ({
        headerStyle: {backgroundColor: 'tomato'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      })}>
      <Stack.Screen
        name="setting"
        component={SettingScreen}
        options={() => ({
          title: 'Settings',
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.goBack();
                // navigation.openDrawer();
              }}>
              <Ionicons name="chevron-back-sharp" color="#fff" size={40} />
              <Title style={{color: '#fff'}}>Back</Title>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="signature"
        component={SignatureScreen}
        options={() => ({
          title: 'Signature',
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('setting');
              }}>
              <Ionicons name="chevron-back-sharp" color="#fff" size={40} />
              <Title style={{color: '#fff'}}>Back</Title>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export {DocStack, SettingStack};
