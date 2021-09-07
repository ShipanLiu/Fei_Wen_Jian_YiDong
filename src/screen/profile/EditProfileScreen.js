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
import {connect} from 'react-redux';

import {UPDATEPROFILE} from '../../reducers/profile/actions';
import _SignatureScreen from '../others/SignatureScreen';

const mapStateToProps = (state, props) => {
  // const {avatarSrc, userName, email, phone} = state.profileReducer;
  // return {avatarSrc, userName, email, phone};
  return {...state.profileReducer};
};

const mapDispatchToProps = (dispatch, props) => ({
  updateProfile: newProfileObj => {
    console.log(typeof newProfileObj);
    dispatch({
      type: UPDATEPROFILE,
      payload: newProfileObj,
    });
  },
});
function EditProfileScreen(props) {
  const {navigation} = props;

  const [userInfoObj, setUserInfoObj] = useState({
    userName: props.userName,
    phone: props.phone,
    email: props.email,
    avatarSrc: props.avatarSrc,
  });

  const bs = useRef(null);
  const fall = new Animated.Value(1);

  useEffect(() => {
    getLibraryPermission();
    getCameraPermission();
  }, []);

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
      props.updateProfile(userInfoObj);
      navigation.navigate('tabBar');
      navigation.openDrawer();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTest = () => {
    console.log(props);
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
    <SafeAreaView style={styles.container}>
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
            {props.userName}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-circle-o" color="#000" size={20} />
          <TextInput
            onChangeText={value =>
              setUserInfoObj(preValue => ({...preValue, userName: value}))
            }
            value={userInfoObj.userName}
            placeholder="User Name"
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
            placeholder="Phone"
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
            placeholder="Emial"
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
    </SafeAreaView>
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

const _EditProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileScreen);

export default _EditProfileScreen;
