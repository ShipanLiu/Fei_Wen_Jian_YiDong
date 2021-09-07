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
import {connect} from 'react-redux';

import {SWITCH} from '../../reducers/signature/actions';
import {DimensionsHeight, DimensionsWidth} from '../../utils/dimension';

const mapDispatchToProps = (dispatch, props) => ({
  switchSignature: newSignature => {
    dispatch({
      type: SWITCH,
      payload: {
        signature: newSignature,
      },
    });
  },
});

function CreateSignature(props) {
  /* inside props there are stateFromReducer and switchSignature function. */
  const signatureRef = useRef(null);
  const {setModalVisible} = props;

  const handleOK = newSignature => {
    // the image Type is 'image/png' base64
    props.switchSignature(newSignature);
    setModalVisible(false);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleTest = async () => {
    console.log(props);
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
      />
      <Button mode="contained" onPress={handleTest}>
        test
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  signatureWrapper: {
    marginTop: 10,
    width: DimensionsWidth - 40,
  },
});

const _CreateSignature = connect(null, mapDispatchToProps)(CreateSignature);

export default _CreateSignature;
