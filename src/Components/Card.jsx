import React from "react";
export const Card = (props) =>{
return(
    <div className=" container mx-auto p-8  drop-shadow-xl rounded-md bg-[#F0FAEF] "> 
    <img src={props.img} alt="" />
    <div className=" text-left">
    <h1 className=" font-primary font-semibold text-xl text-black"> {props.title}</h1>
    <h2 className=" font-primary  font-light text-lg text-black"> {props.precio} </h2>

    </div>

    </div>
);


};export default Card