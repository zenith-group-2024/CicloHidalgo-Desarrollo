import React, { useContext } from 'react';
import Card from "../UI/CardProductos";
import BiciImagen from "../assets/images/Bici_ejemplo.svg";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { CartContext } from '../UI/Prueba_Carrito.jsx';
import { useFetchProductos } from '../../hooks/FetchProductos.js';

export function Productos() {
    const { addToCart } = useContext(CartContext);
    const { productos } = useFetchProductos();

    return (
        <div className="bg-white h-full w-full">
            <Navbar />

            <div className="grid grid-cols-4 gap-8 mt-8 mx-6 max-w-fit">
                <div className="col-span-1 p-4 rounded-md">
                    <h1 className="font-secondary font-bold text-xl text-black mb-4">Productos</h1>
                </div>

                <div className="col-span-3 grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-8 mb-8">
                    {productos.length === 0 ? (
                        <p>No hay productos disponibles.</p>
                    ) : (
                        productos.map((producto) => (
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
