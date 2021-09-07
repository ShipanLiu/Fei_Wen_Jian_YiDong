import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Routes from './navigation/Routes';
import {ImageProvider} from './store/context/ImageContext';
import {ExtraImageProvider} from './store/context/extraImageContext';

import {store, persistor} from './reducers/store';

LogBox.ignoreLogs(['Reanimated 2']);

function App() {
  return <Routes />;
}

export default () => (
  //
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ExtraImageProvider>
        <ImageProvider>
          <App />
        </ImageProvider>
      </ExtraImageProvider>
    </PersistGate>
  </Provider>
);
