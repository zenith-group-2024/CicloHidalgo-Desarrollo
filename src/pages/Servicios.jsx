// src/Servicios.js
import React from 'react';
import Navbar from '../UI/Navbar'; 
import Footer from '../UI/Footer';

const Servicios = () => {
    const servicios = [
        {
            title: "Mantenimiento y Reparación de Bicicletas",
            description: "Realizamos un mantenimiento completo de tu bicicleta para asegurar su rendimiento óptimo. Esto incluye ajustes de frenos, cambios de velocidades, y revisión de ruedas.",
            price: "Desde $25",
        },
        {
            title: "Asesoría Personalizada en Selección de Bicicletas",
            description: "Te ayudamos a elegir la bicicleta perfecta según tu estilo de vida y necesidades. Ya seas un ciclista ocasional o un entusiasta, tenemos la opción adecuada para ti.",
            price: "Servicio gratuito con la compra de una bicicleta.",
        },
        {
            title: "Clases de Ciclismo",
            description: "Ofrecemos clases de ciclismo para principiantes y avanzados, diseñadas para mejorar tus habilidades y confianza en la carretera.",
            price: "$40 por sesión de 1.5 horas",
        },
        {
            title: "Alquiler de Bicicletas",
            description: "Si no tienes tu propia bicicleta o deseas probar un modelo nuevo, ofrecemos un servicio de alquiler flexible.",
            price: "Desde $15 por día",
        },
    ];

    return (
        <div className="bg-gray-100">
            <Navbar /> {/* Añade el Navbar aquí */}
            <header className="bg-blue text-white p-4 font-bold">
                <h1 className="text-3xl text-center">Servicios de Ciclo Hidalgo</h1>
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
                    <p></p>
                   
                </footer>
            </main>
            <Footer /> {/* Añade el Footer aquí */}
        </div>
    );
};

export default Servicios;
