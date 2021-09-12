/*
  teachable machine need 4D, while  other tensor models like mobilnet requires 3D

  this file is testing *********teachable machine model***********


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
  fetch as tfFetch,
  bundleResourceIO,
  decodeJpeg,
} from '@tensorflow/tfjs-react-native';
import * as tmImage from '@teachablemachine/image';
import * as jpeg from 'jpeg-js';

LogBox.ignoreLogs(['Require cycle:']);

export default function TeachMachineTest({navigation}) {
  const [url, setUrl] = useState(
    'https://c0.wallpaperflare.com/preview/802/1021/127/colored-pencils-pens-crayons-colour-pencils.jpg',
  );
  const [model, setModel] = useState();
  const [displayText, setDisplayText] = useState('click to start');

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    await tf.ready();
    const modelJson = await require('./model/model.json');
    const modelWeights = await require('./model/weights.bin');
    const myModel = await tf.loadLayersModel(
      bundleResourceIO(modelJson, modelWeights),
    );
    setModel(myModel);
  };

  function imageToTensor(rawImageData) {
    //Function to convert jpeg image to tensors
    const TO_UINT8ARRAY = true;
    const {width, height, data} = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }
    return tf.tensor3d(buffer, [height, width, 3]);
  }

  const getPrediction = async url => {
    //  第二种办法就是不用fetch， 直接转成base64.
    try {
      /**************first method to create a tensor + predict*********************  */

      // setDisplayText('fetching...');
      // const response = await tfFetch(url, {}, {isBinary: true});
      // const imageDataArrayBuffer = await response.arrayBuffer();
      // setDisplayText('creating tensor');
      // const imageTensor = imageToTensor(imageDataArrayBuffer)
      //   .resizeBilinear([224, 224])
      //   .reshape([1, 224, 224, 3]);
      // setDisplayText('predicting.....');
      // const prediction = await model.predict(imageTensor);
      // // const res = await prediction.data();
      // setDisplayText('done!!!');
      // const res = await prediction.data();
      // console.log(res);

      /*******************second method to create a tensor + predict********************* */

      setDisplayText('fetching...');
      const response = await tfFetch(url, {}, {isBinary: true});
      const imageDataArrayBuffer = await response.arrayBuffer();
      const imageData = new Uint8Array(imageDataArrayBuffer);
      setDisplayText('creating tensor...');
      const imageTensor = decodeJpeg(imageData);
      setDisplayText('resizing tensor...');
      const re = imageTensor
        .resizeBilinear([224, 224])
        .reshape([1, 224, 224, 3]);
      setDisplayText('predicting.....');
      const prediction = await model.predict(re);
      // const res = await prediction.data();
      setDisplayText('done!!!');
      const res = await prediction.data();
      console.log(res);
    } catch (error) {
      console.log(error);
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
      <Button title="test" onPress={() => {}} />
      <Button
        title="go to test ts/mobilenet"
        onPress={() => navigation.navigate('test3')}
      />
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
