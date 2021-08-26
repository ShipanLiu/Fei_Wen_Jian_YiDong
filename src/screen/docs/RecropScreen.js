import React, {useContext, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import CustomCrop from '../../components/scanner/Cropper';
import PhotoManipulator from 'react-native-photo-manipulator';
import {useIsFocused} from '@react-navigation/native';

import AppButton from '../../components/AppButton';
import {ImageContext} from '../../store/context/ImageContext';
import {extraImageContext} from '../../store/context/extraImageContext';
import * as actions from '../../store/actions/actions';

export default function RecropScreen({navigation, route}) {
  const [id, setId] = useState(null);
  // if for extra image, the fileId exists, in other cases, it is null
  const [fileId, setFileId] = useState(null);
  const [targetImage, setTargetImage] = useState(null);
  const {state, dispatch} = useContext(ImageContext);
  const {state: extraImageState, dispatch: extraImagedispatch} =
    useContext(extraImageContext);
  const cropperRef = useRef(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    getIdAndSetTargetImage();
  }, [isFocused]);

  const getIdAndSetTargetImage = () => {
    const {id, fileId: targetFileId} = route.params;
    if (targetFileId) {
      setFileId(targetFileId);
      setTargetImage(extraImageState.find(item => item.id === id));
    } else {
      setTargetImage(state.find(item => item.id === id));
    }
  };

  const createRectRegion = position => {
    return {
      x: position.topLeft.x,
      y: position.topLeft.y,
      width: position.topRight.x - position.topLeft.x,
      height: position.bottomLeft.y - position.topLeft.y,
    };
  };
  const photoManipulator = async (initialImage, rectRegion, targetSize) => {
    try {
      const result = await PhotoManipulator.crop(
        initialImage,
        rectRegion,
        targetSize,
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //  TODO:  complete crop action code
  const cropAction = async () => {
    try {
      const newCoordinates = cropperRef.current.crop();
      const rectRegion = createRectRegion(newCoordinates);
      // console.log(newCoordinates);
      const targetSize = {
        // height: rectRegion.height,
        // width: rectRegion.width,
        width: (targetImage.height / rectRegion.height) * rectRegion.width,
        height: targetImage.height,
      };
      const croppedImageUri = await photoManipulator(
        targetImage.initialImage,
        rectRegion,
        targetSize,
      );
      return {
        newCoordinates,
        croppedImageUri,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async () => {
    try {
      const {newCoordinates, croppedImageUri} = await cropAction();
      // console.log({
      //   ...targetImage,
      //   coordinates: newCoordinates,
      //   croppedImage: croppedImageUri,
      // });
      if (fileId) {
        extraImagedispatch({
          type: actions.MODIFY,
          payload: {
            ...targetImage,
            coordinates: newCoordinates,
            croppedImage: croppedImageUri,
          },
        });
      } else {
        dispatch({
          type: actions.MODIFY,
          payload: {
            ...targetImage,
            coordinates: newCoordinates,
            croppedImage: croppedImageUri,
          },
        });
      }

      navigation.navigate('upload');
    } catch (error) {
      console.log(error);
    }
  };

  console.log('RescropSc:  ' + fileId);

  return (
    <View style={styles.container}>
      {/* <View style={styles.doneButton}>
        <AppButton title="Done" onPress={handleDone} />
        <Button title="test" onPress={() => console.log('test')} />
      </View> */}
      <AppButton title="Done" onPress={handleDone} />
      {targetImage && (
        <CustomCrop
          rectangleCoordinates={targetImage.coordinates}
          initialImage={targetImage.initialImage}
          height={targetImage.height}
          width={targetImage.width}
          ref={cropperRef}
          overlayColor="rgba(18,190,210, 1)"
          overlayStrokeColor="rgba(20,190,210, 1)"
          handlerColor="rgba(20,150,160, 1)"
          enablePanStrict={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  doneButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
