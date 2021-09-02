import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Button, Caption} from 'react-native-paper';
import Carousel from 'react-native-anchor-carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../utils/colors';
import {DimensionsHeight, DimensionsWidth} from '../../utils/dimension';

export default function Test2(props) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Searchbar
          style={styles.searchBox}
          placeholder="search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  searchBox: {
    marginVertical: 10,
    width: '93%',
  },
});
