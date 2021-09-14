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
    fileName: '831e827f-ff4c-46aa-b4a9-22952fdf1df7.jpeg',
    height: 1599,
    id: 'da50e956-0e25-4980-8340-e17ca3fbcb32',
    localIdentifier: 40,
    mime: 'image/jpeg',
    path: 'content://media/external/file/40',
    realPath:
      '/storage/emulated/0/Download/831e827f-ff4c-46aa-b4a9-22952fdf1df7.jpeg',
    ref: {current: null},
    width: 899,
  };

  const position = {
    bottomLeft: {x: 232.22337328946148, y: 1437.213149861936},
    bottomRight: {x: 690.8702873441907, y: 1433.8660937344584},
    height: 1599,
    topLeft: {x: 231.4003189705036, y: 63.50644774530776},
    topRight: {x: 686.7550681432087, y: 61.03726677806292},
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
