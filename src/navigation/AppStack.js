import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Title} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import colors from '../utils/colors';
import DocScreen from '../screen/docs/DocScreen';
import ScannerScreen from '../screen/docs/ScannerScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';
import UploadScreen from '../screen/docs/UploadScreen';
import RecropScreen from '../screen/docs/RecropScreen';
import PreviewScreen from '../screen/docs/PreviewScreen';
import GalleryScreen from '../screen/docs/GalleryScreen';
import TeachMachineTest from '../test/01-TeachMachineTest';
import EditProfileScreen from '../screen/profile/EditProfileScreen';
import SignatureScreen from '../screen/others/SignatureScreen';
import SettingScreen from '../screen/others/SettingScreen';
import MessageScreen from '../screen/chat/MessageScreen';
import TabBar from './TabBar';
import PrivateScreen from '../screen/chat/PrivateScreen';
import SharedScreen from '../screen/chat/SharedScreen';
import CommonScreen from '../screen/test/CommonScreen';
import PremiumScreen from '../screen/test/PremiumScreen';
import SearchScreen from '../screen/test/SearchScreen';
import BottomSheet from '../screen/test/BottomSheet';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Test2 from '../screen/test/Test2';
import BoundsDetection from '../test/06-BoundsDetection';

const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function DocStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="docs"
      screenOptions={{
        headerStyle: {backgroundColor: colors.menuColor},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        // headerShown: false,
        // headerLeft: null,
        headerLeft: ({color, size}) => (
          <Ionicons.Button
            name="ios-menu"
            color={colors.white}
            backgroundColor={colors.menuColor}
            iconStyle={{}}
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

function PrivateStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.menuColor},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        // headerShown: false,
        // headerLeft: null,
        headerLeft: ({color, size}) => (
          <Ionicons.Button
            name="ios-menu"
            color={colors.white}
            backgroundColor={colors.menuColor}
            iconStyle={{}}
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen name="private" component={PrivateScreen} />
    </Stack.Navigator>
  );
}

function ShareStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.menuColor},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        // headerShown: false,
        // headerLeft: null,
        headerLeft: ({color, size}) => (
          <Ionicons.Button
            name="ios-menu"
            color={colors.white}
            backgroundColor={colors.menuColor}
            iconStyle={{}}
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen name="share" component={SharedScreen} />
    </Stack.Navigator>
  );
}

function SettingStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="setting"
      screenOptions={(color, size) => ({
        headerStyle: {backgroundColor: colors.menuColor},
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

function TestStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="go-to"
      screenOptions={{
        headerStyle: {backgroundColor: colors.menuColor},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        // headerShown: false,
        // headerLeft: null,
        headerLeft: ({color, size}) => (
          <Ionicons.Button
            name="ios-menu"
            color={colors.white}
            backgroundColor={colors.menuColor}
            iconStyle={{}}
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen name="go-to" component={Test2} />
      <Stack.Screen name="common-screen" component={CommonScreen} />
      <Stack.Screen name="premium-screen" component={PremiumScreen} />
      <Stack.Screen name="bottom-sheet" component={BottomSheet} />
      <Stack.Screen
        name="search-screen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="bounds-detection" component={BoundsDetection} />
    </Stack.Navigator>
  );
}

//  like the TopBar in Fileee DashBoard
function HomeTopBar() {
  return (
    <TopTab.Navigator
      initialRouteName="topTab-doc"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: colors.menuColor},
      }}>
      <TopTab.Screen
        name="topTab-doc"
        component={DocStack}
        options={{
          title: 'Docs',
        }}
      />
      <TopTab.Screen
        name="topTab-message"
        component={MessageScreen}
        options={{
          title: 'message',
        }}
      />
    </TopTab.Navigator>
  );
}

export {
  DocStack,
  PrivateStack,
  ShareStack,
  SettingStack,
  TestStack,
  HomeTopBar,
};
