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
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto p-10 border-black drop-shadow-lg rounded-md bg-[#F9F9F9]"
    >
      <img src={props.img} alt={props.title} className="w-full h-auto rounded-md" />
      <div className="text-left">
        <h1 className="font-primary font-semibold text-xl text-black">{props.title}</h1>
        <h2 className="font-primary font-light text-lg text-black">{props.precio}</h2>
        <button onClick={handleAddToCart}>Agregar al Carrito</button>
      </div>
    </motion.div>
  );
};

export default Card;