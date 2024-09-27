
import React, { createContext, useState } from 'react';


export const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    localStorage.removeItem('authToken'); 
    setIsAuthenticated(false); 
  };

  return (
    <GlobalContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};
