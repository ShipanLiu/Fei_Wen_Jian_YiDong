import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {DocStack, ProfileStack} from './AppStack';

const Tab = createBottomTabNavigator();

export default function TabBar(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      <Tab.Screen
        name="Feed"
        component={DocStack}
        options={() => ({
          tabBarIcon: ({size, color}) => (
            <Icon name="file-document-outline" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={ProfileStack}
        options={() => ({
          tabBarIcon: ({size, color}) => (
            <Icon name="dots-horizontal" size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
