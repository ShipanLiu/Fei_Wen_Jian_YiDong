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
  TouchableHighlight,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import {DimensionsHeight, DimensionsWidth} from '../utils/dimension';
import AppButton from '../components/AppButton';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-simple-action-button';

export default function PreviewScreen({navigation, route}) {
  const [fileId, setFileId] = useState(null);
  const [imgArr, setImgArr] = useState([]);
  const [currentObj, setCurrentObj] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const onViewRef = useRef(({viewableItems}) => {
    setCurrentObj(viewableItems[0]);
    setCurrentIndex(viewableItems[0].index);
  });
  const flatListRef = useRef(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    getImageArr();
  }, [isFocused]);

  const getImageArr = async () => {
    try {
      const {id} = route.params;
      setFileId(id);
      const jsonArr = await AsyncStorage.getItem(id);
      const imageArray = JSON.parse(jsonArr);
      setImgArr(imageArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    if (imgArr.length === 1) {
      Alert.alert('last photo!!!', 'still delete?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteItem();
          },
        },
      ]);
    } else {
      deleteItem();
    }
  };

  const deleteItem = async () => {
    const filteredImgArr = imgArr.filter(
      imgObj => imgObj.id !== currentObj.item.id,
    );
    // deletedIndex and currentIndex have the same value actually
    const deletedIndex = imgArr.indexOf(currentObj.item);
    setImgArr(filteredImgArr);

    if (filteredImgArr.length === 0) {
      // alter deleting the last photo, it will go to docs screen
      navigation.navigate('docs');
    } else if (deletedIndex === 0) {
      //  if the first image(index = 0) is deleted
      flatListRef.current.scrollToIndex({animated: true, index: 0});
    } else {
      //  if the index of deleted image >= 1
      flatListRef.current.scrollToIndex({
        animated: true,
        index: deletedIndex - 1,
      });
    }
  };

  const syncChangeToStorage = () => {
    // TODO
    console.log('local sync');
  };

  const handleSpring = item => {
    const clickedIndex = imgArr.indexOf(item);
    flatListRef.current.scrollToIndex({animated: true, index: clickedIndex});
  };

  const handleTest = () => {
    console.log(currentIndex);
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

  const renderPreview = ({item}) => {
    const {id, croppedImage} = item;
    return (
      <TouchableHighlight onPress={() => handleSpring(item)}>
        <View
          style={[
            styles.previewItemWrapper,
            {
              borderWidth: item.id === currentObj?.item.id ? 3 : 0,
              borderColor:
                item.id === currentObj?.item.id ? '#05F505' : 'transparent',
            },
          ]}>
          {/* <Text>{id}</Text> */}
          <Image
            source={{uri: croppedImage}}
            resizeMode="cover"
            style={styles.previewImage}
          />
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <FlatList
          data={imgArr}
          keyExtractor={item => item.id}
          renderItem={renderPreview}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={imgArr}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onEndReached={() => console.log(`End reached: ${currentIndex}`)}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        // onContentSizeChange={() =>
        //   flatListRef.current.scrollToIndex({
        //     animated: true,
        //     index: 0,
        //   })
        // }
      />
      <Text>{currentObj?.index}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.singleButtonWrapper}>
          <AppButton title="delete" onPress={handleDelete} />
        </View>
        <View style={styles.singleButtonWrapper}>
          <AppButton title="test" onPress={handleTest} />
        </View>
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
    width: DimensionsWidth,
    height: DimensionsHeight * 0.75,
  },
  image: {
    // backgroundColor: 'pink',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleButtonWrapper: {
    marginHorizontal: 40,
  },
  previewContainer: {
    width: '100%',
    height: DimensionsHeight * 0.1,
    borderWidth: 1,
  },
  previewItemWrapper: {
    borderWidth: 1,
    height: '100%',
    width: DimensionsWidth / 5,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});

//  flatListData(like viewableItems) = [
//   {
//     index: 1,
//     isViewable: true,
//     item: {
//       coordinates: [Object],
//       croppedImage:
//         'file:///data/user/0/com.flydocs/cache/RNPM_7495665075596505288.jpg',
//       height: 1280,
//       id: '4f70617b-ce1a-46bc-b162-18cd1a3f895b',
//       initialImage:
//         'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O23d47691-9e8d-4d62-a52f-8889aedf705f.png',
//       ratio: 0.9390681003584226,
//       width: 720,
//     },
//     key: '4f70617b-ce1a-46bc-b162-18cd1a3f895b',
//   },
// ];

// const imgArr = [
//   {
//     coordinates: {
//       bottomLeft: [Object],
//       bottomRight: [Object],
//       topLeft: [Object],
//       topRight: [Object],
//     },
//     croppedImage:
//       'file:///data/user/0/com.flydocs/cache/RNPM_7764999799947062194.jpg',
//     height: 1280,
//     id: '7efc17d6-bbba-4d6b-a4b0-4262e27afc8c',
//     initialImage:
//       'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/Od495833c-718e-404c-b8e8-577d77a2d1cb.png',
//     ratio: 1.4917620189661966,
//     width: 720,
//   },
//   {
//     coordinates: {
//       bottomLeft: [Object],
//       bottomRight: [Object],
//       topLeft: [Object],
//       topRight: [Object],
//     },
//     croppedImage:
//       'file:///data/user/0/com.flydocs/cache/RNPM_7495665075596505288.jpg',
//     height: 1280,
//     id: '4f70617b-ce1a-46bc-b162-18cd1a3f895b',
//     initialImage:
//       'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O23d47691-9e8d-4d62-a52f-8889aedf705f.png',
//     ratio: 0.9390681003584226,
//     width: 720,
//   },
// ];
