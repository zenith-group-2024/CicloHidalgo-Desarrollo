import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { useFetchProductoDetallado } from '../../hooks/FetchProductoDetallado.js';
import Navbar from './Navbar.jsx';
import { CartContext } from '../UI/Prueba_Carrito.jsx';
import Footer from "./Footer.jsx"; 

export default function DetalleProducto() {
  const { id } = useParams();  
  const { producto, isLoading, error } = useFetchProductoDetallado(id);  
  const { addToCart } = useContext(CartContext);  

  if (isLoading) return <p className="text-center text-gray-600">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!producto) return <p className="text-center">Producto no encontrado</p>;

  // Convertimos el precio a número y lo formateamos para mostrarlo con comas y decimales
  const numericPrice = typeof producto.precio === 'number'
    ? producto.precio
    : parseFloat(producto.precio.replace(/[^\d.-]/g, ''));

  const formattedPrice = numericPrice.toLocaleString("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 2,
  });

  const handleAddToCart = (e) => {
    e.stopPropagation();

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
    <div className="bg-gray-50 min-h-screen"> 
      <Navbar />
      <div className="container mx-auto p-10">
        <div className="bg-white p-8 rounded-lg  grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {/* Imagen del producto */}
          <img 
            className="w-full h-auto mx-auto max-w-sm md:max-w-md rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105" 
            src={`../src/assets/${producto.imagen}`} 
            alt={producto.marca} 
          />

          {/* Detalles del producto */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="font-primary font-bold text-3xl ">{producto.nombre}</h1>
            <p className="font-primary text-lg text-gray">{producto.especificacion}</p>
            <p className="font-primary text-2xl font-semibold text-old">{formattedPrice} (IVAI)</p>
            <button
              onClick={handleAddToCart}
              className="mt-4 px-6 py-3 bg-red text-white font-bold rounded-lg shadow-lg transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600"
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
