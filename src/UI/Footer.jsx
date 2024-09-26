import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link

const Footer = () => {
    return (
        <footer className="bg-gray text-white py-10"> {/* Aumentar padding vertical */}
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Contacto</h2> {/* Aumentar tamaño del encabezado */}
                        <p className="mb-3 text-lg">San Pedro de Poás, Alajuela, Costa Rica</p> {/* Aumentar tamaño del párrafo */}
                        <p className="mb-3 text-lg">Teléfono: (506) 2448-4946</p> {/* Aumentar tamaño del párrafo */}
                        <p className="mb-3 text-lg">Email: ciclohidalgo@hotmail.com</p> {/* Aumentar tamaño del párrafo */}
                    </div>

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Enlaces Rápidos</h2> {/* Aumentar tamaño del encabezado */}
                        <ul>
                            <li className="mb-2">
                                <Link to="/" className="hover:underline text-lg">Inicio</Link> {/* Usar Link en lugar de a */}
                            </li>
                            <li className="mb-2">
                                <Link to="/Productos" className="hover:underline text-lg">Productos</Link> {/* Usar Link en lugar de a */}
                            </li>
                            <li className="mb-2">
                                <Link to="/Servicios" className="hover:underline text-lg">Servicios</Link> {/* Usar Link en lugar de a */}
                            </li>
                            <li className="mb-2">
                                <Link to="/Contenido" className="hover:underline text-lg">Contenido</Link> {/* Usar Link en lugar de a */}
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="hover:underline text-lg">Sobre Nosotros</Link> {/* Usar Link en lugar de a */}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-8"> {/* Aumentar margen superior */}
                    <p className="text-lg">&copy; {new Date().getFullYear()} Ciclo Hidalgo. Todos los derechos reservados.</p> {/* Aumentar tamaño del texto */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
