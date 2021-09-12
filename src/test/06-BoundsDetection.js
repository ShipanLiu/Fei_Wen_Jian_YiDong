import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';

export default function BoundsDetection(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>06-boundsDetection</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
