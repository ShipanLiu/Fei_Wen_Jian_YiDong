import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Divider,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

const mapStateToProps = (state, props) => {
  const {avatarSrc, userName, email, phone} = state.profileReducer;
  return {avatarSrc, userName, email, phone};
};

function DrawerContent(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableRipple
            style={styles.userInfoSection}
            onPress={() => props.navigation.navigate('profile')}>
            <View style={styles.userWrapper}>
              <Avatar.Image
                source={{
                  uri: props.avatarSrc,
                }}
                size={50}
              />
              <View style={styles.userNameWrapper}>
                <Title style={styles.title}>{props.userName}</Title>
                <Caption style={styles.caption}>{props.email}</Caption>
              </View>
            </View>
          </TouchableRipple>
          <Divider style={styles.divider} />
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Dashboard"
              onPress={() => {
                props.navigation.navigate('tabBar');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="wechat" color={color} size={size} />
              )}
              label="Chat"
              onPress={() => {
                props.navigation.navigate('drawer-chat');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <IonIcon name="settings" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('drawer-setting');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('drawer-support');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Test1"
              onPress={() => {
                props.navigation.navigate('drawer-test1');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Test2"
              onPress={() => {
                props.navigation.navigate('drawer-test2');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section>
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isSwitchOn} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({size, color}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => alert('signed out')}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    paddingTop: 10,
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 15,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameWrapper: {
    marginLeft: 15,
  },
  followWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  title: {},
  caption: {},
  section: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  divider: {
    marginTop: 5,
  },
});

const _DrawerContent = connect(mapStateToProps, null)(DrawerContent);

export default _DrawerContent;
