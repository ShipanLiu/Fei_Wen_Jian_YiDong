import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import Signature from 'react-native-signature-canvas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DimensionsHeight, DimensionsWidth} from '../../utils/dimension';

export default function CreateSignature({setModalVisible}) {
  const [signature, setSignature] = useState([]);
  const signatureRef = useRef(null);

  useEffect(() => {
    FetchSignatureFromStore();
  }, []);

  const FetchSignatureFromStore = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      if (allKeys.includes('signature')) {
        const jsonValue = await AsyncStorage.getItem('signature');
        setSignature(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOK = async newSignature => {
    //  the image Type is 'image/png'
    // console.log(signature);
    try {
      const newArr = [...signature, newSignature];
      const StringValue = JSON.stringify(newArr);
      await AsyncStorage.setItem('signature', StringValue);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  //  only calls after ref.current.getData()
  const handleData = data => {
    // console.log(data);
  };

  const handleTest = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    console.log(allKeys);
  };

  //  for customizing the buttons
  const webStyle = `
    // .m-signature-pad--footer
    // .button {
    //   background-color: red;
    //   color: #FFF;
    // }
    // .m-signature-pad--footer {
    //   display: none
    //   margin: 0px;
    // }
    `;

  return (
    <View style={styles.container}>
      <Signature
        style={styles.signatureWrapper}
        ref={signatureRef}
        onOK={handleOK}
        onEmpty={handleEmpty}
        descriptionText="Create A New Signature"
        clearText="Clear"
        confirmText="Save"
        webStyle={webStyle}
        autoClear={true}
        onGetData={handleData}
      />
      <Button mode="contained" onPress={handleTest}>
        test
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  signatureWrapper: {
    marginTop: 10,
    width: DimensionsWidth - 40,
  },
});
