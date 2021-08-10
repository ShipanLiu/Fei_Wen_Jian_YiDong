import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import {DimensionsHeight, DimensionsWidth} from '../utils/dimension';

export default function PreviewScreen({navigation, route}) {
  const [imgArr, setImgArr] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getImageArr();
  }, [isFocused]);

  const getImageArr = async () => {
    const {id} = route.params;
    const jsonArr = await AsyncStorage.getItem(id);
    const imageArray = JSON.parse(jsonArr);
    setImgArr(imageArray);
  };

  const handleTest = () => {
    console.log(imgArr);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => alert('touched')}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{uri: item.croppedImage}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={imgArr}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      {/* <Button title="test" onPress={handleTest} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  imageWrapper: {
    borderWidth: 3,
    width: DimensionsWidth,
    height: DimensionsHeight * 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
