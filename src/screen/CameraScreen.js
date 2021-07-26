import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function CameraScreen(props) {
  return (
    <View style={styles.container}>
      <Text>this is Camera Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
