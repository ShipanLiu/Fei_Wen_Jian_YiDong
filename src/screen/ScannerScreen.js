/*
 {"bottomLeft": {"x": 511, "y": 730}, "bottomRight": {"x": 507, "y": 521},
"dimensions": {"height": 1280, "width": 720}, "topLeft": {"x": 347, "y": 721}, "topRight": {"x": 348, "y": 449}}

*/

import React, {useState, useRef, useEffect} from 'react';
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

import RectScanner from '../components/scanner/RectScanner';
import CustomCrop from '../components/scanner/Cropper';
import AppIcon from '../components/AppIcon';
import colors from '../utils/colors';
import PhotoManipulator from 'react-native-photo-manipulator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TestV1({route, navigation}) {
  const [takenPhoto, setTakenPhoto] = useState(null);
  const [savePhoto, setSavePhoto] = useState([]);
  const [oldCoordinates, setOldCoordinates] = useState(null);
  const [size, setSize] = useState({height: 1280, width: 720});
  const cropperRef = useRef(null);

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

  //  TODO:   调整cropper的预览。
  const getCoordination = detectedRectangle => {
    setOldCoordinates(createRectangle(detectedRectangle));
    setSize(detectedRectangle.dimensions);
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
    const targetSize = {
      height: rectRegion.height,
      width: rectRegion.width,
    };
    const croppedImageUri = await photoManipulator(
      takenPhoto.initialImage,
      rectRegion,
      targetSize,
    );

    setSavePhoto(preValue => [
      ...preValue,
      {
        id: uuid.v4(),
        coordinates: newCoordinates,
        initialImage: takenPhoto.initialImage,
        croppedImage: croppedImageUri,
        height: size.height,
        width: size.width,
      },
    ]);

    // navigation.navigate('preview', {
    //   imgObj: {
    //     id: uuid.v4(),
    //     coordinates: newCoordinates,
    //     initialImage: takenPhoto.initialImage,
    //     croppedImage: croppedImageUri,
    //     height: size.height,
    //     width: size.width,
    //   },
    // });

    // reopen the camera
    setTakenPhoto(null);
  };

  console.log(savePhoto);

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
                    <Text style={styles.iconText}>Retake</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.controlIcon}
                    onPress={() => {
                      cropAction();
                      navigation.navigate('upload', {
                        imgArr: savePhoto,
                      });
                    }}>
                    <Text style={styles.iconText}>Done!</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.controlIcon}
                    onPress={cropAction}>
                    <AppIcon
                      name="thumb-up-outline"
                      size={40}
                      iconColor="tomato"
                      backgroundColor="#fff"
                    />
                    <Text style={styles.iconText}>More</Text>
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
  controlContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  controlIcon: {
    paddingHorizontal: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
  },
});
