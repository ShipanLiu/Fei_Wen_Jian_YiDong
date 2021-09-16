/*
 {"bottomLeft": {"x": 511, "y": 730}, "bottomRight": {"x": 507, "y": 521},
"dimensions": {"height": 1280, "width": 720}, "topLeft": {"x": 347, "y": 721}, "topRight": {"x": 348, "y": 449}}

bugs:

if the coordinates are deteced, we could use convert coordinate function(createRectangle)

if the coordinates are not detected, then we will use the initial coordinates, and don't have to use
the convert coordinate function(createRectangle)
*/

import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import uuid from 'react-native-uuid';
import PhotoManipulator from 'react-native-photo-manipulator';

import RectScanner from '../../components/scanner/RectScanner';
import CustomCrop from '../../components/scanner/Cropper';
import AppIcon from '../../components/AppIcon';
import colors from '../../utils/colors';
import {ImageContext} from '../../store/context/ImageContext';
import {extraImageContext} from '../../store/context/extraImageContext';
import * as actions from '../../store/actions/actions';
import {DimensionsHeight, DimensionsWidth} from '../../utils/dimension';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TestV1({route, navigation}) {
  const [takenPhoto, setTakenPhoto] = useState(null);
  // const [savePhoto, setSavePhoto] = useState([]);
  const [oldCoordinates, setOldCoordinates] = useState(null);
  const [size, setSize] = useState({height: 1280, width: 720});
  const [isAddExtraImage, setIsAddExtraImage] = useState(false);
  const [fileId, setFileId] = useState(null);
  const cropperRef = useRef(null);

  const {state, dispatch} = useContext(ImageContext);
  const {state: extraImageState, dispatch: extraImagedispatch} =
    useContext(extraImageContext);

  useEffect(() => {
    if (route.params) {
      setIsAddExtraImage(true);
      setFileId(route.params.fileId);
    }
  }, []);

  const onCancel = () => {
    navigation.navigate('docs');
  };

  const onPictureTaken = () => {
    console.log('44 ---> pic taken!!!');
  };

  const onPictureProcessed = data => {
    setTakenPhoto({
      initialImage: data.initialImage,
      croppedImage: data.croppedImage,
    });
  };

  const createRectangle = data => {
    if (data) {
      return {
        topLeft: data.topRight,
        topRight: data.bottomRight,
        bottomRight: data.bottomLeft,
        bottomLeft: data.topLeft,
      };
    } else {
      //  TODO:
      // return {
      //   topLeft: data.topRight,
      //   topRight: data.bottomRight,
      //   bottomRight: data.bottomLeft,
      //   bottomLeft: data.topLeft,
      // };
    }
  };

  const initialRectangle = data => ({
    topLeft: data.topLeft,
    topRight: data.topRight,
    bottomRight: data.bottomRight,
    bottomLeft: data.bottomLeft,
  });

  const getCoordination = detectedRectangle => {
    setOldCoordinates(createRectangle(detectedRectangle));
    setSize(detectedRectangle?.dimensions);
  };

  const createRectRegion = position => {
    return {
      x: position.topLeft.x,
      y: position.topLeft.y,
      width: position.topRight.x - position.topLeft.x,
      height: position.bottomLeft.y - position.topLeft.y,
    };
  };

  const photoManipulator = async (initialImage, rectRegion, targetSize) => {
    try {
      const result = await PhotoManipulator.crop(
        initialImage,
        rectRegion,
        targetSize,
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const cropAction = async () => {
    const newCoordinates = cropperRef.current.crop();
    const rectRegion = createRectRegion(newCoordinates);
    console.log(newCoordinates);
    const targetSize = {
      height: rectRegion.height,
      width: rectRegion.width,
    };
    const croppedImageUri = await photoManipulator(
      takenPhoto.initialImage,
      rectRegion,
      targetSize,
    );

    // setSavePhoto(preValue => [
    //   ...preValue,
    //   {
    //     id: uuid.v4(),
    //     coordinates: newCoordinates,
    //     initialImage: takenPhoto.initialImage,
    //     croppedImage: croppedImageUri,
    //     height: size.height,
    //     width: size.width,
    //     ratio: rectRegion.width / rectRegion.height,
    //   },
    // ]);

    if (isAddExtraImage) {
      extraImagedispatch({
        type: actions.ADD,
        payload: {
          id: uuid.v4(),
          coordinates: newCoordinates,
          initialImage: takenPhoto.initialImage,
          croppedImage: croppedImageUri,
          height: size ? size.height : 1280,
          width: size ? size.width : 720,
          ratio: rectRegion.width / rectRegion.height,
        },
      });
    } else {
      dispatch({
        type: actions.ADD,
        payload: {
          id: uuid.v4(),
          coordinates: newCoordinates,
          initialImage: takenPhoto.initialImage,
          croppedImage: croppedImageUri,
          height: size ? size.height : 1280,
          width: size ? size.width : 720,
          ratio: rectRegion.width / rectRegion.height,
        },
      });
    }
  };

  const handlePlus = () => {
    cropAction();
    setTakenPhoto(null);
  };

  const handleDone = async () => {
    await cropAction();
    if (isAddExtraImage) {
      setIsAddExtraImage(false);
      navigation.navigate('upload', {fileId: fileId});
    } else {
      navigation.navigate('upload');
    }
  };

  const handleTest = () => {
    console.log('jier');
    console.log(oldCoordinates);
    // const newCoordinates = cropperRef.current.crop();
    // console.log(newCoordinates);
    console.log(size);
  };

  console.log('ScannerScreen rerender 了一次');

  return (
    <>
      {takenPhoto ? (
        <SafeAreaView>
          <View style={styles.cropperContainer}>
            {/* <Image
              source={{
                uri: 'file:///data/user/0/com.flydocs/cache/RNPM_667537366268245670.jpg',
              }}
              style={{width: 200, height: 200}}
            /> */}
            {takenPhoto.initialImage && (
              <View style={styles.customCropWrapper}>
                <View style={[styles.doneButton, {flexDirection: 'row'}]}>
                  <Button title="test" onPress={handleTest} />
                  <TouchableOpacity onPress={handleDone}>
                    <AppIcon
                      name="check"
                      size={40}
                      iconColor="tomato"
                      backgroundColor="#fff"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.customCropStyle}>
                  <CustomCrop
                    // updateImage={this.updateImage.bind(this)}
                    rectangleCoordinates={oldCoordinates}
                    initialImage={takenPhoto.initialImage}
                    height={size ? size.height : 1280}
                    width={size ? size.width : 720}
                    ref={cropperRef}
                    overlayColor="rgba(18,190,210, 1)"
                    overlayStrokeColor="rgba(20,190,210, 1)"
                    handlerColor="rgba(20,150,160, 1)"
                    enablePanStrict={false}
                  />
                </View>

                <View style={styles.controlContainer}>
                  <TouchableOpacity
                    style={styles.controlIcon}
                    onPress={() => {
                      setTakenPhoto(null);
                      setOldCoordinates(null);
                      setSize(null);
                    }}>
                    <AppIcon
                      name="redo-variant"
                      size={40}
                      iconColor="tomato"
                      backgroundColor="#fff"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.controlIcon}
                    onPress={() => cropAction(true)}>
                    <AppIcon
                      name="crop"
                      size={40}
                      iconColor="tomato"
                      backgroundColor="#fff"
                    />
                    {/* <Text style={styles.iconText}>More</Text> */}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.controlIcon}
                    onPress={handlePlus}>
                    <AppIcon
                      name="plus-box"
                      size={40}
                      iconColor="tomato"
                      backgroundColor="#fff"
                    />
                    {/* <Text style={styles.iconText}>More</Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      ) : (
        <RectScanner
          onPictureTaken={onPictureTaken}
          onCancel={onCancel}
          getCoordination={getCoordination}
          onPictureProcessed={onPictureProcessed}
          hideSkip
          cameraIsOn={true}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  croppedImg: {
    width: 200,
    height: 200,
  },
  cropperContainer: {
    marginTop: 0,
    width: windowWidth,
    height: windowHeight,
  },
  customCropWrapper: {
    width: '100%',
    height: '92%',
  },
  controlContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    zIndex: 100,
  },
  controlIcon: {
    marginHorizontal: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#000',
    fontSize: 18,
  },
  doneButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    alignItems: 'center',
    zIndex: 100,
  },
  customCropStyle: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
});
