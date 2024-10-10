import React, { useState, useEffect, useRef, useContext } from 'react';
import { ShoppingCart, UserRound, AlignJustify, UserCheck } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/images/logo.svg';
import AuthForm from '../forms/Login';
import { GlobalContext } from '../global/GlobalState';
import { CartContext } from '../UI/Prueba_Carrito.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { cart, addToCart, message, showMessage } = useContext(CartContext);
  const menuRef = useRef(null);

  const location = useLocation();
  const { state, login, logout } = useContext(GlobalContext);


  const isAuthenticated = state.user !== null;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);


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

      <div className="hidden md:flex flex-grow justify-center space-x-10">
        <Link to="/" className={`text-black font-primary font-bold text-lg hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/' ? 'text-red' : ''}`}>
          Inicio
        </Link>
        <Link to="/Productos" className={`text-black font-primary font-bold text-lg hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Productos' ? 'text-red' : ''}`}>
          Productos
        </Link>
        <Link to="/Contenido" className={`text-black font-primary font-bold text-lg hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Contenido' ? 'text-red' : ''}`}>
          Contenido
        </Link>
        <Link to="/Servicios" className={`text-black font-primary font-bold text-lg hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Servicios' ? 'text-red' : ''}`}>
          Servicios
        </Link>
      </div>

      <div className="flex space-x-4 m-4 md:ml-4 relative">
        <Link to="/Carrito" className="relative flex items-center">
          <ShoppingCart size={28} className="transform transition-transform duration-300 hover:scale-110" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <div
          onClick={handleOpenAuthModal}
          className="transform transition-transform duration-300 hover:scale-110 cursor-pointer"
        >
          {isAuthenticated ? (
            <UserCheck size={28} /> // Ícono de usuario autenticado
          ) : (
            <UserRound size={28} /> // Ícono de usuario no autenticado
          )}
        </div>
      </div>

      {isAuthModalOpen && <AuthForm isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />}
      
      {showMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 mb-12 bg-white text-black p-2 rounded shadow-lg text-xl z-50 transition-opacity duration-300">
        {message}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

