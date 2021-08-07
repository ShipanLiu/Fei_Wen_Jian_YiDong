import React from 'react';
import Routes from './navigation/Routes';

import {ImageProvider} from './store/context/ImageContext';

export default function App(props) {
  return (
    <ImageProvider>
      <Routes />
    </ImageProvider>
  );
}
