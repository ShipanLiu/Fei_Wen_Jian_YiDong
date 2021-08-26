import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// TabBar has to be Wrapped in DrawerStack
import TabBar from './TabBar';
import MessageScreen from '../screen/chat/MessageScreen';
import SettingScreen from '../screen/others/SettingScreen';
import SupportScreen from '../screen/others/SupportScreen';
import EditProfileScreen from '../screen/profile/EditProfileScreen';

import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="tabBar"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="tabBar" component={TabBar} />
      <Drawer.Screen name="drawer-chat" component={MessageScreen} />
      <Drawer.Screen name="drawer-setting" component={SettingScreen} />
      <Drawer.Screen name="drawer-support" component={SupportScreen} />
      {/* if want use Navigation, add more components below */}
      <Drawer.Screen name="profile-edit" component={EditProfileScreen} />
    </Drawer.Navigator>
  );
};
export default DrawerStack;
