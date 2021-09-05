/*
  in this screen, give user some guidence of purching.
*/

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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import colors from '../../utils/colors';
import {constant} from '../../utils/config';
import {DimensionsHeight} from '../../utils/dimension';

import AppSwiper from '../../components/AppSwiper';

export default function CommonScreen(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.twoSlider}>
          <AppSwiper />
        </View>
        <View style={styles.secondPart}>
          <Caption
            style={{
              fontSize: 18,
              marginTop: 20,
              marginLeft: constant.elgeMargin,
            }}>
            Account
          </Caption>
          <View style={styles.accountKind}>
            <View style={styles.info}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 1,
                  backgroundColor: '#E6F4FD',
                  borderColor: '#fff',
                }}>
                <MaterialIcons name="upgrade" size={50} color="#008BE7" />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 20}}>Basic</Text>
                <Caption style={{fontSize: 15}}>3 credits remaining</Caption>
              </View>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                marginRight: constant.elgeMargin,
              }}>
              <Button
                uppercase={false}
                mode="contained"
                style={{backgroundColor: '#008BE7'}}>
                Upgrade
              </Button>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 40,
              marginHorizontal: constant.elgeMargin,
              justifyContent: 'space-between',
            }}>
            <Caption
              style={{
                fontSize: 18,
              }}>
              Recent Documents
            </Caption>
            <Text>2</Text>
          </View>
          <View style={styles.accountKind}>
            <View style={styles.info}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 1,
                  backgroundColor: '#E6F4FD',
                  borderColor: '#fff',
                }}>
                <MaterialIcons name="text-snippet" size={50} color="#008BE7" />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 20}}>Try it now - demo</Text>
                <Caption style={{fontSize: 15}}>Sep 05, 2021 02:13 pm</Caption>
              </View>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: constant.elgeMargin,
              }}>
              <Entypo
                name="dots-three-vertical"
                size={24}
                color={colors.mGray}
              />
            </View>
          </View>

          <View style={styles.accountKind}>
            <View style={styles.info}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 1,
                  backgroundColor: '#E6F4FD',
                  borderColor: '#fff',
                }}>
                <MaterialIcons name="text-snippet" size={50} color="#008BE7" />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 20}}>Try it now - demo</Text>
                <Caption style={{fontSize: 15}}>Sep 05, 2021 02:13 pm</Caption>
              </View>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: constant.elgeMargin,
              }}>
              <Entypo
                name="dots-three-vertical"
                size={24}
                color={colors.mGray}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  twoSlider: {
    width: '100%',
    height: DimensionsHeight * 0.28,
  },
  secondPart: {
    marginTop: 35,
    borderTopWidth: 1,
    borderColor: colors.lGray,
  },
  accountKind: {
    flexDirection: 'row',
    marginLeft: constant.elgeMargin,
    marginTop: 20,
  },
  info: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 0,
  },
});
