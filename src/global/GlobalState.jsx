import React, { createContext, useReducer } from 'react';

const initialState = {
  isAuthenticated: false,
  token: null,
};


export const GlobalContext = createContext(initialState);


const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};


export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setToken = (token) => {
    dispatch({ type: 'SET_AUTH', payload: token });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('authToken'); 
  };

  return (
    <GlobalContext.Provider value={{ state, setToken, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};
