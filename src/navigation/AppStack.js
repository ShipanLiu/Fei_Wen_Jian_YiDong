import React from 'react';
import {View, Text, Image, StyleSheet, LogBox} from 'react-native';
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
import TMTest2 from '../test/TMTest2';
import TMTest3 from '../test/TMTest3';
import KnnImageClassifier from '../test/Knn-Image-Classifier';

LogBox.ignoreLogs([
  ' If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
]);

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
      <Stack.Screen
        name="test2"
        component={TMTest2}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="test3"
        component={TMTest3}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="knn"
        component={KnnImageClassifier}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
export {DocStack};
