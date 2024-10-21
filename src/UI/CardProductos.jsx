import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';

export const Card = (props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Extraer el precio como número para pasarlo a addToCart
  const precioNumerico = parseFloat(props.precio.replace(/[^\d.-]/g, ''));

  return (
    <motion.div
      ref={ref}
      className="relative group container mx-auto p-10 border-black drop-shadow-lg rounded-md bg-white"
    >
      <Link to={`/producto/${props.id}`}>
        <div className="flex-grow flex flex-col">
          <div className="w-full h-48 "> {}
            <img 
              src={props.img} 
              alt={props.title} 
              className="w-full h-full object-cover rounded-md" 
            />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <h1 className="font-primary font-semibold text-lg text-black mt-2">{props.nombre}</h1>
            <h2 className="font-primary font-light text-md text-black">{props.precio}</h2>
          </div>
        </div>
      </Link>

      {/* Botón para añadir al carrito */}
      <button
        onClick={() => props.addToCart({
          nombre: props.nombre,
          id: props.id,
          title: props.title,
          precio: precioNumerico,  // Pasamos el precio como número
          img: props.img
        })}
        className="absolute bottom-4 right-4 bg-red text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Añadir al carrito
      </button>
    </motion.div>
  );
};

export default Card;
