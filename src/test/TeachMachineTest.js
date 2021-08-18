/*

import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
decodeJpeg 函数可以代替 imageToTensor（）


假如使用第三方库的话，比如： @tensorflow-models/mobilenet
可以：   const model = await mobilenet.load();


imageTensor:
 {"dataId": {"id": 3056}, "dtype": "int32", "id": 2900, "isDisposedInternal": false,
"kept": false, "rankType": "4", "scopeId": 1222, "shape": [1, 224, 224, 3], "size": 150528, "strides": [150528, 672, 3]}
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
import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from './helpers/tensor-helper';
import {cropPicture} from './helpers/image-helper';

LogBox.ignoreLogs(['Require cycle:']);

export default function TeachMachineTest(props) {
  const [url, setUrl] = useState(
    'https://www.appointmed.com/blog/wp-content/uploads/2017/11/rechnung-merkmale-appointmed.png',
  );
  const [displayText, setDisplayText] = useState('loading');

  const getPrediction = async url => {
    try {
      setDisplayText('Loading Tensor Flow...');
      const model = await getModel();
      setDisplayText('fetching url');
      setDisplayText('resizing image');
      const croppedData = await cropPicture(url);
      setDisplayText('creating tensor');
      const tensor = await convertBase64ToTensor(croppedData.base64);
      console.log(tensor);
      setDisplayText('predcting....');
      const prediction = await startPrediction(model, tensor);
      console.log(prediction);
      setDisplayText(prediction);
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
