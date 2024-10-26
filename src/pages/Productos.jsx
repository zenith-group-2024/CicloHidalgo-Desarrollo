import React, { useContext, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Card from "../UI/CardProductos";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { CartContext } from '../UI/Prueba_Carrito.jsx';
import { useFetchProductos } from '../../hooks/FetchProductos.js';
import CheckBoxCategoria from '../UI/CheckBoxCategoria';
import loadingGif from '../assets/animaciones/AnimationLoading.gif';


export function Productos() {
    const { addToCart } = useContext(CartContext); 
    const { productos, isLoading } = useFetchProductos(); // Assuming useFetchProductos provides an isLoading flag

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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        hover: { scale: 1.05, transition: { duration: 0.3 } }
    };

    const filterVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="container mx-auto py-8">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={filterVariants}
                >
                    <motion.div className="bg-white p-6 rounded-md shadow-md" variants={filterVariants}>
                        <h1 className="font-secondary font-bold text-2xl text-gray-800 mb-4">Filtros</h1>
                        <CheckBoxCategoria
                            onCategoryChange={handleCategoryChange}
                            onSubCategoryChange={handleSubCategoryChange}
                            onBrandChange={handleBrandChange}
                        />
                    </motion.div>

                    <div className="md:col-span-3 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                        {isLoading ? (
                        

                            <div className="flex justify-center items-center col-span-full">
                                <img src={loadingGif} alt="Loading" className="w-20 h-20" />
                            </div>
                        ) : filteredProductos.length === 0 ? (
                            <p className="text-center text-gray-600">No hay productos disponibles.</p>
                        ) : (
                            filteredProductos.map((producto) => (
                                <motion.div
                                    key={producto.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                >
                                    <Card
                                        nombre={producto.nombre}
                                        id={producto.id}
                                        title={producto.marca}
                                        precio={`₡ ${producto.precio.toLocaleString("es-CR")} (IVAI)`}
                                        img={producto.imagen}
                                        addToCart={addToCart}  
                                    />
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}

export default Productos;
