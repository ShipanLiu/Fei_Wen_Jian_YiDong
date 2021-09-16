/*
image picker data format:

[{"bucketId": -1739773001, "chooseModel": 1, "duration": 0, "fileName": "IMG_20210726_200932.jpg",
 "height": 1280, "localIdentifier": 32, "mime": "image/jpeg", "parentFolderName": "Camera",
  "path": "content://media/external/file/32", "position": 1,
  "realPath": "/storage/emulated/0/DCIM/Camera/IMG_20210726_200932.jpg",
   "size": 123428, "type": "image", "width": 960}]


add estra image:  get fileID --> display photos(+ recrop) ---> merge into Local Storage

after using Redux:

"totalDocs": [{"content": [Array], "fileID": "file1234566"}, {"content": [Array], "fileID": "file1631190444134"}, {"content": [Array], "fileID": "file1631190612376"}]}



*/

import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';

import AppButton from '../../components/AppButton';
import {DimensionsWidth, DimensionsHeight} from '../../utils/dimension';
import {ImageContext} from '../../store/context/ImageContext';
import {extraImageContext} from '../../store/context/extraImageContext';
import FileNameModal from '../../components/FileNameModal';

import * as actions from '../../store/actions/actions';
import {ADDNEWDOC, ADDPAGES} from '../../reducers/totalDocs/actions';

const mapStateToProps = (state, props) => {
  //  so that the key 'totalDocs' will be added to totalProps
  return {
    totalDocs: [...state.totalDocsReducer],
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  addToTotalDocs: obj => {
    dispatch({
      type: ADDNEWDOC,
      payload: obj,
    });
  },
  addExtraPages: (fileId, extraPagesArr) => {
    dispatch({
      type: ADDPAGES,
      payload: {
        fileId: fileId,
        extraArr: extraPagesArr,
      },
    });
  },
});

function UploadScreen(props) {
  const {navigation, route} = props;

  const [imgArr, setImgArr] = useState([]);
  // if for extra image, the fileId exists, in other cases, it is null
  const [fileId, setFileId] = useState();
  const [showModal, setShowModal] = useState(false);
  const {state, dispatch} = useContext(ImageContext);
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

  //  if the user want recrop, go to recrop screen
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

  const handleUpload = value => {
    // openModal()
    const key = `file${Date.now()}`;
    //  TODO:
    props.addToTotalDocs({
      fileId: key,
      content: value,
    });
    navigation.navigate('docs', {
      id: key,
      index: undefined,
      fromCamera: true,
    });
    //  clear
    dispatch({type: actions.REMOVE});
  };

  const handleAddExtraImage = () => {
    Alert.alert('SAVE', 'Are you sure', [
      {
        text: 'Cancel',
        onPress: () => {
          extraImagedispatch({type: actions.REMOVE});
          console.log('Cancel Pressed');
          //  navigation.navigate('gallery');
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          props.addExtraPages(fileId, extraImageState);
          navigation.navigate('gallery', {
            id: fileId,
            fileId: fileId,
          });
          //  clear the store for using next time
          extraImagedispatch({type: actions.REMOVE});
        },
      },
    ]);
  };

  const handleClick = () => {
    // determine which direction
    if (fileId) {
      handleAddExtraImage();
    } else {
      handleUpload(state);
    }
  };

  const handleTest = () => {
    // setShowModal(true);
    console.log(fileId);
    // console.log(extraImageState);
    console.log(state);
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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

const _UploadScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadScreen);

export default _UploadScreen;
