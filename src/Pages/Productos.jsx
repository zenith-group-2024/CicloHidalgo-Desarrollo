import React from "react";
import Card from "../Components/Card";
import BiciImagen from "../assets/Bici_ejemplo.svg";
import { motion } from "framer-motion";
export function Productos() {
    return (
        <div className=" grid grid-cols-1 gap-8 mx-auto">
            <div className="container  mx-auto max-w-fit bg-blue p-4 mb-4  ">
                <div className="text-left flex gap-4">
                    <h1 className=" font-secondary font-bold text-3xl text-white">Filtrar por </h1>
                    <p className=" font-secondary font-bold text-lg text-white text-center">X productos de <br /> X productos</p>  
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mx-auto">
                <Card
                    title="Bici de montaña" 
                    precio="₡ 198.000,00 (IVAI) "
                    img={BiciImagen}

                />
                <Card
                    title="Bici de montaña"
                    precio="₡ 198.000,00 (IVAI) "
                    img={BiciImagen}

                />
                <Card
                    title="Bici de montaña"
                    precio="₡ 198.000,00 (IVAI) "
                    img={BiciImagen}
                />
            </div>
            <div className="grid grid-cols-3 gap-4 mx-auto">
                <Card
                    title="Bici de montaña"
                    precio="₡ 198.000,00 (IVAI) "
                    img={BiciImagen}

                />
                <Card
                    title="Bici de montaña"
                    precio="₡ 198.000,00 (IVAI) "
                    img={BiciImagen}

                />
                <Card
                    title="Bici de montaña"
                    precio="₡ 198.000,00 (IVAI) "
                    img={BiciImagen}
                />
            </div>
        </div>

    )
} export default Productos;

