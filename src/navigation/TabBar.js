/*
  don't need tabBar anymore

*/

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../utils/colors';

import {DocStack, PrivateStack, ShareStack} from './AppStack';
import SharedScreen from '../screen/chat/SharedScreen';
import PrivateScreen from '../screen/chat/PrivateScreen';
import Test1 from '../screen/test/Test1';
import Test2 from '../screen/test/Test2';

const Tab = createBottomTabNavigator();

export default function TabBar(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.menuColor,
      }}>
      <Tab.Screen
        name="tab-home"
        component={DocStack}
        options={() => ({
          tabBarIcon: ({size, color}) => (
            <Icon name="file-document-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        })}
      />
      <Tab.Screen
        name="tab-private"
        component={PrivateStack}
        options={() => ({
          tabBarIcon: ({size, color}) => (
            <Icon name="account-lock-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Private',
        })}
      />
      <Tab.Screen
        name="tab-shared"
        component={ShareStack}
        options={() => ({
          tabBarIcon: ({size, color}) => (
            <Icon name="share-variant" size={size} color={color} />
          ),
          tabBarLabel: 'Share',
        })}
      />
      <Tab.Screen
        name="tab-screen1"
        component={Test1}
        options={() => ({
          tabBarLabel: 'test1',
        })}
      />
      <Tab.Screen
        name="tab-screen2"
        component={Test2}
        options={() => ({
          tabBarLabel: 'test2',
        })}
      />
    </Tab.Navigator>
  );
}
