/*
image picker data format:

[{"bucketId": -1739773001, "chooseModel": 1, "duration": 0, "fileName": "IMG_20210726_200932.jpg",
 "height": 1280, "localIdentifier": 32, "mime": "image/jpeg", "parentFolderName": "Camera",
  "path": "content://media/external/file/32", "position": 1,
  "realPath": "/storage/emulated/0/DCIM/Camera/IMG_20210726_200932.jpg",
   "size": 123428, "type": "image", "width": 960}]

*/

import React, {Component, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import AppButton from '../components/AppButton';
import {DimensionsWidth, DimensionsHeight} from '../utils/dimension';
import {ImageContext} from '../store/context/ImageContext';
import * as actions from '../store/actions/actions';

export default function DocScreen({navigation}) {
  const {state, dispatch} = useContext(ImageContext);

  const handleReCrop = id => {
    navigation.navigate('recrop', {
      id: id,
    });
  };

  const handleUpload = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      const key = `file${Date.now()}`;
      await AsyncStorage.setItem(key, jsonValue);
      Alert.alert('SAVE', 'Are you sure', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('docs', {id: key});
            dispatch({type: actions.REMOVE});
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.fileImageContainer}>
          <Image
            source={{uri: item.croppedImage}}
            resizeMode="contain"
            style={styles.fileImage}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title="ReCrop" onPress={() => handleReCrop(item.id)} />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.fileContainer}>
        <FlatList
          data={state}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.uploadBtn}>
          <AppButton title="upload" onPress={() => handleUpload(state)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileContainer: {flex: 1},
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: DimensionsWidth,
    height: DimensionsHeight * 0.75,
    justifyContent: 'center',
    borderWidth: 1,
  },
  fileImageContainer: {
    width: '100%',
    height: '100%',
  },
  fileImage: {
    height: '100%',
    width: '100%',
  },
  uploadBtn: {
    alignSelf: 'center',
    width: DimensionsWidth / 3,
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
