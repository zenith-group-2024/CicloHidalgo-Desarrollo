import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, UserRound, AlignJustify } from 'lucide-react';
import { Link } from "react-router-dom";
import Logo from '../assets/images/logo.svg';
import AuthForm from './Forms.jsx'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); 
  const [cartCount, setCartCount] = useState(0); // Contador del carrito
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const addToCart = () => {
    // Esta función se llamaría donde realmente se agrega un producto al carrito
    setCartCount(prevCount => prevCount + 1); // Incrementa el contador
  };

  return (
    <nav className="bg-white p-4 w-full flex flex-col md:flex-row justify-between items-center border-b-2 border-border-gray-opacity z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        <img src={Logo} alt="logo" className="h-16 md:h-20 m-4" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black focus:outline-none"
        >
          <AlignJustify size={28} />
        </button>
      </div>

      <div className="hidden md:flex flex-grow justify-center space-x-8">
        <Link to="/" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Inicio</Link>
        <Link to="/Productos" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Productos</Link>
        <Link to="/Contenido" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Contenido</Link>
        <Link to="/Servicios" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Servicios</Link>
      </div>

      <div className="flex space-x-4 m-4 md:ml-4 relative">
        <Link to="/Carrito" onClick={addToCart}>
          <ShoppingCart size={28} className="transform transition-transform duration-300 hover:scale-110" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          )}
        </Link>
        <UserRound
          size={28}
          className="transform transition-transform duration-300 hover:scale-110 cursor-pointer"
          onClick={handleOpenAuthModal} 
        />
      </div>

      {isAuthModalOpen && <AuthForm isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />}
    </nav>
  );
};

export default Navbar;
