import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {DimensionsHeight, DimensionsWidth} from '../utils/dimension';

export default function FileNameModal({visible, children}) {
  const [showModal, setShowModal] = useState(visible);
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text>{visible ? 'true' : 'false'}</Text>
          <Button title="close" onPress={() => setShowModal(false)} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    bottom: 200,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 2,
  },
});
