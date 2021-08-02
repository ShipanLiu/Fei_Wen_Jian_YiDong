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

  const imgObj = {
    fileName: 'IMG_9290.jpeg',
    height: 3024,
    id: 'cfc022f8-0685-42db-bba1-699a3a3f8f71',
    localIdentifier: 43,
    mime: 'image/jpeg',
    path: 'content://media/external/file/43',
    realPath: '/storage/emulated/0/Download/IMG_9290.jpeg',
    ref: {current: null},
    width: 4032,
  };

  const position = {
    bottomLeft: {x: 100.02365965357532, y: 1284.0206557026615},
    bottomRight: {x: 754.1497749964396, y: 1310.5767014397516},
    height: 1599,
    topLeft: {x: 85.72717102942643, y: 86.57768843571344},
    topRight: {x: 830.3060600916546, y: 203.1228390705806},
    width: 899,
  };

  const cropRegion1 = {
    x: (position.bottomLeft.x + position.topLeft.x) * 0.5,
    y: (position.topLeft.y + position.topRight.y) * 0.5,
    width: position.topRight.x - position.topLeft.x,
    height: position.bottomLeft.y - position.topLeft.y,
  };

  const ratio = cropRegion1.width / cropRegion1.height;

  // const cropRegion = {x: 235, y: 0, height: 1500, width: 441};

  const targetSize = {height: cropRegion1.height, width: cropRegion1.width};

  const handleCrop = async () => {
    try {
      const result = await PhotoManipulator.crop(
        imgObj.path,
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
      </ScrollView>
    </View>
  );
}
