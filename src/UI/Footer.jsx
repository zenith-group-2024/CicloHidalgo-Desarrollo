import React from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react'; 
const Footer = () => {
    return (
        <footer className="bg-gray text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-bold mb-2">Contacto</h2>
                        <p className="mb-2">San Pedro de Poás, Alajuela, Costa Rica</p>
                        <p className="mb-2">Teléfono: (506) 2448-4946</p>
                        <p className="mb-2">Email: info@tusitio.com</p>
                    </div>

                    
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-bold mb-2">Enlaces Rápidos</h2>
                        <ul>
                            <li className="mb-2">
                                <a href="/" className="hover:underline">Inicio</a>
                            </li>
                            <li className="mb-2">
                                <a href="/about" className="hover:underline">Productos</a>
                            </li>
                            <li className="mb-2">
                                <a href="/services" className="hover:underline">Servicios</a>
                            </li>
                            <li className="mb-2">
                                <a href="/content" className="hover:underline">Contenido</a>
                            </li>
                            <li className="mb-2">
                                <a href="/about" className="hover:underline">Sobre Nosotros</a>
                            </li>
                        </ul>
                    </div>
                </div>

                
                <div className="text-center mt-6">
                    <p>&copy; {new Date().getFullYear()} Ciclo Hidalgo. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
