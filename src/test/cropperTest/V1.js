import React, {useRef, useState} from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Text,
  View,
  width,
  height,
  ScrollView,
} from 'react-native';
import CustomCrop from './testCropper';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowWidth);

export default function ImgCropper({navigation}) {
  const customCropRef = useRef(null);
  const [initialImages, setImitialImages] = useState(null);
  const [show, setShow] = useState(false);

  const openPicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      console.log(result);
      setImitialImages({
        uri: result.uri,
        height: result.height,
        width: result.width,
      });
      setShow(true);
    } catch (e) {
      console.log(e);
    }
  };

  const crop = () => {
    const newCoordi = customCropRef.current.crop();
    console.log(newCoordi);
    navigation.navigate('test-cropper', {
      coordinates: {
        ...newCoordi,
      },
      image: {
        ...initialImages,
      },
    });
  };

  const handleTest = () => {
    console.log(initialImages);
  };

  return (
    <View>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        <View style={styles.cropperContainer}>
          {/* <Image
            source={{
              uri: 'file:///data/user/0/com.flydocs/cache/ImagePicker/1164e8ef-d147-441c-bdb0-04ebbdd446be.jpg',
            }}
            style={{width: 200, height: 100}}
          /> */}
          {show ? (
            <CustomCrop
              // updateImage={this.updateImage.bind(this)}
              // rectangleCoordinates={this.state.rectangleCoordinates}
              initialImage={initialImages.uri}
              height={initialImages.height}
              width={initialImages.width}
              ref={customCropRef}
              overlayColor="rgba(18,190,210, 1)"
              overlayStrokeColor="rgba(20,190,210, 1)"
              handlerColor="rgba(20,150,160, 1)"
              enablePanStrict={false}
              style={styles.cropper}
            />
          ) : null}
        </View>
        <TouchableOpacity onPress={openPicker} style={styles.pickerBtn}>
          <Text style={{color: 'red'}}>picker</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={crop} style={styles.cropBtn}>
          <Text style={{color: 'red'}}>CROP IMAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTest} style={styles.testBtn}>
          <Text style={{color: 'red'}}>test</Text>
        </TouchableOpacity>
      </ScrollView>
      <Button title="picker" onPress={openPicker} />
      <Button title="to cropper" onPress={openPicker} />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },

  cropperContainer: {
    marginTop: 0,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignContent: 'center',
  },

  cropBtn: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignSelf: 'center',
  },
  testBtn: {
    position: 'absolute',
    bottom: 40,
    right: 150,
    alignSelf: 'center',
  },

  pickerBtn: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'flex-start',
  },
});
