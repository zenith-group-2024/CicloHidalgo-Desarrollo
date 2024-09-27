import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';

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
        <div className="flex-grow flex flex-col">
          <div className="w-full h-48 "> {}
            <img 
              src={props.img} 
              alt={props.title} 
              className="w-full h-full object-cover rounded-md" 
            />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <h1 className="font-primary font-semibold text-lg text-black mt-2">{props.title}</h1>
            <h2 className="font-primary font-light text-md text-black">{props.precio}</h2>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
