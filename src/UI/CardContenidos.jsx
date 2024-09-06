import { div } from "framer-motion/client";
import React from "react";
export const Card = (props) =>{
return(
    <div className="border-b-2 border-border-gray-opacity w-full  mt-8 ">
      
   <div className=" rounded-md  bg-white h-full border-black w-10/12   mx-auto"> 
   
   <video src={props.videoUrl} controls className="w-full m-auto ">
    Tu navegador no soporta la etiqueta de video.
    </video>
    <div className="bg-blue p-4 mb-8">
    <h1 className=" font-primary font-semibold text-xl text-black  text-right"> {props.title} </h1>
    </div>
   

    </div>

    </div>
 
 
);


};export default Card