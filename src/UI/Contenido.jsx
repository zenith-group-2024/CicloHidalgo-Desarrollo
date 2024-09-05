import React from "react";
import Card from "./CardContenidos";
import { div } from "framer-motion/client";
import Navbar from "./Navbar";
export function Contenido(){
    return(
        <div className="bg-white h-full w-full ">
               <Navbar/>
        <div className="grid grid-cols-1 gap-4 m-auto">
        
                <Card
                  title="Video de prueba Ciclo Hidalgo"
                  postId="Cy7GgaPLRNW"
                />
                <Card
                  title="Video de prueba Ciclo Hidalgo"
                  postId="Cy7GgaPLRNW"
                />
                   <Card
                  title="Video de prueba Ciclo Hidalgo"
                  postId="Cy7GgaPLRNW"
                />  
                   <Card
                  title="Video de prueba Ciclo Hidalgo"
                  postId="Cy7GgaPLRNW"
                />        
        </div>
        </div>
    );
}; export default Contenido