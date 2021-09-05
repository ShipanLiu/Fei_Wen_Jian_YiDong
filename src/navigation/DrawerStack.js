import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {Title, TouchableRipple} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, DrawerActions} from '@react-navigation/native';

// TabBar has to be Wrapped in DrawerStack
import TabBar from './TabBar';
import {SettingStack} from './AppStack';
import {DocStack, HomeTopBar} from './AppStack';
import MessageScreen from '../screen/chat/MessageScreen';
import SupportScreen from '../screen/others/SupportScreen';
import EditProfileScreen from '../screen/profile/EditProfileScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';
import Test1 from '../screen/test/Test1';
import Test2 from '../screen/test/Test2';
import colors from '../utils/colors';

import DrawerContent from './DrawerContent';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="tabBar"
      screenOptions={{
        headerTitleStyle: {color: '#fff'},
        headerStyle: {backgroundColor: colors.menuColor},
        headerTitleAlign: 'center',
        headerLeft: ({color, size}) => (
          <Ionicons.Button
            name="ios-menu"
            color={colors.white}
            backgroundColor={colors.menuColor}
            size={30}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      }}>
      <Drawer.Screen
        name="tabBar"
        component={TabBar}
        headerTitleAlign="center"
        options={{
          title: 'Dashboard',
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
        component={SettingStack}
        options={{
          title: 'Settings',
          headerShown: false,
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
      <Drawer.Screen
        name="drawer-test1"
        component={Test1}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="drawer-test2"
        component={Test2}
        options={{headerShown: false}}
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
