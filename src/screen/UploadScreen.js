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
// import {imgArr} from '../modal/data';

import AppButton from '../components/AppButton';
import {DimensionsWidth, DimensionsHeight} from '../utils/dimension';
import {ImageContext} from '../store/context/ImageContext';

export default function DocScreen({navigation}) {
  const {state, dispatch} = useContext(ImageContext);
  console.log(state);

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
          <AppButton title="upload" />
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
    height: DimensionsHeight * 0.8,
    borderWidth: 2,
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
  fileImageContainer: {
    width: DimensionsWidth * 0.8,
    height: DimensionsHeight * 0.8,
  },
  fileImage: {
    height: '100%',
    width: '100%',
  },
  uploadBtn: {
    alignSelf: 'center',
    width: DimensionsWidth / 3,
  },
});
