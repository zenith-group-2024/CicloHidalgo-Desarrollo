import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const Card = (props) => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.5, 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3}}
      className="container mx-auto p-10 border-black drop-shadow-lg rounded-md bg-[#F9F9F9] "
    >
      <img src={props.img} alt="" className="w-full h-auto rounded-md" />
      <div className="text-left">
        <h1 className="font-primary font-semibold text-xl text-black"> {props.title} </h1>
        <h2 className="font-primary font-light text-lg text-black"> {props.precio} </h2>
      </div>
    </motion.div>
  );
};

export default Card;
    