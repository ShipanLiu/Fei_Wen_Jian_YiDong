import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {Title, TouchableRipple} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

// TabBar has to be Wrapped in DrawerStack
import TabBar from './TabBar';
import MessageScreen from '../screen/chat/MessageScreen';
import SettingScreen from '../screen/others/SettingScreen';
import SupportScreen from '../screen/others/SupportScreen';
import EditProfileScreen from '../screen/profile/EditProfileScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';

import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="tabBar"
      screenOptions={{}}>
      <Drawer.Screen
        name="tabBar"
        component={TabBar}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="drawer-chat"
        component={MessageScreen}
        options={{
          title: 'Chat',
        }}
      />
      <Drawer.Screen
        name="drawer-setting"
        component={SettingScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Drawer.Screen
        name="drawer-support"
        component={SupportScreen}
        options={{
          title: 'Support',
        }}
      />
      {/* if want some Components to be navigated, then add more components below */}
      <Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={({color, size}) => ({
          title: '',
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" color={color} size={40} />
              <Title>Back</Title>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Icon
              style={styles.userEdit}
              name="account-edit-outline"
              size={25}
              color={color}
              onPress={() => navigation.navigate('edit-profile')}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="edit-profile"
        component={EditProfileScreen}
        options={({color, size}) => ({
          title: 'Edit Profile',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('profile')}>
              <Ionicons name="chevron-back-sharp" color={color} size={40} />
              <Title>Back</Title>
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  userEdit: {
    marginRight: 10,
  },
});
export default DrawerStack;
