/*
image picker data format:

[{"bucketId": -1739773001, "chooseModel": 1, "duration": 0, "fileName": "IMG_20210726_200932.jpg",
 "height": 1280, "localIdentifier": 32, "mime": "image/jpeg", "parentFolderName": "Camera",
  "path": "content://media/external/file/32", "position": 1,
  "realPath": "/storage/emulated/0/DCIM/Camera/IMG_20210726_200932.jpg",
   "size": 123428, "type": "image", "width": 960}]


add estra image:  get fileID --> display photos(+ recrop) ---> merge into Local Storage
*/

import React, {useEffect, useContext, useState} from 'react';
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
import {useIsFocused} from '@react-navigation/native';

import AppButton from '../components/AppButton';
import {DimensionsWidth, DimensionsHeight} from '../utils/dimension';
import {ImageContext} from '../store/context/ImageContext';
import {extraImageContext} from '../store/context/extraImageContext';
import FileNameModal from '../components/FileNameModal';

import * as actions from '../store/actions/actions';

export default function DocScreen({navigation, route}) {
  const {state, dispatch} = useContext(ImageContext);
  const [imgArr, setImgArr] = useState([]);
  // if for extra image, the fileId exists, in other cases, it is null
  const [fileId, setFileId] = useState();
  const [showModal, setShowModal] = useState(false);
  const {state: extraImageState, dispatch: extraImagedispatch} =
    useContext(extraImageContext);

  const isFocused = useIsFocused;

  useEffect(() => {
    getFileIdFromRoute();
  }, [isFocused]);

  const getFileIdFromRoute = () => {
    if (route.params) {
      setFileId(route.params.fileId);
    }
  };

  const handleReCrop = id => {
    if (fileId) {
      navigation.navigate('recrop', {
        id: id,
        fileId: fileId,
      });
    } else {
      navigation.navigate('recrop', {
        id: id,
        fileId: undefined,
      });
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleUpload = async value => {
    try {
      // openModal()
      const jsonValue = JSON.stringify(value);
      const key = `file${Date.now()}`;
      await AsyncStorage.setItem(key, jsonValue);
      navigation.navigate('docs', {
        id: key,
        index: undefined,
        fromCamera: true,
      });
      dispatch({type: actions.REMOVE});
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddExtraImage = async value => {
    // AsyncStorage Merge
    try {
      const jsonImgArr = await AsyncStorage.getItem(fileId);
      const parsedImgArr = JSON.parse(jsonImgArr);
      const concatArr = [...parsedImgArr, ...value];
      Alert.alert('SAVE', 'Are you sure', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            console.log('erst: ' + imgArr);
            console.log('zweite' + value);
            const jsonValue = JSON.stringify(concatArr);
            await AsyncStorage.setItem(fileId, jsonValue);
            navigation.navigate('gallery', {
              id: fileId,
              fileId: fileId,
              index: parsedImgArr.length - 1,
            });
            extraImagedispatch({type: actions.REMOVE});
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (fileId) {
      handleAddExtraImage(extraImageState);
    } else {
      handleUpload(state);
    }
  };

  const handleTest = () => {
    // console.log(fileId);
    // console.log(extraImageState);
    // console.log(state);
    // console.log(imgArr);
    setShowModal(true);
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
      <FileNameModal visible={showModal} />
      <View style={styles.fileContainer}>
        {/* if we want add extra image, then wen should display the state in extraImageContext */}
        <FlatList
          data={fileId ? extraImageState : state}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.uploadBtn}>
          <AppButton
            title={fileId ? 'add to queue' : 'update'}
            onPress={handleClick}
          />
          <AppButton title="test" onPress={handleTest} />
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
    flexDirection: 'row',
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

// const zweite =
