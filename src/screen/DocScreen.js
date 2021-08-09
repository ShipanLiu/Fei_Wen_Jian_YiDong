/*
image picker data format:

[
  {"_U": 0, "_V": 1, "_W": {"key": "file1", "value": [Array]}, "_X": null},
  {"_U": 0, "_V": 1, "_W": {"key": "file1628513972518", "value": [Array]}, "_X": null}
]

[
    {
      _U: 0,
      _V: 1,
      _W: {
        key: 'file1',
        value: [
          {
            coordinates: {
              bottomLeft: {x: 249, y: 782},
              bottomRight: {x: 468.99999999999994, y: 783.0000000000001},
              topLeft: {x: 256, y: 589},
              topRight: {x: 461.99999999999994, y: 596},
            },
            croppedImage:
              'file:///data/user/0/com.flydocs/cache/RNPM_6356447344025088661.jpg',
            height: 1280,
            id: 'ed1cb188-aff0-4aa6-b922-a8ee526ca43d',
            initialImage:
              'file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O4aeb8bd4-818e-4a70-ba1e-0c91751ad66b.png',
            ratio: 1.0673575129533677,
            width: 720,
          },
        ],
      },
      _X: null,
    },
  ]

*/

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import ActionButton from 'react-native-simple-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import AppButton from '../components/AppButton';
import imagePicker from '../hooks/imagePicker';
import {DimensionsWidth, DimensionsHeight} from '../utils/dimension';
import {imgArr} from '../modal/data';

export default function DocScreen({navigation, route}) {
  const [allKeys, setAllKeys] = useState(null);
  // const [lastAddedkey, setLastAddedKey] = useState(null);
  const [itemArr, setItemArr] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getAllKeys();
    // getLastAddedKey();
  }, [isFocused]);

  const getAllKeys = async () => {
    const keyArr = await AsyncStorage.getAllKeys();
    setAllKeys(keyArr);
    getAllValues(keyArr);
  };

  // const getLastAddedKey = () => {
  //   if (route) {
  //     setLastAddedKey(route?.params.id);
  //   }
  // };

  const getAllValues = async keyArr => {
    try {
      keyArr.map(async key => {
        const jsonValue = await AsyncStorage.getItem(key);
        const parsedValue = JSON.parse(jsonValue);
        setItemArr(preValue => [
          ...preValue,
          {
            key: key,
            value: parsedValue,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTest = () => {
    if (itemArr) {
      itemArr.map(item => {
        console.log(item.key);
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.fileContainer}>
        {itemArr &&
          itemArr.map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => {}}
                style={styles.itemContainer}>
                <View style={styles.fileImageContainer}>
                  <Image
                    source={{uri: item.value[0].croppedImage}}
                    // source={{
                    //   uri: 'file:///data/user/0/com.flydocs/cache/RNPM_6356447344025088661.jpg',
                    // }}
                    resizeMode="contain"
                    style={styles.fileImage}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        <Button title="test" onPress={handleTest} />
        <Button
          title="clearall"
          onPress={async () => {
            try {
              await AsyncStorage.clear();
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </ScrollView>

      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={() => navigation.navigate('camera')}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          // onPress={handleOpenLibrary}
        >
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  inputWrapper: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  images: {
    width: 400,
    height: 200,
  },
  cropperContainer: {
    marginTop: 100,
    width: 400,
    height: 600,
  },
  fileContainer: {
    height: 300,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: DimensionsWidth / 3,
    height: DimensionsHeight / 3,
    borderWidth: 2,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  fileImageContainer: {
    width: '100%',
    height: 90,
  },
  fileImage: {
    height: '100%',
    width: '100%',
  },
});
