import React, {createContext, useReducer} from 'react';

import {imageReducer, initialState} from '../reducer/ImageReducer';

export const ImageContext = createContext();

export const ImageProvider = ({children}) => {
  const [state, dispatch] = useReducer(imageReducer, initialState);
  return (
    <ImageContext.Provider value={{state: state, dispatch: dispatch}}>
      {children}
    </ImageContext.Provider>
  );
};
