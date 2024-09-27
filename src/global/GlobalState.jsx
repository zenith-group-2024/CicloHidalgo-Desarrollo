import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null
  });

  const setUser = (user) => setState((prevState) => ({ ...prevState, user }));
  const setToken = (token) => setState((prevState) => ({ ...prevState, token })); 
  return (
    <GlobalContext.Provider value={{ state, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};