import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {Button, Searchbar, Chip} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import {colors, constant} from '../../utils/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DimensionsWidth} from '../../utils/dimension';
const tagsArr = [
  {
    id: 1,
    tag: 'Beleg',
  },
  {
    id: 2,
    tag: 'Fahrticket',
  },
  {
    id: 3,
    tag: 'Gehaltsabrechnung',
  },
  {
    id: 4,
    tag: 'Rechnung',
  },
  {
    id: 5,
    tag: 'Lohnsteuerbescheinigung',
  },
  {
    id: 6,
    tag: 'Bild',
  },
  {
    id: 7,
    tag: 'Notizen',
  },
  {
    id: 8,
    tag: 'Ausweis',
  },
];

export default function SearchScreen(props) {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons.Button
            name="bell"
            size={25}
            color={colors.white}
            style={{
              backgroundColor: colors.backgroundBlack,
            }}
          />
          <Ionicons.Button
            name="ios-settings"
            size={25}
            color={colors.white}
            style={{
              backgroundColor: colors.backgroundBlack,
            }}
          />
        </View>
        <Searchbar
          placeholder="Search your docs"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.tagsContainer}>
          <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 20}}>
            Explore
          </Text>
          <View style={styles.explorContainer}>
            <Chip
              style={{
                backgroundColor: '#5A5A5A',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              textStyle={{color: colors.white}}>
              Shared
            </Chip>
            <Chip
              style={{
                marginLeft: 10,
                backgroundColor: '#5A5A5A',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              textStyle={{color: colors.white}}>
              Private
            </Chip>
            <Chip
              style={{
                marginLeft: 10,
                backgroundColor: '#5A5A5A',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              textStyle={{color: colors.white}}>
              Signed
            </Chip>
            <Chip
              style={{
                marginLeft: 10,
                backgroundColor: '#5A5A5A',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              textStyle={{color: colors.white}}>
              Recent
            </Chip>
          </View>
          <View style={styles.flatListContainer}>
            <View style={styles.twoWrapper}>
              <TouchableOpacity>
                <LinearGradient
                  start={{x: 0.6, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#195A53', '#152852', '#160157']}
                  style={styles.itemContainer}>
                  <Text style={styles.itemTextWrapper}>Beleg</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#551122', '#5D1947', '#611F60']}
                  style={styles.itemContainer}>
                  <Text style={styles.itemTextWrapper}>Fahrticket</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.twoWrapper}>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#1F3D41', '#2D1E54', '#530964']}
                  style={styles.itemContainer}>
                  <Text style={styles.itemTextWrapper} numberOfLines={1}>
                    Gehaltsabrechnung
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity>
                <LinearGradient
                  colors={['#351854', '#27133C', '#170E21']}
                  style={styles.itemContainer}>
                  <Text style={styles.itemTextWrapper}>Rechnung</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.twoWrapper}>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#1F3D41', '#2D1E54', '#530964']}
                  style={styles.itemContainer}>
                  <Text style={styles.itemTextWrapper} numberOfLines={1}>
                    Lohnsteuerbescheinigung
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity>
                <LinearGradient
                  colors={['#351854', '#27133C', '#170E21']}
                  style={styles.itemContainer}>
                  <Text style={styles.itemTextWrapper}>Bild</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.twoWrapper}>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#1F3D41', '#2D1E54', '#530964']}
                  style={styles.itemContainer}>
                  <Text style={styles.itemTextWrapper}>Notizen</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity>
                <LinearGradient
                  colors={['#351854', '#27133C', '#170E21']}
                  style={styles.itemContainer}>
                  <Text style={styles.itemTextWrapper}>Ausweis</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBlack,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: constant.elgeMarginBig,
    marginHorizontal: constant.elgeMarginBig,
  },
  searchBar: {
    marginHorizontal: constant.elgeMargin,
    marginTop: 30,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  tagsContainer: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: constant.elgeMarginBig,
  },
  flatListContainer: {
    flex: 1,
    borderColor: 'pink',
    alignItems: 'center',
  },
  twoWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DimensionsWidth / 2.3,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  itemTextWrapper: {
    fontSize: 20,
    color: colors.white,
  },
  explorContainer: {
    marginTop: 10,
    flexDirection: 'row',
    height: 30,
  },
});
