/*
image picker data format:

[
  {"_U": 0, "_V": 1, "_W": {"key": "file1", "value": [Array]}, "_X": null},
  {"_U": 0, "_V": 1, "_W": {"key": "file1628513972518", "value": [Array]}, "_X": null}
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

import imgArr from '../modal/data';

import AppButton from '../components/AppButton';
import imagePicker from '../hooks/imagePicker';
import {DimensionsWidth, DimensionsHeight} from '../utils/dimension';

export default function DocScreen({navigation, route}) {
  const [allKeys, setAllKeys] = useState(null);
  const [lastAddedkey, setLastAddedKey] = useState(null);
  const [itemArr, setItemArr] = useState([]);

  useEffect(() => {
    getAllKeys();
    getLastAddedKey();
    getAllValues();
  }, []);

  const getAllKeys = async () => {
    const keyArr = await AsyncStorage.getAllKeys();
    setAllKeys(keyArr);
  };

  const getLastAddedKey = () => {
    if (route) {
      setLastAddedKey(route.params.id);
    }
  };

  const getAllValues = () => {
    try {
      const keyValueArr = allKeys?.map(async key => {
        const jsonValue = await AsyncStorage.getItem(key);
        const parsedValue = JSON.parse(jsonValue);
        return {
          key: key,
          value: parsedValue,
        };
      });
      setItemArr(keyValueArr);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.itemContainer}>
        <View style={styles.fileImageContainer}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={styles.fileImage}
          />
        </View>
        <View style={styles.fileNameContainer}>
          <Text style={styles.fileName}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fileContainer}>
        <FlatList
          data={imgArr}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}
        />
        <Button
          title="test"
          onPress={() => {
            // console.log(itemArr);
            console.log(allKeys);
          }}
        />
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
      </View>

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
  fileContainer: {},
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
