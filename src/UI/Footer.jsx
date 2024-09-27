import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Contacto</h2>
                        <p className="mb-3 text-lg">San Pedro de Poás, Alajuela, Costa Rica</p>
                        <p className="mb-3 text-lg">Teléfono: (506) 2448-4946</p>
                        <p className="mb-3 text-lg">Email: ciclohidalgo@hotmail.com</p>
                    </div>

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Enlaces Rápidos</h2>
                        <ul>
                            <li className="mb-2">
                                <Link to="/" className="hover:underline text-lg">Inicio</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/Productos" className="hover:underline text-lg">Productos</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/Servicios" className="hover:underline text-lg">Servicios</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/Contenido" className="hover:underline text-lg">Contenido</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="hover:underline text-lg">Sobre Nosotros</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-lg">&copy; {new Date().getFullYear()} Ciclo Hidalgo. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
