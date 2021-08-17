/*

import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
decodeJpeg 函数可以代替 imageToTensor（）


假如使用第三方库的话，比如： @tensorflow-models/mobilenet
可以：   const model = await mobilenet.load();

*/

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
  LogBox,
} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import {
  fetch,
  bundleResourceIO,
  decodeJpeg,
} from '@tensorflow/tfjs-react-native';
import '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as jpeg from 'jpeg-js';
import ImgToBase64 from 'react-native-image-base64';
import Base64Arraybuffer from 'base64-arraybuffer';
import {Base64Binary} from '../utils/base64Binary';
LogBox.ignoreLogs(['Require cycle:']);

export default function TeachMachineTest(props) {
  const [url, setUrl] = useState(
    'https://www.thespruce.com/thmb/2fz1zlPNq7cj7QkLAtKdqYrKvs0=/3704x2778/smart/filters:no_upscale()/the-difference-between-trees-and-shrubs-3269804-hero-a4000090f0714f59a8ec6201ad250d90.jpg',
  );
  const [displayText, setDisplayText] = useState('loading');
  const [classDetector, setClassDetector] = useState();
  const modelJson = require('../model/model.json');
  const modelWeights = require('../model/weights.bin');
  // 0: channel from JPEG-encoded image
  // 1: gray scale
  // 3: RGB image
  const TENSORFLOW_CHANNEL = 3;
  const BITMAP_DIMENSION = 224;

  const getPrediction = async url => {
    try {
      setDisplayText('Loading Tensor Flow...');
      await tf.ready();
      setDisplayText('Loading Teachable Machine...');

      const model = await tf.loadLayersModel(
        bundleResourceIO(modelJson, modelWeights),
      );
      setDisplayText('fetching image');
      // const response = await fetch(url, {}, {isBinary: true});
      // const imageData = await response.arrayBuffer;
      // const base64 = Base64Arraybuffer.encode(imageData);
      const base64 = await ImgToBase64.getBase64String(url);
      console.log(base64);
      // setDisplayText('creating image tensor');
      // const imageTensor = convertBase64ToTensor(base64);
      setDisplayText('done');
      // setDisplayText('having prediction');
      // console.log(imageTensor);
      // const prediction = await model.predict(imageTensor);
      // setDisplayText('done with prediction');
      // console.log(prediction);
      // setDisplayText(JSON.stringify([prediction]));
    } catch (error) {
      console.log(error);
    }
  };

  const convertBase64ToTensor = async base64 => {
    try {
      const uIntArray = Base64Binary.decode(base64);
      // decode a JPEG-encoded image to a 3D Tensor of dtype
      const decodedImage = decodeJpeg(uIntArray, 3);
      // reshape Tensor into a 4D array
      return decodedImage.reshape([
        1,
        BITMAP_DIMENSION,
        BITMAP_DIMENSION,
        TENSORFLOW_CHANNEL,
      ]);
    } catch (error) {
      console.log('Could not convert base64 string to tesor', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>only works with Jpeg images</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setUrl(text)}
        value={url}
      />
      <Button title="classify Image" onPress={() => getPrediction(url)} />
      <Image style={styles.imageStyle} source={{uri: url}} />
      <Text>{displayText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
});
