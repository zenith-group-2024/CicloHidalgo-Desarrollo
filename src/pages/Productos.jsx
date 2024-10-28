import React, { useContext, useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
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

    //busqueda(searchbar)
    const [searchProducto, setSearchProducto] = useState('')
    const [productoFiltrados, setProductoFiltrados] = useState([])

    const isEmpty = (value) => {
        if (value == ''){
             return true
        } else {
            return false
        }
    }

    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchProducto(searchTerm)

        const productoFiltrados = productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
        setProductoFiltrados(productoFiltrados);
    }

    const [checkboxFiltros, setCheckboxFiltros] = useState(false)
    const handleCheckboxFiltros = (e) => {
        if (e.target.checked){
            setCheckboxFiltros(true)
        }else {
            setCheckboxFiltros(false)
        }
    }

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
            <motion.div
              className="bg-white p-6 rounded-md shadow-md"
              variants={filterVariants}
            >
              <h2 className="font-secondary font-bold text-2xl text-gray-800 mb-4">
                Busqueda
              </h2>

              <div className="z-10 relative rounded-md flex items-center">
                <input
                  type="text"
                  value={searchProducto}
                  onChange={handleInputChange}
                  placeholder="Search..."
                  className="w-[445px] xxs:w-[245px] rounded-full px-4 py-2 border focus:outline-none border-black pr-10 mt-2 mb-2"
                />
              </div>

              <h1 className="font-secondary font-bold text-2xl text-gray-800 mb-4">
                Filtros
              </h1>
              <div>
                <input type="checkbox"
                        name="checkboxFiltros" 
                        id="1"
                        onChange={handleCheckboxFiltros}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                        />
                <label className="text-gray-700 ml-2" htmlFor="checkboxFiltros">{checkboxFiltros? 'Ver Más': 'Ver Menos'}</label>
              </div>
              
             <div className={checkboxFiltros ? 'hidden' : 'block'}>
                <CheckBoxCategoria
                    onCategoryChange={handleCategoryChange}
                    onSubCategoryChange={handleSubCategoryChange}
                    onBrandChange={handleBrandChange}
                />
            </div> 
              
            </motion.div>
            
            <div className="md:col-span-3 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {isEmpty(searchProducto)
            ? isLoading ? (
                <div className="flex justify-center items-center col-span-full">
                  <img src={loadingGif} alt="Loading" className="w-20 h-20" />
                </div>
              ) : filteredProductos.length === 0 ? (
                <p className="text-center text-gray-600">
                  No hay productos disponibles.
                </p>
              ) : (
                filteredProductos.map((producto) => (
                  <motion.div
                    key={producto.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Card producto={producto} addToCart={addToCart} />
                  </motion.div>
                ))
              )
            
            : isLoading ? (
                <div className="flex justify-center items-center col-span-full">
                  <img src={loadingGif} alt="Loading" className="w-20 h-20" />
                </div>
              ) : productoFiltrados.length === 0 ? (
                <p className="text-center text-gray-600">
                  No hay productos disponibles.
                </p>
              ) : (
                productoFiltrados.map((producto) => (
                  <motion.div
                    key={producto.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Card producto={producto} addToCart={addToCart} />
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
