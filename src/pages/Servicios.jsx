// src/Servicios.js
import React from 'react';
import Navbar from '../UI/Navbar'; 
import Footer from '../UI/Footer';

const Servicios = () => {
    const servicios = [
        {
            title: "Lavado y Engrase",
            description: "Limpieza a fondo de la bicicleta y engrase de componentes esenciales para su buen funcionamiento.",
            price: "Desde $15",
        },
        {
            title: "Mantenimiento y Ajuste de Componentes",
            description: "Ajustamos y verificamos los componentes principales de tu bicicleta para asegurar su buen estado y rendimiento.",
            price: "Desde $25",
        },
        {
            title: "Cambio de Piezas",
            description: "Sustituimos piezas desgastadas o dañadas con repuestos de alta calidad.",
            price: "Costo de la pieza más mano de obra",
        },
        {
            title: "Vueltas Ciclistas Nocturnas",
            description: "Únete a nuestras rutas nocturnas guiadas para disfrutar del ciclismo en un ambiente seguro.",
            price: "Desde $10 por ruta",
        },
    ];

    return (
        <div className="bg-gray-100">
            <Navbar /> {/* Añade el Navbar aquí */}
            <header className="bg-gray text-white p-6 font-bold">
                <p className="text-center text-2xl md:text-3xl lg:text-4xl mb-2">Horario de Servicios</p>
                <p className="text-center text-lg md:text-xl lg:text-2xl bg-blue text-black py-2 rounded-lg shadow-lg">
                    Lunes a Viernes: 9:00 AM - 6:00 PM <br />
                    Sábados: 9:00 AM - 5:30 PM <br />
                    Domingo: Cerrado
                </p>
            </header>

            <main className="container mx-auto my-8">
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg shadow-lg ">
                        {servicios.map((servicio, index) => (
                            <div key={index} className="bg-white text-black rounded-lg shadow p-4">
                                <h3 className="text-xl font-semibold font-primary">{servicio.title}</h3>
                                <p className="mt-2 font-secondary">{servicio.description}</p>
                                <p className="mt-2 font-bold font-secondary">{servicio.price}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="mt-8">
                    <h2 className="text-xl font-bold mb-4 font-primary">Para más información sobre nuestros servicios o para agendar una cita, no dudes en contactarnos</h2>
                </footer>
            </main>
            <Footer /> {/* Añade el Footer aquí */}
        </div>
    );
};

export default Servicios;
