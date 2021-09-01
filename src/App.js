import React from 'react';
import {LogBox} from 'react-native';

import Routes from './navigation/Routes';
import {ImageProvider} from './store/context/ImageContext';
import {ExtraImageProvider} from './store/context/extraImageContext';

LogBox.ignoreLogs(['Reanimated 2']);

function App() {
  return <Routes />;
}

export default () => (
  <ExtraImageProvider>
    <ImageProvider>
      <App />
    </ImageProvider>
  </ExtraImageProvider>
);
