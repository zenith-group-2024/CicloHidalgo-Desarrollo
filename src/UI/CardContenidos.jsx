import { div } from "framer-motion/client";
import React from "react";
export const Card = (props) =>{
return(
    <div className="flex flex-col border-b-2 border-border-gray-opacity w-full  ">
        <h1 className=" font-primary font-semibold text-xl text-black mt-4 mx-8"> {props.title} </h1>
   <div className=" container  mx-auto p-8 border-black rounded-md bg-[#F0FAEF] h-full "> 
    <iframe  src={`https://www.instagram.com/p/${props.postId}/embed`} 
    className="w-4/6 xl:h-[750px] sm:h-[400px]  rounded-md m-auto overflow-hidden" scrolling="no" allow="encrypted-media">
        
     </iframe>

    </div>

    </div>
 
 
);


};export default Card