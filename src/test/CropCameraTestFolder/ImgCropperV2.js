/*
filepath:(react-native-image-crop-picker 给出的path)

 [{"height": 1599, "mime": "image/jpeg", "modificationDate": "1627577191000", "path": "file://
"path": "file:///data/user/0/com.testcropper/cache/react-native-image-crop-picker/8a-b4a9-22952fdf131e827f-ff4c-46aa-b4a9-22952fdf1df7.jpeg", "size": 259107, "width": 899}]



*/

import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
import PhotoManipulator from 'react-native-photo-manipulator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ImgCropperV2(props) {
  const [croppedImg, setCroppedImg] = useState(null);

  const initialPath =
    'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O546507c7-6aa7-4d5b-aab3-89b704165704.png';
  const croppedPath =
    'file:///data/user/0/com.flydocs/cache/RNPM_6828020457820156662.jpg';

  const imgObj = {
    fileName: 'IMG_20210802_134501.jpg',
    height: 1280,
    id: 'b430f577-723b-4a8d-b862-d1c8b017c4a5',
    localIdentifier: 44,
    mime: 'image/jpeg',
    path: 'content://media/external/file/44',
    realPath: '/storage/emulated/0/DCIM/Camera/IMG_20210802_134501.jpg',
    ref: {current: null},
    width: 960,
  };

  const position = {
    bottomLeft: {x: 546, y: 657},
    bottomRight: {x: 546, y: 536},
    dimensions: {height: 1280, width: 720},
    topLeft: {x: 318, y: 665},
    topRight: {x: 317, y: 543},
  };

  const cropRegion1 = {
    x: (position.topRight.x + position.topLeft.x) * 0.5,
    y: (position.bottomRight.y + position.topRight.y) * 0.5,
    width: position.bottomRight.x - position.topRight.x,
    height: position.topLeft.y - position.topRight.y,
  };

  const ratio = cropRegion1.width / cropRegion1.height;

  // const cropRegion = {x: 235, y: 0, height: 1500, width: 441};

  const targetSize = {height: cropRegion1.height, width: cropRegion1.width};

  const handleCrop = async () => {
    try {
      const result = await PhotoManipulator.crop(
        initialPath,
        cropRegion1,
        targetSize,
      );
      console.log(result);
      setCroppedImg(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button title="crop" onPress={handleCrop} />
      <ScrollView style={{marginTop: 10}}>
        {croppedImg ? (
          <Image
            source={{uri: croppedImg}}
            style={{
              width: windowWidth * 0.7,
              height: (windowWidth * 0.7) / ratio,
              alignSelf: 'center',
            }}
          />
        ) : (
          <Text>no pic</Text>
        )}
        <Image
          source={{uri: croppedPath}}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
      </ScrollView>
    </View>
  );
}
