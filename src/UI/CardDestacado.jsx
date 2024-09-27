import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from './Prueba_Carrito';
import { useFetchProductoDetallado } from '../../hooks/FetchProductoDetallado.js';

const CardDestacado = ({ title, precio, img, id }) => {
    const { addToCart } = useContext(CartContext);
    const { producto, isLoading, error } = useFetchProductoDetallado(id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const numericPrice = typeof producto.precio === 'number'
            ? producto.precio
            : parseFloat(producto.precio.replace(/[^\d.-]/g, ''));

        if (isNaN(numericPrice)) {
            console.error("Precio inválido");
            return;
        }

        addToCart({
            id: producto.id,
            title: producto.marca,
            precio: numericPrice,
            img: producto.imagen,
        });
    };

    return (
        <motion.div
            className="rounded-lg shadow-lg overflow-hidden h-[350px] w-[300px] transition-transform transform hover:scale-105 m-2 bg-white flex flex-col justify-between">
            <Link to={`/producto/${id}`}>
                <div>
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-[200px] object-cover"
                    />
                    <div className="p-3 flex flex-col h-full">
                        <h2 className="text-lg font-bold mb-1 text-black flex-grow">{title}</h2>
                        <p className="text-2xl text-gray">{precio}</p>
                    </div>
                </div>
            </Link>
            <div className="flex justify-center mt-auto mb-8">
                <button
                    onClick={handleAddToCart}
                    className="px-4 py-2 bg-red text-white rounded-lg shadow-md transition duration-200 ease-in-out hover:scale-105">
                    Agregar al Carrito
                </button>
            </div>
        </motion.div>
    );
};

export default CardDestacado;
