import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from './Prueba_Carrito'; // Asegúrate de que esta ruta sea correcta

const CardDestacado = ({ title, precio, img, id }) => {
    const { addToCart } = useContext(CartContext); // Obtener la función addToCart del contexto

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Evitar que el clic en el botón active el Link
        addToCart(id); // Lógica para añadir el producto al carrito
    };

    return (
        <motion.div
            className="rounded-lg shadow-lg overflow-hidden h-[350px] w-[300px] transition-transform transform hover:scale-105 m-2 bg-[#F9F9F9] flex flex-col justify-between" // Cambiado a flex y justify-between
        >
            <Link to={`/producto/${id}`}>
                <div>
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-[200px] object-cover"
                    />
                    <div className="p-3 flex flex-col h-full">
                        <h2 className="text-lg font-bold mb-1 text-gray-800 flex-grow">{title}</h2>
                        <p className="text-2xl text-gray">{precio}</p>
                    </div>
                </div>
            </Link>
            <div className="flex justify-center mb-4"> {/* Contenedor para centrar el botón */}
                <button
                    onClick={handleAddToCart}
                    className="px-4 py-2 bg-blue text-white rounded-lg hover:bg-red hover:scale-105 transition duration-200 ease-in-out"
                >
                    Agregar al Carrito
                </button>
            </div>
        </motion.div>
    );
};

export default CardDestacado;
