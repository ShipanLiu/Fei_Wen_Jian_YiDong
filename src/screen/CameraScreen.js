import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import PDFScanner from '@woonivers/react-native-document-scanner';

export default function App() {
  const pdfScannerElement = useRef(null);
  const [data, setData] = useState({});
  const [allowed, setAllowed] = useState(true);

  function handleOnPressRetry() {
    setData({});
  }
  function handleOnPress() {
    pdfScannerElement.current.capture();
  }

  if (data.croppedImage) {
    console.log('data', data);
    return (
      <>
        <Image source={{uri: data.croppedImage}} style={styles.preview} />
        <TouchableOpacity onPress={handleOnPressRetry} style={styles.button}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <React.Fragment>
      <PDFScanner
        ref={pdfScannerElement}
        style={styles.scanner}
        onPictureTaken={setData}
        overlayColor="rgba(255,130,0, 0.7)"
        enableTorch={false}
        quality={1}
        detectionCountBeforeCapture={5}
        detectionRefreshRateInMS={50}
        saveOnDevice={true}
        useBase64={true}
      />
      <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <Text style={styles.buttonText}>Take picture</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/*
  output format:
  data {"croppedImage": "file:///data/data/com.socialapp/cache/documents/f3fa89cb-7fbe-450b-9cd6-79a4f60250f3.jpg", "height": 882, "initialImage": "file:///data/data/com.socialapp/cache/documents/1ebee69a-8162-4a63-bb7d-b19b4c282dd0.jpg", "width": 499}
*/
