import React, {useState, useRef} from 'react';
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

import {DimensionsHeight} from '../../utils/dimension';

export default function SignatureScreen(props) {
  const [signature, setSign] = useState(null);
  const signatureRef = useRef();

  const handleOK = signature => {
    //  the image Type is 'image/png'
    setSign(signature);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleData = data => {
    console.log(data);
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
      <Button mode="contained" onPress={() => signatureRef.current.getData()}>
        getData
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureWrapper: {
    borderWidth: 2,
  },
});
