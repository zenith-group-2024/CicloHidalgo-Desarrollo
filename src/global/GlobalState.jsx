import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
    isAuthenticated: false,
    token: null,
    id: null, 
    isAdmin: false,
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
                isAdmin: action.payload.isAdmin,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                id: null, 
                isAdmin: false,
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
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (token && id) {
            dispatch({ type: 'SET_AUTH', payload: { token, id, isAdmin } });
        }
    }, []);

    const setToken = (token, id, isAdmin) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('id', id); 
        localStorage.setItem('isAdmin', isAdmin);
        dispatch({ type: 'SET_AUTH', payload: { token, id, isAdmin } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('authToken');
        localStorage.removeItem('id'); 
        localStorage.removeItem('isAdmin');
    };

    return (
        <GlobalContext.Provider value={{ state, setToken, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};
