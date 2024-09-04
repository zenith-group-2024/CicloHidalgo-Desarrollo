import React from 'react';
import Logo from '../assets/images/logo.svg';
import  userIcon from '../assets/icons/userIcon.svg';
import cartIcon from '../assets/icons/cartIcon.svg';

const Navbar = () => {
    return (
        <nav className="bg-white p-2 w-full flex justify-between items-center">
            <div className="navbar-logo">
                <img  src={Logo} alt="logo" className="h-20 m-4" />
            </div>

            <div className="flex space-x-10 text-xl">
                <a href="#home" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Inicio</a>
                <a href="#about" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Productos</a>
                <a href="#services" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Servicios</a>
                <a href="#contact" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Contenido</a>
            </div>

            <div className="flex space-x-4 m-4">
                <img  src={userIcon} alt="logo" className="transform transition-transform duration-300 hover:scale-110" />
                <img  src={cartIcon} alt="logo" className="transform transition-transform duration-300 hover:scale-110" />
            </div>
        </nav>
    );
}

export default Navbar;
