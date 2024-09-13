import React, { useEffect, useRef } from 'react';
import Card from '../UI/CardProductos'; 
import BiciImagen from '../assets/images/Bici_ejemplo.svg'; 

const ProductosDestacados = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                const maxScrollLeft = scrollWidth - clientWidth;
                const newScrollLeft = scrollLeft + 350; 
                carouselRef.current.scrollLeft = newScrollLeft > maxScrollLeft ? 0 : newScrollLeft;
            }
        }, 3000);

        return () => clearInterval(interval); 
    }, []);

    return (
        <section className="bg-white p-8">
            <h1 className="text-3xl font-bold mb-6 mt-20 text-center font-primary font-bold">Productos Destacados</h1>
            <div className="relative">
                <div 
                    ref={carouselRef}
                    className="flex hide-scrollbar whitespace-nowrap scroll-smooth"
                >
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                    <div className="inline-block w-72 sm:w-80 md:w-96 lg:w-[24rem] p-4 sm:p-6">
                        <Card title="Bici de montaña" precio="₡ 198.000,00 (IVAI)" img={BiciImagen} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductosDestacados;
