import React, { useContext, useEffect, useState } from "react";
import Navbar from "../UI/Navbar.jsx";
import { CartContext } from '../UI/Prueba_Carrito.jsx';
import { Link } from "react-router-dom"; 
import { Trash, SquarePlus, SquareMinus } from 'lucide-react'; 
import Footer from '../UI/Footer.jsx';

export const Carrito = () => {
  const { cart, setCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
          const response = await fetch('URL_DE_TU_API');

          if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.status}`);
          }

          const data = await response.json();
          setProductos(data); // Asegúrate de que este es el formato correcto
      } catch (error) {
          console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const getTotalProducts = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Función para calcular el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  const handleEmptyCart = () => {
    setCart([]); // Vaciar el carrito
  };

  const handleRemoveProduct = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: item.quantity + 1 }; // Aumentar la cantidad
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1; // Asegúrate de que la cantidad no sea menor que 1
        return { ...item, quantity: newQuantity }; // Reducir la cantidad
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-black font-primary font-bold text-2xl">Tus compras</h1>
          <Link 
            to="/Productos" 
            className="inline-block px-4 py-2 bg-red text-white font-primary font-bold rounded-lg hover:bg-red transition duration-200"
          >
            Añadir más productos
          </Link>
        </div>

        <div className="grid grid-cols-3 text-center mb-4 bg-gray p-4 rounded-lg">
          <h2 className="font-secondary font-semibold text-xl text-white">Producto</h2>
          <h2 className="font-secondary font-semibold text-xl text-white">Cantidad</h2>
          <h2 className="font-secondary font-semibold text-xl text-white">Subtotal</h2>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray font-medium">No has agregado productos al carrito.</p>
        ) : (
          cart.map((producto, index) => (
            <div 
              key={index} 
              className="container mx-auto p-5 border border-gray-300 shadow-md rounded-md bg-white grid grid-cols-3 items-center mb-4 transition-opacity duration-300 ease-in"
            >
              <div className="flex items-center">
                <img className="w-20 h-20 object-cover rounded-lg" src={`../src/assets/${producto.img}`} alt={producto.title} />
                <h3 className="font-primary font-semibold text-lg text-black ml-4">{producto.title}</h3>
              </div>
              <div className="flex items-center justify-center">
                <button 
                  onClick={() => handleDecreaseQuantity(index)} 
                  className="mr-2 px-2 py-1 transition duration-200 flex items-center"
                >
                  <SquareMinus className="mr-1 text-red" />
                </button>
                <p className="font-primary font-semibold text-lg text-black text-center">{producto.quantity}</p>
                <button 
                  onClick={() => handleIncreaseQuantity(index)} 
                  className="ml-2 px-2 py-1 transition duration-200 flex items-center"
                >
                  <SquarePlus className="mr-1 text-blue" />
                </button> 
              </div>
              <div className="flex items-center justify-end">
                <p className="font-primary font-semibold text-lg text-black text-center">{`₡${producto.precio * producto.quantity}`}</p>
                <button 
                  onClick={() => handleRemoveProduct(index)} 
                  className="ml-4 px-2 py-1 transition duration-200"
                >
                  <Trash className="text-red" />
                </button>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <>
            <div className="text-right mt-8">
              <h3 className="font-primary font-semibold text-2xl text-black">
                Total: <span className="text-indigo">{`₡${getTotal()}`}</span>
              </h3>
            </div>
            <button 
              onClick={handleEmptyCart} 
              className="mt-4 px-4 py-2 bg-blue text-white rounded-lg hover:bg-red-500 transition duration-200"
            >
              Vaciar Carrito
            </button>
          </>
        )}
      </div>

      <Footer /> 
    </div>
  );
};
