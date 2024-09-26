// src/GlobalState.js
import React, { createContext, useState } from 'react';

// Create a context with default value
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null
  });

  const setUser = (user) => setState((prevState) => ({ ...prevState, user }));

  return (
    <GlobalContext.Provider value={{ state, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};