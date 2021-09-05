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

export default function Test2({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('common-screen')}>
          Common Screen
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('premium-screen')}>
          Premium Screen
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('search-screen')}>
          Search Screen
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
  },
});
