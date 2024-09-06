import React from "react";
import Card from "./CardProductos";
import BiciImagen from "../assets//images/Bici_ejemplo.svg";
import Navbar from "./Navbar";
import Checkboxes from "./CheckBoxPrueba";
export function Productos() {
    return (
        <div className="bg-white h-full w-full">
            <Navbar />
            <div className="grid grid-cols-4 gap-8  mt-8 mx-6 max-w-fit">
           
                <div className="col-span-1  p-4 rounded-md">
                
                    <h1 className="font-secondary font-bold text-xl text-black mb-4">Filtrar por</h1>
                    <Checkboxes />
                    <select className=" text-black w-full mb-4 font-secondary font-bold  bg-transparent border-b-2  border-gray p-2" >
                        <option value='1'>Marca</option>
                        <option value='2'>Tipo Producto</option>
                        <option value='3'>Modelo</option>
                        <option value='4'>Categoria</option>
                        <option value='5'>Especificacion</option>
                        <option value='6'>Precio</option>
                    </select>
                    
                </div>

                {/* Columna de Productos */}
                <div className="col-span-3 grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-8">
                    <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                </div>
            </div>
        </div>
    );
}

export default Productos;
