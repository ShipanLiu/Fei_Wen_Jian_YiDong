import React, {useState, useEffect, useRef} from 'react';
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
import AppButton from '../components/AppButton';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-simple-action-button';

export default function PreviewScreen({navigation, route}) {
  const [imgArr, setImgArr] = useState([]);
  const [currentId, setCurrentId] = useState();
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const onViewRef = useRef(viewableItems => {
    console.log(viewableItems);
  });

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

  const onViewableItemsChanged = ({viewableItems, changed}) => {
    console.log('Visible items are', viewableItems);
    console.log('Changed in this iteration', changed);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          {/* <Icon name="more-vert" size={30} color="#000" style={styles.imageIcon}/> */}
          <Image
            style={styles.image}
            source={{uri: item.croppedImage}}
            resizeMode="contain"
          />
        </View>
      </View>
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
        onEndReached={() => console.log('End reached')}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
      />
      <Text>{currentId}</Text>
      <View>
        <AppButton title="done" onPress={handleTest} />
      </View>
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
    height: DimensionsHeight * 0.75,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
