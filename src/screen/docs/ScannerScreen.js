/*
 {"bottomLeft": {"x": 511, "y": 730}, "bottomRight": {"x": 507, "y": 521},
"dimensions": {"height": 1280, "width": 720}, "topLeft": {"x": 347, "y": 721}, "topRight": {"x": 348, "y": 449}}


problem: if the coordinates aren't detected, it will use the default coordinates.
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
} from 'react-native';
import uuid from 'react-native-uuid';
import PhotoManipulator from 'react-native-photo-manipulator';

import RectScanner from '../../components/scanner/RectScanner';
import CustomCrop from '../../components/scanner/Cropper';
import AppIcon from '../../components/AppIcon';
import AppButton from '../../components/AppButton';
import {ImageContext} from '../../store/context/ImageContext';
import {extraImageContext} from '../../store/context/extraImageContext';
import * as actions from '../../store/actions/actions';
// import * as ImageManipulator from 'expo-image-manipulator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TestV1({route, navigation}) {
  const [takenPhoto, setTakenPhoto] = useState(null);
  // const [savePhoto, setSavePhoto] = useState([]);
  const [oldCoordinates, setOldCoordinates] = useState(null);
  const [size, setSize] = useState({height: 1280, width: 720});
  const [isAddExtraImage, setIsAddExtraImage] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [reRender, setRerender] = useState(false);
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

  const createRectangle = data => ({
    topLeft: data.topRight,
    topRight: data.bottomRight,
    bottomRight: data.bottomLeft,
    bottomLeft: data.topLeft,
  });

  const createBottomLeft = (modifiedRectAngle, size) => {
    if (
      modifiedRectAngle['bottomLeft'].x < 70 ||
      modifiedRectAngle['bottomLeft'].y > size.height - 70
    ) {
      if (
        modifiedRectAngle['bottomLeft'].x < 70 &&
        modifiedRectAngle['bottomLeft'].y > size.height - 70
      ) {
        return {x: 75, y: size.height - 75};
      } else if (modifiedRectAngle['bottomLeft'].x < 70) {
        return {x: 75, y: modifiedRectAngle['bottomLeft'].y};
      } else if (modifiedRectAngle['bottomLeft'].y > size.height - 70) {
        return {x: modifiedRectAngle['bottomLeft'].x, y: size.height - 70};
      }
    } else {
      return modifiedRectAngle['bottomLeft'];
    }
  };
  const createBottomRight = (modifiedRectAngle, size) => {
    if (
      modifiedRectAngle['bottomRight'].x > size.width - 70 ||
      modifiedRectAngle['bottomRight'].y > size.height - 70
    ) {
      if (
        modifiedRectAngle['bottomRight'].x > size.width - 70 &&
        modifiedRectAngle['bottomRight'].y > size.height - 70
      ) {
        return {x: size.width - 70, y: size.height - 70};
      } else if (modifiedRectAngle['bottomRight'].x > size.width - 70) {
        return {x: size.width - 70, y: modifiedRectAngle['bottomRight'].y};
      } else if (modifiedRectAngle['bottomRight'].y > size.height - 70) {
        return {x: modifiedRectAngle['bottomRight'].x, y: size.height - 70};
      }
    } else {
      return modifiedRectAngle['bottomRight'];
    }
  };

  //  TODO:   调整cropper的预览。
  const getCoordination = detectedRectangle => {
    const modifiedRectAngle = createRectangle(detectedRectangle);
    console.log(modifiedRectAngle);
    const size = detectedRectangle.dimensions;
    const bottomLeft =
      detectedRectangle && createBottomLeft(modifiedRectAngle, size);
    const bottomRight =
      detectedRectangle && createBottomRight(modifiedRectAngle, size);
    setOldCoordinates({bottomLeft, bottomRight, ...modifiedRectAngle});
    // setOldCoordinates(modifiedRectAngle);
    setSize(size);
    // TODO: write some angorithms and keep the corner above the bottom
    // console.log(createRectangle(detectedRectangle));
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
    // crop image by using photoManipulator module
    const targetSize = {
      // height: (size.width * size.height) / rectRegion.width,
      height: size.height,
      width: (size.height / rectRegion.height) * rectRegion.width,
    };
    const croppedImageUri = await photoManipulator(
      takenPhoto.initialImage,
      rectRegion,
      targetSize,
    );

    // const actions = [
    //   {
    //     crop: {
    //       originX: newCoordinates.x,
    //       originY: newCoordinates.y,
    //       width: newCoordinates.width,
    //       height: newCoordinates.height,
    //     },
    //   },
    //   {
    //     resize: {
    //       width: ,
    //       height: BITMAP_DIMENSION,
    //     },
    //   },
    // ];
    // const saveOptions = {
    //   compress: 1,
    //   format: ImageManipulator.SaveFormat.JPEG,
    //   base64: true,
    // };

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
          height: size.height,
          width: size.width,
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
          height: size.height,
          width: size.width,
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

  const handleRerender = () => {
    console.log('iba');
    setRerender(preValue => !preValue);
  };

  const handleTest = () => {
    console.log(oldCoordinates);
    console.log(size);
  };

  return (
    <>
      {takenPhoto ? (
        <View>
          <View style={styles.cropperContainer}>
            {/* <Image
              source={{
                uri: 'file:///data/user/0/com.flydocs/cache/RNPM_667537366268245670.jpg',
              }}
              style={{width: 200, height: 200}}
            /> */}
            {takenPhoto.initialImage && (
              <View style={styles.customCropWrapper}>
                <View style={styles.doneButton}>
                  <TouchableOpacity onPress={handleDone}>
                    <AppIcon
                      name="check"
                      size={40}
                      iconColor="tomato"
                      backgroundColor="#fff"
                    />
                  </TouchableOpacity>
                </View>
                <CustomCrop
                  // updateImage={this.updateImage.bind(this)}
                  rectangleCoordinates={oldCoordinates}
                  initialImage={takenPhoto.initialImage}
                  height={size.height}
                  width={size.width}
                  ref={cropperRef}
                  overlayColor="rgba(18,190,210, 1)"
                  overlayStrokeColor="rgba(20,190,210, 1)"
                  handlerColor="rgba(20,150,160, 1)"
                  enablePanStrict={false}
                />

                <View style={styles.controlContainer}>
                  <TouchableOpacity
                    style={styles.controlIcon}
                    onPress={() => setTakenPhoto(null)}>
                    <AppIcon
                      name="redo-variant"
                      size={40}
                      iconColor="tomato"
                      backgroundColor="#fff"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.controlIcon}
                    onPress={handleRerender}>
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
                  <TouchableOpacity style={styles.controlIcon}>
                    <AppButton title="test" size={40} onPress={handleTest} />
                    {/* <Text style={styles.iconText}>More</Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
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
  customCrop: {
    flex: 1,
    bottom: 90,
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 15,
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
});
