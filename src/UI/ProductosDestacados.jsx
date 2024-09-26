import React, { useEffect, useRef, useState } from 'react';
import Card from '../UI/CardProductos'; 
import { useFetchProductos } from '../../hooks/FetchProductos';

const ProductosDestacados = () => {
    const carouselRef = useRef(null);
    const { productos } = useFetchProductos();

   

    return (
        <section className="bg-white p-8">
            <h1 className="text-3xl font-bold mb-6 mt-20 text-center font-primary">Productos Destacados</h1>
            <div className="relative">
                <div 
                    ref={carouselRef}
                    className="flex hide-scrollbar whitespace-nowrap scroll-smooth"
                >
                    {productos.map((producto) => (
                        <div key={producto.id} className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                            <Card title={producto.nombre} precio={producto.precio} img={`../src/assets/${producto.imagen}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductosDestacados;
