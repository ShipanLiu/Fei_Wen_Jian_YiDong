import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function App(props) {
  return (
    <View style={styles.container}>
      <Text>jiba</Text>
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
