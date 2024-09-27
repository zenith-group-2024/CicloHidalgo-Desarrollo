import React from 'react';
import Navbar from '../UI/Navbar'; 
import Footer from '../UI/Footer';

const Servicios = () => {
    const servicios = [
        {
            title: "Lavado y Engrase",
            description: "Limpieza a fondo de la bicicleta y engrase de componentes esenciales para su buen funcionamiento.",
            price: "",
        },
        {
            title: "Mantenimiento y Ajuste de Componentes",
            description: "Ajustamos y verificamos los componentes principales de tu bicicleta para asegurar su buen estado y rendimiento.",
            price: "",
        },
        {
            title: "Cambio de Piezas",
            description: "Sustituimos piezas desgastadas o dañadas con repuestos de alta calidad.",
            price: "",
        },
        {
            title: "Vueltas Ciclistas Nocturnas",
            description: "Únete a nuestras rutas nocturnas guiadas para disfrutar del ciclismo en un ambiente seguro.",
            price: "",
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <header className="bg-blue p-6 text-white text-center rounded-b-lg shadow-md">
                <h1 className="text-3xl md:text-4xl font-bold font-primary">Horario de Servicios</h1>
                <p className="text-lg md:text-xl py-2 font-secondary font-semibold">
                    Lunes a Viernes: 9:00 AM - 6:00 PM <br />
                    Sábados: 9:00 AM - 5:30 PM <br />
                    Domingo: Cerrado
                </p>
            </header>

            <main className="container mx-auto my-8 px-4">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {servicios.map((servicio, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-primary mb-2 text-black">{servicio.title}</h3>
                                <p className="text-gray mb-4 font-secondary">{servicio.description}</p>
                                <p className="text-lg font-bold font-secondary text-red">{servicio.price}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <footer className="mt-8 text-center">
                    <h2 className="text-xl font-bold mb-4 font-primary">Para más información sobre nuestros servicios o para agendar una cita, no dudes en contactarnos.</h2>
                </footer>
            </main>
            <Footer />
        </div>
    );
};

export default Servicios;
