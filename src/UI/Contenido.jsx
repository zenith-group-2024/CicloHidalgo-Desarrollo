import React from "react";
import Card from "./CardContenidos";
import { div } from "framer-motion/client";
import Navbar from "./Navbar";
import PruebaVideo from "../assets/videos/Prueba_video.mp4"
import ContenidoHero from "../assets/images/ContenidoHero.svg"
export function Contenido(){
    return(
        <div className="bg-white h-full w-full ">
               <Navbar/>
               <img src={ContenidoHero} alt="" className="w-full  "/>
               <h1 className=" text-center text-3xl font-secondary font-bold my-4 hover:underline  ">Videos</h1>
        <div className="grid grid-cols-2">

        
                <Card title="Video de prueba Ciclo Hidalgo"  videoUrl={PruebaVideo}  />
                <Card title="Video de prueba Ciclo Hidalgo"  videoUrl={PruebaVideo}  />
                <Card title="Video de prueba Ciclo Hidalgo"  videoUrl={PruebaVideo}  />
                <Card title="Video de prueba Ciclo Hidalgo"  videoUrl={PruebaVideo}  />           
        </div>
        </div>
    );
}; export default Contenido