import React, {createContext, useReducer} from 'react';

import {extraImageReducer, initialState} from '../reducer/extraImageReducer';

export const extraImageContext = createContext();

export const ExtraImageProvider = ({children}) => {
  const [state, dispatch] = useReducer(extraImageReducer, initialState);
  return (
    <extraImageContext.Provider value={{state: state, dispatch: dispatch}}>
      {children}
    </extraImageContext.Provider>
  );
};
