import React, { useState } from "react";
import Card from "../UI/CardProductos";
import BiciImagen from "../assets//images/Bici_ejemplo.svg";
import Navbar from "../UI/Navbar";
import CheckBoxMarca from "../UI/CheckBoxMarca";
import CheckBoxCategoria from '../UI/CheckBoxCategoria';
import Footer from "../UI/Footer";
import CheckBoxSubCategoria from "../UI/CheckBoxSubCategoria";

export function Productos() {
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleCategoryChange = (categories) => {
        setSelectedCategory(categories);
    };

    return (
        <div className="bg-white h-full w-full">
            <Navbar />
            <div className="grid grid-cols-4 gap-8  mt-8 mx-6 max-w-fit">
                <div className="col-span-1  p-4 rounded-md">
                    <h1 className="font-secondary font-bold text-xl text-black mb-4">Filtrar por</h1>
                    
                    <CheckBoxCategoria onCategoryChange={handleCategoryChange} />
                    <CheckBoxSubCategoria selectedCategory={selectedCategory} />
                    <CheckBoxMarca selectedCategory={selectedCategory} />
                  
                        

                    
                </div>

                <div className="col-span-3 grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-8 mb-8">
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
            <Footer/>
        </div>
    );
}

export default Productos;
