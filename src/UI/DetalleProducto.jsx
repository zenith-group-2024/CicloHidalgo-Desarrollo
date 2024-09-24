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

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

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
      img: BiciImagen
    });
  };

  return (
    <div className="bg-white h-full w-full"> 
      <Navbar />
      <div className="container mx-auto p-10 border-black drop-shadow-lg rounded-md bg-[#F9F9F9] mt-8">
        <div className="grid grid-cols-2 m-auto my-8">
          <img className="w-3/5 m-auto container mx-auto border-black rounded-md bg-[#F9F9F9]" src={BiciImagen} alt={producto.marca} />
          <div>
            <h1 className="font-primary font-bold text-xl text-black">{producto.marca}</h1>
            <p className="font-primary font-regular text-xl text-black">{producto.especificacion}</p>
            <p className="font-primary font-regular text-xl text-black">Precio: ₡ {producto.precio} (IVAI)</p>

            <button
              onClick={handleAddToCart}
              className="mt-4 px-4 py-2 bg-red text-white rounded-lg hover:bg-blue-500 hover:scale-105 transition duration-200 ease-in-out"
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
