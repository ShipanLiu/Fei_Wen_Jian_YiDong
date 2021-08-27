import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen({navigation}) {
  const [userInfoObj, setUserInfoObj] = useState({
    userName: null,
    phone: null,
    email: null,
    avatarSrc: null,
  });

  const bs = useRef(null);
  const fall = new Animated.Value(1);

  useEffect(() => {
    getLibraryPermission();
    getCameraPermission();
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      //  if the profile key already exists
      if (allKeys.includes('profile')) {
        const value = await AsyncStorage.getItem('profile');
        const parsedUserInfoObj = JSON.parse(value);
        setUserInfoObj(preValue => ({
          ...preValue,
          avatarSrc: parsedUserInfoObj.avatarSrc,
        }));
        setUserInfoObj(preValue => ({
          ...preValue,
          userName: parsedUserInfoObj.userName,
        }));
        setUserInfoObj(preValue => ({
          ...preValue,
          email: parsedUserInfoObj.email,
        }));
        setUserInfoObj(preValue => ({
          ...preValue,
          phone: parsedUserInfoObj.phone,
        }));
      } else {
        //  if the profile key haven't been set, the set a default value
        setUserInfoObj({
          avatarSrc:
            'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
          userName: null,
          mail: null,
          phone: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLibraryPermission = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync;
    } catch (error) {
      console.log(error);
    }
  };

  const getCameraPermission = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync;
    } catch (error) {
      console.log(error);
    }
  };

  const choosePhotoFromLibrary = async () => {
    try {
      //  close the bottom modal
      bs.current.snapTo(1);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setUserInfoObj(preValue => ({...preValue, avatarSrc: result.uri}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const takePhotoFromCamera = async () => {
    try {
      //  close the bottom modal
      bs.current.snapTo(1);
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setUserInfoObj(preValue => ({...preValue, avatarSrc: result.uri}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const jsonValue = JSON.stringify(userInfoObj);
      AsyncStorage.setItem('profile', jsonValue);
      navigation.navigate('tabBar');
    } catch (error) {}
  };

  const handleTest = () => {
    console.log(userInfoObj);
  };

  //  the inner of bottomSheet
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  // the header of bottomSheet
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          {/* here is the upload open Camera Part */}
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: userInfoObj.avatarSrc,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {userInfoObj.userName}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-circle-o" color="#000" size={20} />
          <TextInput
            onChangeText={value =>
              setUserInfoObj(preValue => ({...preValue, userName: value}))
            }
            value={userInfoObj.userName}
            placeholder={userInfoObj.userName ? '' : 'User Name'}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>

        <View style={styles.action}>
          <Feather name="phone" color="#000" size={20} />
          <TextInput
            onChangeText={value =>
              setUserInfoObj(preValue => ({...preValue, phone: value}))
            }
            value={userInfoObj.phone}
            placeholder={userInfoObj.phone ? '' : 'Phone'}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#000" size={20} />
          <TextInput
            onChangeText={value =>
              setUserInfoObj(preValue => ({...preValue, email: value}))
            }
            value={userInfoObj.email}
            placeholder={userInfoObj.phone ? '' : 'Emial'}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton} onPress={handleTest}>
          <Text style={styles.panelButtonTitle}>test</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
