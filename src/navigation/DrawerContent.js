import React, {useState} from 'react';
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

export default function DrawerContent(props) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const toggleTheme = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.userWrapper}>
              <Avatar.Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
                }}
                size={50}
              />
              <View style={styles.userNameWrapper}>
                <Title style={styles.title}>Shipan Liu</Title>
                <Caption style={styles.caption}>
                  liushipan1998@gmail.com
                </Caption>
              </View>
            </View>
            <View style={styles.followWrapper}>
              <View style={styles.section}>
                <Paragraph style={styles.paragraph}>52</Paragraph>
                <Caption>following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={styles.paragraph}>31</Paragraph>
                <Caption>Followers</Caption>
              </View>
            </View>
          </View>
          <Divider style={styles.divider} />
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                // props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                // props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Bookmarks"
              onPress={() => {
                // props.navigation.navigate('BookmarkScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <IonIcon name="settings" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                // props.navigation.navigate('SettingsScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                // props.navigation.navigate('SupportScreen');
              }}
            />
          </Drawer.Section>
          <Divider />
          <Drawer.Section>
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
          </Drawer.Section>
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
