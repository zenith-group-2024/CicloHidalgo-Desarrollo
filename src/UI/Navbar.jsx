import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white p-2 w-full flex justify-between items-center">
            <div className="navbar-logo">
                <img src="/src/assets/images/logo.png" alt="Logo" className="h-20 m-4" />
            </div>
            <div className="flex space-x-10 text-xl">
                <a href="#home" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Inicio</a>
                <a href="#about" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Productos</a>
                <a href="#services" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Servicios</a>
                <a href="#contact" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Contenido</a>
            </div>
            <div className="flex space-x-4 m-4">
                <img
                    src="/src/assets/icons/usuario.png"
                    alt="Home Icon"
                    className="w-10 h-10 transform transition-transform duration-300 hover:scale-110"
                />
                <img
                    src="/src/assets/icons/carrito.png"
                    alt="Coffee Icon"
                    className="w-10 h-10 transform transition-transform duration-300 hover:scale-110"
                />
            </div>

        </nav>
    );
}

export default Navbar;
