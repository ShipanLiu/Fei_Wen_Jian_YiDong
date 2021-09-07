import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Text, Button, TouchableRipple} from 'react-native-paper';
import {connect} from 'react-redux';

import {DimensionsHeight} from '../../utils/dimension';
import CreateSignature from './CreateSignature';

const mapStateToProps = (state, props) => {
  const {signature} = state.signatureReducer;
  return {signature: signature};
};

function SignatureScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleTest = () => {
    console.log(props.signature);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalWrapper}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <CreateSignature setModalVisible={setModalVisible} />
          </View>
        </Modal>
      </View>
      <View style={[styles.row, styles.buttonWrapper]}>
        <Button
          mode="contained"
          onPress={() => setModalVisible(true)}
          uppercase={false}>
          Switch
        </Button>
        <Button mode="contained" onPress={handleTest} uppercase={false}>
          test
        </Button>
      </View>
      <View style={styles.signatureWrapper}>
        <View style={styles.itemWrapper}>
          <Image
            resizeMode="contain"
            source={{
              uri: props.signature,
            }}
            style={styles.itemImage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  signatureWrapper: {
    // height: DimensionsHeight / 8,
    // borderWidth: 1,
    // borderRadius: 20,
    flex: 1,
  },
  itemWrapper: {
    marginTop: 10,
    height: DimensionsHeight / 8,
    borderRadius: 5,
    borderWidth: 1,
  },
  itemImage: {
    height: '100%',
  },
  modalWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderWidth: 3,
    // marginTop: DimensionsHeight / 4,
    marginHorizontal: 10,
    // height: DimensionsHeight / 2,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const _SignatureScreen = connect(mapStateToProps, null)(SignatureScreen);

export default _SignatureScreen;
