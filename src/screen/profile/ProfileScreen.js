import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, SafeAreaView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  const getUserInfo = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      if (allKeys.includes('profile')) {
        const value = await AsyncStorage.getItem('profile');
        const userInfoObj = JSON.parse(value);
        setAvatarSrc(userInfoObj.avatarSrc);
        setUserName(userInfoObj.userName);
        setEmail(userInfoObj.email);
        setPhone(userInfoObj.phone);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Avatar.Image
          source={{
            uri: avatarSrc,
          }}
          size={80}
        />
        <View style={styles.userNameWrapper}>
          <Title style={styles.titleStyle}>{userName}</Title>
        </View>
      </View>
      {/* location email area */}
      <View style={styles.subInformation}>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>{phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>{email}</Text>
        </View>
      </View>
      {/* file amount area */}
      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: '#dddddd',
              borderRightWidth: 1,
            },
          ]}>
          <Title style={styles.titleStyle}>54</Title>
          <Caption style={styles.captionStyle}>files</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={styles.titleStyle}>12</Title>
          <Caption style={styles.captionStyle}>shared</Caption>
        </View>
      </View>
      {/* Menu area */}

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <FontAwesome5 name="signature" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>My Signature</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons name="md-bookmark-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Your Marks</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons name="settings-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons
              name="md-share-social-outline"
              color="#FF6347"
              size={25}
            />
            <Text style={styles.menuItemText}>Tell This App</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  userNameWrapper: {
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  subInformation: {
    marginTop: 20,
    marginLeft: 30,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    marginTop: 20,
  },
  captionStyle: {
    fontSize: 15,
  },
  titleStyle: {
    fontSize: 25,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
