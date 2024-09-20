import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CartContext } from './Prueba_Carrito';

const extractPrice = (priceString) => {
  let cleanString = priceString.replace(/[^\d,.-]/g, '');
  return parseFloat(cleanString.replace(',', '.'));
};

const formatPrice = (amount) => {
  return `₡ ${amount.toLocaleString('es-CR', { minimumFractionDigits: 2 })} (IVAI)`;
};

export const Card = (props) => {
  const { addToCart } = useContext(CartContext);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });


  const handleAddToCart = () => {
    const numericPrice = extractPrice(props.precio);
    addToCart({
      title: props.title,
      precio: numericPrice,
      img: props.img
    });
  };

  return (
    <motion.div
      
      className="container mx-auto p-10 border-black drop-shadow-lg rounded-md bg-[#F9F9F9]"
    >
      <img src={props.img} alt={props.title} className="w-full h-auto rounded-md" />
      <div className="text-left">
        <h1 className="font-primary font-semibold text-xl text-black">{props.title}</h1>
        <h2 className="font-primary font-light text-lg text-black">{props.precio}</h2>

        <div className="gap-8">

          <button
            onClick={handleAddToCart}
            className="mt-4 px-4 py-2 bg-red text-white rounded-lg 
               hover:bg-blue-500 hover:scale-105 transition 
               duration-200 ease-in-out"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;