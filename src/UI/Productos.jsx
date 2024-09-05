import React from "react";
import Card from "./Card";
import BiciImagen from "../assets/Bici_ejemplo.svg";
export function Productos() {
    return (
        <div className="bg-white h-full w-full">
        <div className=" grid grid-cols-1 gap-8 mx-auto">
            <div className="container m-auto max-w-fit bg-blue p-2 mb-4  ">
                <div className="text-left flex gap-8">
                    <h1 className=" font-secondary font-bold text-xl m-auto text-white">Filtrar por </h1>
                    <select class=" text-white h-3/4  w-1/4 m-auto font-secondary  font-bold  bg-blue ">
                        <option value='1'>Marca</option>
                        <option value='2'>Tipo Producto</option>
                        <option value='3'>Modelo</option>
                        <option value='4'>Categoria</option>
                        <option value='5'>Especificacion</option>
                        <option value='6'>Precio</option>
                    </select>
                    <select class=" text-white h-3/4  w-1/4 m-auto font-secondary  font-bold  bg-blue ">
                        <option value='1'>Marca</option>
                        <option value='2'>Tipo Producto</option>
                        <option value='3'>Modelo</option>
                        <option value='4'>Categoria</option>
                        <option value='5'>Especificacion</option>
                        <option value='6'>Precio</option>
                    </select>
                    <p className=" font-secondary font-bold mx-auto text-white text-center">X productos de <br /> X productos</p>
                    <input type="Search" className="h-1/4 m-auto w-1/4 text-white bg-blue border-white" />
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
        </div>

    )
} export default Productos;

