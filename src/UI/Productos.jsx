import React from "react";
import Card from "./CardProductos";
import BiciImagen from "../assets/Bici_ejemplo.svg";
import Navbar from "./Navbar";

export function Productos() {
    return (
       
        <div className="bg-white h-full w-full ">
             <Navbar/>
        <div className=" grid grid-cols-1 gap-8 mx-auto">
            <div className="container m-auto max-w-fit w-3/4 bg-blue p-2 my-4 rounded-md ">
                <div className=" flex gap-8">
                    <h1 className=" font-secondary font-bold text-xl text-white ">Filtrar por </h1>
                    <select class=" text-white w-1/4 m-auto font-secondary  font-bold  bg-blue ">
                        <option value='1'>Marca</option>
                        <option value='2'>Tipo Producto</option>
                        <option value='3'>Modelo</option>
                        <option value='4'>Categoria</option>
                        <option value='5'>Especificacion</option>
                        <option value='6'>Precio</option>
                    </select>
                    <select class=" text-white w-1/4 m-auto font-secondary  font-bold  bg-blue ">
                        <option value='1'>Marca</option>
                        <option value='2'>Tipo Producto</option>
                        <option value='3'>Modelo</option>
                        <option value='4'>Categoria</option>
                        <option value='5'>Especificacion</option>
                        <option value='6'>Precio</option>
                    </select>
                  
                    <input type="Search" className="h-1/4 m-auto w-1/4 text-black bg-blue-500 border-2 border-white rounded" 
/>
                </div>
            </div>
          
            <div className="grid grid-cols-3 gap-8 mx-auto">
          
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
            <div className="grid grid-cols-3 gap-8 mx-auto">
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

            <div className="grid grid-cols-3 gap-8 mx-auto">
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
            <div className="grid grid-cols-3 gap-8 mx-auto">
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

