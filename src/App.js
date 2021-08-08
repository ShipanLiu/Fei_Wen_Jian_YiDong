import React from 'react';
import Routes from './navigation/Routes';

import {ImageProvider} from './store/context/ImageContext';

function App() {
  return <Routes />;
}

export default () => (
  <ImageProvider>
    <App />
  </ImageProvider>
);
