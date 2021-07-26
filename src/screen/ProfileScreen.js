import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function ProfileScreen(props) {
  return (
    <View style={styles.container}>
      <Text>this is Profile Screen</Text>
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
