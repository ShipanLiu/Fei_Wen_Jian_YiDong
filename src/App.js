import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './navigation/Routes';
// import TestStack from './test/cropperTest/testStack';
import {ImageProvider} from './store/context/ImageContext';
import {ExtraImageProvider} from './store/context/extraImageContext';

import {store, persistor} from './reducers/store';

LogBox.ignoreLogs(['Reanimated 2']);

function App() {
  return <Routes />;
  // return (
  //   <NavigationContainer>
  //     <TestStack />
  //   </NavigationContainer>
  // );
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
