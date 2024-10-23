import React, { createContext, useState, useEffect } from 'react';


export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    
    useEffect(() => {
     
    }, [cart]);

    
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);

            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

        setMessage('Producto agregado al carrito!');
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
            setMessage('');
        }, 2000);
    };

    
    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, message, showMessage }}>
            {children}
        </CartContext.Provider>
    );
};
