import React, {createContext, useReducer} from 'react';

import {imageReducer, initialState} from '../reducer/ImageReducer';

const ImageContext = createContext();

export const imageProvider = ({children}) => {
  const [state, dispatch] = useReducer(imageReducer, initialState);
  return (
    <ImageContext.Provider value={{state: state, dispatch: dispatch}}>
      {children}
    </ImageContext.Provider>
  );
};
