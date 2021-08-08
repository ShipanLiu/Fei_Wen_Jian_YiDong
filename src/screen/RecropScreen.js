import React, {useContext, useRef} from 'react';
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
import CustomCrop from '../components/scanner/Cropper';

import AppButton from '../components/AppButton';
import {ImageContext} from '../store/context/ImageContext';
import actions from '../store/actions/actions';

export default function RecropScreen({navigation, route}) {
  const {state, dispatch} = useContext(ImageContext);
  const cropperRef = useRef(null);

  const {id} = route.params;
  const targetImage = state.find(item => item.id === id);

  //  TODO:  complete crop action code
  const cropAction = async () => {
    const newCoordinates = cropperRef.current.crop();
    const rectRegion = createRectRegion(newCoordinates);
    console.log(newCoordinates);
    const targetSize = {
      height: rectRegion.height,
      width: rectRegion.width,
    };
    const croppedImageUri = await photoManipulator(
      takenPhoto.initialImage,
      rectRegion,
      targetSize,
    );
  };

  const handleDone = () => {
    dispatch({
      type: actions.MODIFY,
      payload: {
        ...targetImage,
        coordinates: newCoordinates,
        croppedImage: newCroppedImage,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.doneButton}>
        <AppButton title="Done" onPress={handleDone} />
      </View>
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
