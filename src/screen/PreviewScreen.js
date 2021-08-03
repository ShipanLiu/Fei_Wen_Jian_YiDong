import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';

import AppButton from '../components/AppButton';

export default function PreviewScreen({route, navigation}) {
  const {imgObj} = route.params;
  console.log(imgObj);
  return (
    <View style={styles.container}>
      {/* <View style={{width: 300, height: 250}}>
        <Image
          source={{uri: imgObj.initialImage}}
          style={{width: '100%', height: '100%'}}
        />
      </View> */}
      <View style={{width: 200, height: 300}}>
        <Image
          // the key of checking a cropped image!!!!!
          resizeMode="contain"
          source={{uri: imgObj.croppedImage}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <AppButton
        title="camera"
        onPress={() => navigation.navigate('camera', {openCam: 'open'})}
      />
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
