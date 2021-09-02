/*
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

*/

// const data = [
//   [
//     'file1628605929771',
//     '[{"id":"4faf32bd-fda1-49b0-ae2f-436a643f6482","coordinates":{"topLeft":{"x":160.34033966064453,"y":214.61523151397705},"topRight":{"x":419.6706822713217,"y":267.9990162054698},"bottomLeft":{"x":165.68211873372394,"y":797.9697774251301},"bottomRight":{"x":416.00000000000006,"y":765.0010121663411}},"initialImage":"file:///data/user/0/com.flydocs/cache/RNRectangleScanner/Oe457b4b0-628d-42ff-b6fd-459364eef4e6.png","croppedImage":"file:///data/user/0/com.flydocs/cache/RNPM_2888852922222133756.jpg","height":1280,"width":720,"ratio":0.350187235421014}]',
//   ],
//   [
//     'file1628607358203',
//     '[{"id":"7efc17d6-bbba-4d6b-a4b0-4262e27afc8c","coordinates":{"topLeft":{"x":93.67479769388835,"y":196.9384803771973},"topRight":{"x":536.3450266520182,"y":273.97558975219727},"bottomLeft":{"x":80.68066341678302,"y":493.6816762288412},"bottomRight":{"x":538.3545252482097,"y":498.02248636881507}},"initialImage":"file:///data/user/0/com.flydocs/cache/RNRectangleScanner/Od495833c-718e-404c-b8e8-577d77a2d1cb.png","croppedImage":"file:///data/user/0/com.flydocs/cache/RNPM_7764999799947062194.jpg","height":1280,"width":720,"ratio":1.4917620189661966},{"id":"4f70617b-ce1a-46bc-b162-18cd1a3f895b","coordinates":{"topLeft":{"x":159,"y":215.99999999999997},"topRight":{"x":421,"y":265},"bottomLeft":{"x":168.99999999999997,"y":495.00000000000006},"bottomRight":{"x":417.99999999999994,"y":500}},"initialImage":"file:///data/user/0/com.flydocs/cache/RNRectangleScanner/O23d47691-9e8d-4d62-a52f-8889aedf705f.png","croppedImage":"file:///data/user/0/com.flydocs/cache/RNPM_7495665075596505288.jpg","height":1280,"width":720,"ratio":0.9390681003584226}]',
//   ],
// ];

import React, {useState, useEffect, useRef} from 'react';
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
  SafeAreaView,
} from 'react-native';
import ActionButton from 'react-native-simple-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import AppButton from '../../components/AppButton';
import imagePicker from '../../hooks/imagePicker';
import {DimensionsWidth, DimensionsHeight} from '../../utils/dimension';

export default function DocScreen({navigation, route}) {
  const [allKeys, setAllKeys] = useState(null);
  const [itemArr, setItemArr] = useState([]);
  const flatListRef = useRef(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    // clearAll();
    getAllKeys();
  }, [isFocused]);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllKeys = async () => {
    const keyArr = await AsyncStorage.getAllKeys();
    // kick the 'profile' key out of the keyArr.
    const filteredKeyArr = keyArr.filter(
      key => key !== 'profile' && key !== 'signature',
    );
    setAllKeys(filteredKeyArr);
    getAllValues(filteredKeyArr);
  };

  const getAllValues = async keyArr => {
    try {
      const allItemArr = await AsyncStorage.multiGet(keyArr);
      setItemArr(allItemArr);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTest = () => {
    console.log(itemArr);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('gallery', {
            id: item[0],
            item: JSON.parse(item[1]),
            length: JSON.parse(item[1]).length,
          })
        }
        style={styles.itemContainer}>
        <View style={styles.fileImageContainer}>
          <Image
            source={{uri: JSON.parse(item[1])[0].croppedImage}}
            resizeMode="contain"
            style={styles.fileImage}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={itemArr}
        keyExtractor={item => item[0]}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          flatListRef.current.scrollToEnd({animated: true});
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 20,
        }}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: DimensionsHeight * 0.8,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: DimensionsWidth / 2.2,
    height: DimensionsHeight / 2.2,
    borderWidth: 2,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  fileImageContainer: {
    width: '100%',
    height: '100%',
  },
  fileImage: {
    height: '100%',
    width: '100%',
  },
});

/*
  <ScrollView
        style={styles.fileContainer}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}>
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
*/
