import React from 'react';
import Routes from './navigation/Routes';

import {ImageProvider} from './store/context/ImageContext';
import {ExtraImageProvider} from './store/context/extraImageContext';

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
