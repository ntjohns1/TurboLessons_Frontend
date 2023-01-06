
import React, { createContext, useReducer } from 'react';
import { stompClientReducer } from './StompReducer';
import StompContext from './StompContext';

// define the StompProvider component that will wrap your app and provide the global state
export const StompProvider = ({ children }) => {
  // initialize the global state for the stompClient using the reducer
  const [stompClient, dispatch] = useReducer(stompClientReducer, null);

  return (
    <StompContext.Provider value={[stompClient, dispatch]}>
      {children}
    </StompContext.Provider>
  );
}