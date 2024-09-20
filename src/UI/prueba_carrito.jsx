import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

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
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
          return total + item.precio * item.quantity;
        }, 0);
      };
    

      const getTotalProducts = () => {
        return cart.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
      };
    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};