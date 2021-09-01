import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import colors from '../../utils/colors';

export default function SettingScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate('signature')}>
          <View style={styles.menuItem}>
            <FontAwesome5 name="signature" color="#FF6347" size={30} />
            <Text style={styles.menuItemText}>My Signature</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuWrapper: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 20,
    color: colors.textGray,
  },
});
