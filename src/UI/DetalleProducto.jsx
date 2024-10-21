import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { useFetchProductoDetallado } from '../../hooks/FetchProductoDetallado.js';
import Navbar from './Navbar.jsx';
import { CartContext } from '../UI/Prueba_Carrito.jsx';
import Footer from "./Footer.jsx"; 
import BiciImagen from '../assets/images/Bici_ejemplo.svg'; 

export default function DetalleProducto() {
  const { id } = useParams();  
  const { producto, isLoading, error} = useFetchProductoDetallado(id);  
  const { addToCart } = useContext(CartContext);  

  if (isLoading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!producto) return <p className="text-center">Producto no encontrado</p>;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const numericPrice = typeof producto.precio === 'number'
      ? producto.precio
      : parseFloat(producto.precio.replace(/[^\d.-]/g, ''));

    if (isNaN(numericPrice)) {
      console.error("Precio inválido");
      return;
    }

    addToCart({
      id: producto.id, 
      title: producto.marca,
      precio: numericPrice,
      img: producto.imagen,
    });
  };

  return (
    <div className="bg-white h-full w-full"> 
      <Navbar />
      <div className="container mx-auto p-10  ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <img 
            className="w-1/3 h-auto mx-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105" 
            src={`../src/assets/${producto.imagen}`} 
            alt={producto.marca} 
          />
          <div className="flex flex-col justify-center">
            <h1 className="font-primary font-bold text-2xl text-black mb-2">{producto.nombre}</h1>
            <p className="font-primary text-lg text-gray mb-4">{producto.especificacion}</p>
            <p className="font-primary text-xl text-black mb-6">Precio: ₡ {producto.precio} (IVAI)</p>
            <button
              onClick={handleAddToCart}
              className="mt-4 px-6 py-3 bg-red text-white rounded-lg shadow-md transition duration-200 ease-in-out hover:scale-105"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
