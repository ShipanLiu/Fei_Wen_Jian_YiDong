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

import {DimensionsHeight, DimensionsWidth} from '../../utils/dimension';
import AppButton from '../../components/AppButton';
import CheckBox from '@react-native-community/checkbox';
import ActionButton from 'react-native-simple-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GalleryScreen({navigation, route}) {
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [imgArr, setImgArr] = useState(route.params.item);

  const flatListRef = useRef(null);

  //  if use [isFocused] in useEffect will cause 'Can't perform a React state update on an unmounted component'
  const isFocused = useIsFocused();

  useEffect(() => {
    let isMounted = true;
    getImageArr(isMounted);
    // prevent repetitive call of setState
    return () => {
      isMounted = false;
    };
  }, []);

  const getImageArr = async isMounted => {
    try {
      const {id} = route.params;
      setFileId(id);
      const jsonArr = await AsyncStorage.getItem(id);
      const imageArray = JSON.parse(jsonArr);
      if (isMounted && imageArray) {
        setImgArr(createNewImageArray(imageArray));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setChangesToAsyncStorage = async value => {
    // try {
    //   const jsonValue = JSON.stringify(value);
    //   await AsyncStorage.setItem(fileId, jsonValue);
    // } catch (error) {
    //   console.log(error);
    // }
    console.log('async later');
  };

  const createNewImageArray = oldImageArray => {
    return oldImageArray.map(itemObj => ({
      checked: false,
      ...itemObj,
    }));
  };

  const handleSingleCheckBoxClick = item => {
    const newImgArr = imgArr.map(obj => {
      if (obj.id === item.id) {
        obj['checked'] = !obj.checked;
        return obj;
      } else {
        return obj;
      }
    });
    setImgArr(newImgArr);
  };

  const handleCancel = () => {
    setShowCheckBox(false);
    // set all checkbox to false(back to initial state)
    const newImgArr = imgArr.map(obj => {
      obj['checked'] = false;
      return obj;
    });
    setImgArr(newImgArr);
  };

  const handlePressDeleteOk = async () => {
    const newImgArr = imgArr.filter(obj => obj.checked === false);
    // if delete all, the folder will also be deleted
    if (newImgArr.length === 0) {
      try {
        setShowCheckBox(false);
        setImgArr(newImgArr);
        await AsyncStorage.removeItem(fileId);
        navigation.navigate('docs');
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowCheckBox(false);
      setImgArr(newImgArr);
      setChangesToAsyncStorage(newImgArr);
    }
  };

  const handleDelete = () => {
    if (imgArr.length === 1) {
      Alert.alert('Last Page', 'Are you sure to delete this File?', [
        {
          text: 'Cancel',
          onPress: handleCancel,
          style: 'cancel',
        },
        {text: 'OK', onPress: handlePressDeleteOk},
      ]);
    } else {
      handlePressDeleteOk();
    }
  };

  const handleLongPress = item => {
    setShowCheckBox(true);
    handleSingleCheckBoxClick(item);
  };

  const handleShortPress = (item, index) => {
    {
      if (showCheckBox) {
        handleSingleCheckBoxClick(item);
      } else {
        navigation.navigate('preview', {
          id: fileId,
          index: index,
          item: route.params.item,
        });
      }
    }
  };

  const handleTest = async () => {
    console.log(imgArr);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        delayLongPress={500}
        onLongPress={() => handleLongPress(item)}
        onPress={() => handleShortPress(item, index)}>
        <View style={styles.imageIndex}>
          <Text style={styles.indexText}>{index + 1}</Text>
        </View>
        {showCheckBox && (
          <View style={styles.checkboxWrapper}>
            <CheckBox
              value={item.checked}
              onValueChange={value => handleSingleCheckBoxClick(item, value)}
            />
          </View>
        )}
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {showCheckBox && (
          <View style={styles.headerButtonWrapper}>
            <View>
              <AppButton title="delete" onPress={handleDelete} />
            </View>
            <View>
              <AppButton title="cancle" onPress={handleCancel} />
            </View>
          </View>
        )}
      </View>
      <FlatList
        ref={flatListRef}
        data={imgArr}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        // onEndReached={() => console.log('end reached')}
        onContentSizeChange={() => {
          // if back from UploadScreen, scroll to end.
          if (route.params.index) {
            flatListRef.current.scrollToEnd({animated: true});
          }
        }}
        // onScroll={() => console.log('scrolled')}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.singleButtonWrapper}>
          <AppButton title="test" onPress={handleTest} />
        </View>
      </View>
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={() => navigation.navigate('camera', {fileId: fileId})}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={() => alert('waiting for development')}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: DimensionsWidth,
    height: 40,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'column',
    alignItems: 'center',
    width: DimensionsWidth / 2.2,
    height: DimensionsHeight / 2.2,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  imageWrapper: {
    // borderWidth: 1,
    // borderColor: 'green',
    width: '100%',
    height: '90%',
    bottom: 0,
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
  imageIndex: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
    borderWidth: 1,
  },
  indexText: {
    fontSize: 18,
  },
  checkboxWrapper: {
    position: 'absolute',
    left: 1,
    top: 1,
  },
});

const state = [
  {
    id: 'd34e6736-9f6c-47d8-b18c-3e99007e87df',
    coordinates: {
      topLeft: {x: 158.99950154622397, y: 250.6289240519206},
      topRight: {x: 420, y: 265},
      bottomLeft: {x: 168, y: 495.00000000000006},
      bottomRight: {x: 417.00000000000006, y: 498.9999999999999},
    },
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O62d54684-57be-422c-88ba-1e9a53d4d17b.png',
    croppedImage:
      'file:///data/user/0/com.flydocs/cache/RNPM_4207604445370839879.jpg',
    height: 1280,
    width: 720,
    ratio: 0.9426523297491035,
  },
  {
    id: 'd46775e7-4a98-49bc-8306-13f94123dfe1',
    coordinates: {
      topLeft: {x: 154, y: 214},
      topRight: {x: 417.99999999999994, y: 263},
      bottomLeft: {x: 149.66309356689453, y: 722.7276357014975},
      bottomRight: {x: 418.9990310668944, y: 739.0292561848958},
    },
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O0bc01dc7-a8cb-4d57-bfa7-49fdb776b2d9.png',
    croppedImage:
      'file:///data/user/0/com.flydocs/cache/RNPM_4596271685885592960.jpg',
    height: 1280,
    width: 720,
    ratio: 0.518941731238885,
  },
  {
    id: '66d7c4b5-b9f0-4733-a64c-96a51d10dec3',
    coordinates: {
      topLeft: {x: 159, y: 213},
      topRight: {x: 520.3384068806965, y: 266.99903106689453},
      bottomLeft: {x: 168.99999999999997, y: 492},
      bottomRight: {x: 521.3374099731445, y: 501.3286539713542},
    },
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O4891c0ef-cf40-4fc4-b219-0463817a9ccc.png',
    croppedImage:
      'file:///data/user/0/com.flydocs/cache/RNPM_1476791510679155241.jpg',
    height: 1280,
    width: 720,
    ratio: 1.2951197379236434,
  },
  {
    id: '166b8147-dcbf-494b-b7f3-da6baeb90f96',
    coordinates: {
      topLeft: {x: 37.314849615097046, y: 217.97655868530273},
      topRight: {x: 419.00000000000006, y: 262},
      bottomLeft: {x: 25.331050753593473, y: 489.97851053873705},
      bottomRight: {x: 416.00000000000006, y: 498.00000000000006},
    },
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O5f759d3a-ac3a-4e64-9fca-6d6972a8310c.png',
    croppedImage:
      'file:///data/user/0/com.flydocs/cache/RNPM_4698423592004660511.jpg',
    height: 1280,
    width: 720,
    ratio: 1.4032441597719507,
  },
  {
    id: '32c1b2bc-11b6-4f2b-bbd7-1ba2e1769293',
    coordinates: {
      topLeft: {x: 170.33788935343424, y: 107.6630884806315},
      topRight: {x: 516.3393198649088, y: 165.66112263997394},
      bottomLeft: {x: 153.00390370686847, y: 666.001948038737},
      bottomRight: {x: 482.00634511311847, y: 683.3613128662109},
    },
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O735a4f0f-dc9e-4873-a34c-a93c1f91032f.png',
    croppedImage:
      'file:///data/user/0/com.flydocs/cache/RNPM_4933257176020048772.jpg',
    height: 1280,
    width: 720,
    ratio: 0.6196979210533826,
  },
  {
    id: '478e77ac-6517-46f4-9e12-7f874c53fc93',
    coordinates: {
      topLeft: {x: 156, y: 213},
      topRight: {x: 533.3344472249349, y: 274.99706522623694},
      bottomLeft: {x: 166, y: 493},
      bottomRight: {x: 546.6709391276041, y: 492.649912516276},
    },
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O352d7af0-9eb9-414b-ac5a-42f77aa38cae.png',
    croppedImage:
      'file:///data/user/0/com.flydocs/cache/RNPM_894137074946207416.jpg',
    height: 1280,
    width: 720,
    ratio: 1.347623025803339,
  },
  {
    id: 'eab346d1-6b15-423a-85e8-97f1a456a304',
    coordinates: {
      topLeft: {x: 150.66113471984863, y: 50.31445709864297},
      topRight: {x: 426.99853261311847, y: 53.04052737355232},
      bottomLeft: {x: 156.0029207865397, y: 660.640645345052},
      bottomRight: {x: 425.33837381998705, y: 666.6846211751301},
    },
    initialImage:
      'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/Ocdb99eb3-b594-4490-82f0-0173c799e0ad.png',
    croppedImage:
      'file:///data/user/0/com.flydocs/cache/RNPM_3464938772709349663.jpg',
    height: 1280,
    width: 720,
    ratio: 0.45277001579637804,
  },
];
