import React, { useState, useContext } from 'react';
import Card from "../UI/CardProductos";
import BiciImagen from "../assets/images/Bici_ejemplo.svg";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { CartContext } from '../UI/Prueba_Carrito.jsx';
import { useFetchProductos } from '../../hooks/FetchProductos.js';
import CheckBoxCategoria from '../UI/CheckBoxCategoria.jsx';

export function Productos() {
    const { addToCart } = useContext(CartContext);

    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);

    const { productos } = useFetchProductos();

   
    const handleCategoryChange = (categories) => {
        setSelectedCategory(categories);
    };

    const handleSubCategoryChange = (subCategories) => {
        setSelectedSubCategory(subCategories);
    };

    const handleBrandChange = (brands) => {
        setSelectedBrand(brands);
    };

  
    const filteredProducts = productos.filter(producto => {
        const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(producto.categoria);
        const subCategoryMatch = selectedSubCategory.length === 0 || selectedSubCategory.includes(producto.subcategoria);
        const brandMatch = selectedBrand.length === 0 || selectedBrand.includes(producto.marca);

        return categoryMatch && subCategoryMatch && brandMatch;
    });

    return (
        <div className="bg-white h-full w-full">
            <Navbar />

            <div className="grid grid-cols-4 gap-8 mt-8 mx-6 max-w-fit">
                <div className="col-span-1 p-4 rounded-md">
                    <h1 className="font-secondary font-bold text-xl text-black mb-4">Filtrar por</h1>

                   
                    <CheckBoxCategoria
                        onCategoryChange={handleCategoryChange}
                        onSubCategoryChange={handleSubCategoryChange}
                        onBrandChange={handleBrandChange}
                    />
                </div>

                <div className="col-span-3 grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-8 mb-8">
                    {filteredProducts.length === 0 ? (
                        <p>No hay productos disponibles para los filtros seleccionados.</p>
                    ) : (
                        filteredProducts.map((producto) => (
                            <Card
                                key={producto.id}
                                id={producto.id}
                                title={producto.marca}
                                precio={`₡ ${producto.precio} (IVAI)`}
                                img={BiciImagen}
                            />
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Productos;
