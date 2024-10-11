import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
    isAuthenticated: false,
    token: null,
    id: null, 
};

export const GlobalContext = createContext(initialState);

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                id: action.payload.id,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                id: null, 
            };
        default:
            return state;
    }
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const id = localStorage.getItem('id'); 
        if (token && id) {
            dispatch({ type: 'SET_AUTH', payload: { token, id } });
        }
    }, []);

    const setToken = (token, id) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('id', id); 
        dispatch({ type: 'SET_AUTH', payload: { token, id } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('authToken');
        localStorage.removeItem('id'); 
    };

    return (
        <GlobalContext.Provider value={{ state, setToken, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};
