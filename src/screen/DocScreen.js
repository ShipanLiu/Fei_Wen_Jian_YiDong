import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function DocScreen(props) {
  return (
    <View style={styles.container}>
      <Text>here is docs screen</Text>
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
