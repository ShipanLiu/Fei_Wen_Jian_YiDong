import React, {useState} from 'react';
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

import {DimensionsHeight} from '../../utils/dimension';

export default function SignatureScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalWrapper}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}></Modal>
      </View>
      <View style={[styles.row, styles.buttonWrapper]}>
        <Button mode="contained">create</Button>
      </View>
      <View style={styles.signatureWrapper}>
        <TouchableRipple>
          <View style={styles.itemWrapper}>
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Signature_of_Ann_Miller.svg/800px-Signature_of_Ann_Miller.svg.png',
              }}
              style={styles.itemImage}
            />
          </View>
        </TouchableRipple>
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
    height: DimensionsHeight / 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  itemWrapper: {},
  itemImage: {
    height: '100%',
  },
});
