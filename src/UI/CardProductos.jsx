import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CartContext } from './Prueba_Carrito';
import { Link } from 'react-router-dom';

const extractPrice = (priceString) => {
  let cleanString = priceString.replace(/[^\d,.-]/g, '');
  return parseFloat(cleanString.replace(',', '.'));
};



export const Card = (props) => {
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });



  return (
    <motion.div
      ref={ref}
      className="container mx-auto p-10 border-black drop-shadow-lg rounded-md bg-[#F9F9F9]"
    >
      <Link to={`/producto/${props.id}`}>
     
        <div>
          <img src={props.img} alt={props.title} className="w-full h-auto rounded-md" />
          <div className="text-left">
            <h1 className="font-primary font-semibold text-xl text-black">{props.title}</h1>
            <h2 className="font-primary font-light text-lg text-black">{props.precio}</h2>
          </div>
        </div>
      </Link>

      <div className="gap-8">
      </div>
    </motion.div>
  );
};

export default Card;
