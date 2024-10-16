import React, { useContext, useState, useEffect, useCallback } from 'react';
import Card from "../UI/CardProductos";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { CartContext } from '../UI/Prueba_Carrito.jsx';
import { useFetchProductos } from '../../hooks/FetchProductos.js';
import CheckBoxCategoria from '../UI/CheckBoxCategoria';

export function Productos() {
    const { addToCart } = useContext(CartContext);
    const { productos } = useFetchProductos();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState(productos);

    const handleCategoryChange = useCallback((selected) => {
        setSelectedCategories(selected);
    }, []);

    const handleSubCategoryChange = useCallback((selected) => {
        setSelectedSubCategories(selected);
    }, []);

    const handleBrandChange = useCallback((selected) => {
        setSelectedBrands(selected);
    }, []);


    useEffect(() => {
        const filterProducts = () => {
            const filtered = productos.filter((producto) => {
                const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(producto.categoria);
                const subCategoryMatch = selectedSubCategories.length === 0 || selectedSubCategories.includes(producto.subcategoria);
                const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(producto.marca);
                return categoryMatch && subCategoryMatch && brandMatch;
            });
            setFilteredProductos(filtered);
        };

        filterProducts();
    }, [productos, selectedCategories, selectedSubCategories, selectedBrands]); 

   
    useEffect(() => {
        if (productos.length > 0) {
            setFilteredProductos(productos);
        }
    }, [productos]);

    return (
        <div className="bg-white h-full w-full">
            <Navbar />

            <div className="grid grid-cols-4 gap-8 mt-8 mx-6 max-w-fit">
                <div className="col-span-1 p-4 rounded-md">
                    <h1 className="font-secondary font-bold text-xl text-black mb-4">Filtros</h1>
                    <CheckBoxCategoria
                        onCategoryChange={handleCategoryChange}
                        onSubCategoryChange={handleSubCategoryChange}
                        onBrandChange={handleBrandChange}
                    />
                </div>

                <div className="col-span-3 grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-8 mb-8">
                    {filteredProductos.length === 0 ? (
                        <p>No hay productos disponibles.</p>
                    ) : (
                        filteredProductos.map((producto) => (
                            <Card
                                key={producto.id}
                                nombre={producto.nombre}
                                id={producto.id}
                                title={producto.marca}
                                precio={`₡ ${producto.precio} (IVAI)`}
                                img={producto.imagen}
                               
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
