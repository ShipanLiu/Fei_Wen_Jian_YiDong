/*
  learn bottom Sheet

*/

import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Chip} from 'react-native-paper';
import {Caption} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialIconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../utils/config';

export default function BottomSheetScreen() {
  const [openEnd, setOpenEnd] = useState(false);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={{fontSize: 15}}>Information & Actions</Text>
        </View>
        <Ionicons
          style={styles.headerArrow}
          name={openEnd ? 'ios-arrow-down' : 'ios-arrow-up'}
          size={20}
          color={colors.black}
        />
      </View>
    );
  };

  const renderInner = () => (
    <View style={styles.innerStyle}>
      <View style={styles.actionsStyle}>
        <TouchableOpacity style={{alignItems: 'center', marginLeft: 15}}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="save-alt" size={40} color={colors.white} />
          </View>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', marginLeft: 20}}>
          <View style={[styles.iconWrapper, {backgroundColor: '#F39099'}]}>
            <MaterialIcons name="ios-share" size={40} color={colors.white} />
          </View>
          <Text>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', marginLeft: 20}}>
          <View style={[styles.iconWrapper, {backgroundColor: '#FBC581'}]}>
            <MaterialIcons name="add-task" size={40} color={colors.white} />
          </View>
          <Text>New Task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableActions}>
        <View style={styles.itemBarStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name="circle-with-plus" size={30} color={colors.mGray} />
            <Caption style={{fontSize: 18, marginLeft: 9}}>
              Select Sender
            </Caption>
          </View>
        </View>
        <View style={styles.itemBarStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name="calendar" size={30} color="#81C390" />
            <Text style={{fontSize: 18, marginLeft: 30}}>07.09.2021</Text>
          </View>
        </View>
        <View style={styles.itemBarStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="pricetag" size={30} color="#81C390" />
            <View style={styles.tagsStyle}>
              <Chip
                textStyle={{color: '#fff'}}
                style={{backgroundColor: '#808080', marginHorizontal: 10}}>
                Beleg
              </Chip>
              <Chip
                textStyle={{color: '#fff'}}
                style={{backgroundColor: '#808080'}}>
                Bild
              </Chip>
              <MaterialIconCommunity
                name="tag-plus"
                size={35}
                color="#D8D6D9"
                style={{marginLeft: 10}}
              />
            </View>
          </View>
        </View>
        <View style={styles.itemBarStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="sticky-note-2" size={30} color="#81C390" />
            <Text style={{fontSize: 18, marginLeft: 30}}>Add Notes</Text>
          </View>
        </View>
      </View>
      <View style={styles.archiveButton}></View>
    </View>
  );

  const sheetRef = useRef(null);
  const fall = new Animated.Value(1);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'papayawhip',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={['60%', 50]}
        borderRadius={10}
        renderContent={renderInner}
        renderHeader={renderHeader}
        callbackNode={fall}
        enabledInnerScrolling={true}
        //  close or open at the begining
        initialSnap={1}
        enabledBottomInitialAnimation={true}
        enabledBottomClamp={true}
        overdragResistanceFactor={2.5}
        onOpenEnd={() => setOpenEnd(true)}
        onCloseEnd={() => setOpenEnd(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    height: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {},
  headerArrow: {
    position: 'absolute',
    left: 20,
  },
  innerStyle: {
    height: 500,
    backgroundColor: colors.white,
  },
  actionsStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 80,
    backgroundColor: '#F0F0F5',
    paddingTop: 10,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#71CBF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableActions: {
    flex: 10,
    marginTop: 5,
  },
  archiveButton: {
    flex: 2,
    backgroundColor: 'green',
  },
  itemBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#CDCDCF',
    paddingLeft: 10,
  },
  tagsStyle: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
