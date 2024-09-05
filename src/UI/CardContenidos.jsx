import { div } from "framer-motion/client";
import React from "react";
export const Card = (props) =>{
return(
    <div className="flex flex-col border-b-2 border-border-gray-opacity ">
        <h1 className=" font-primary font-semibold text-xl text-black mt-4 mx-8"> {props.title} </h1>
   <div className=" container mx-auto p-8 border-black  rounded-md bg-[#F0FAEF] "> 
    <iframe  src={`https://www.instagram.com/p/${props.postId}/embed`} 
    className="w-4/6 h-96 rounded-md m-auto overflow-hidden" allow="encrypted-media">
        
     </iframe>

    </div>

    </div>
 
 
);


};export default Card