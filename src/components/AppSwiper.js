import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider, Caption} from 'react-native-paper';
import Swiper from 'react-native-swiper';

import colors from '../utils/colors';
import {constant} from '../utils/config';
import {DimensionsHeight} from '../utils/dimension';

export default function AppSwiper(props) {
  return (
    <Swiper
      style={styles.wrapper}
      height={DimensionsHeight * 0.28}
      horizontal={true}
      // autoplay
      loop
      paginationStyle={{
        bottom: -23,
        alignSelf: 'center',
      }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
      }}
      activeDotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
      }}
      activeDotColor={colors.menuColor}>
      <View style={styles.swiperItemWrapper}>
        <View style={styles.textImage}>
          <View style={{flexDirection: 'column', flex: 8}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 20,
              }}>
              FlyDocs Android
            </Text>
            <Caption>
              To celebrate the featuring of FlyDoca on the Google Play Store, we
              are ofering a 50% discount on all yearly plans
            </Caption>
          </View>
          <Image
            source={require('../assets/img/welcome.png')}
            style={{flex: 4, height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.updateBtn}>
          <Button uppercase={false}>Upgrade Now</Button>
        </View>
      </View>
      <View style={styles.swiperItemWrapper}>
        <View style={styles.textImage}>
          <View style={{flexDirection: 'column', flex: 8}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 20,
              }}>
              Sign & Share
            </Text>
            <Caption>Sign your documents and share them easily</Caption>
          </View>
          <Image
            source={require('../assets/img/privacy.png')}
            style={{flex: 4, height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.updateBtn}>
          <View
            style={{
              flex: 6,
              borderRightWidth: 1,
              borderColor: colors.lGray,
            }}>
            <Button uppercase={false}>Join</Button>
          </View>
          <View style={{flex: 6}}>
            <Button uppercase={false}>Try</Button>
          </View>
        </View>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDotStyle: {
    borderColor: colors.white,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  swiperContainer: {
    flex: 1,
    alignItems: 'center',
  },
  swiperItemWrapper: {
    margin: constant.elgeMargin,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lGray,
  },
  textImage: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    //  get all left
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.lGray,
  },
  updateBtn: {
    flexDirection: 'row',
  },
});
