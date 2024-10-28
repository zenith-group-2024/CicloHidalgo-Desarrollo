import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, UserCheck, UserRound, AlignJustify, X } from 'lucide-react';
import { GlobalContext } from '../global/GlobalState.jsx'; 
import AuthForm from '../forms/Login.jsx'; 
import logo from '../assets/images/logo.svg'; 
import MenuPerfil from '../pages/MenuPerfil.jsx';
import { CartContext } from '../UI/prueba_carrito.jsx';

const Navbar = () => {
  const { state, logout } = useContext(GlobalContext);
  const { isAuthenticated, isAdmin } = state;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPerfilModalOpen, setIsPerfilModalOpen] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú
  const location = useLocation();
  const { cart, message, showMessage } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };
  
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white p-4 w-full flex flex-col md:flex-row lg:justify-between items-center border-b-2 border-border-gray-opacity z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className={`transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/' ? 'text-red' : ''}`}>
          <img src={logo} alt="logo" className="lg:h-16 md:h-14 m-4" />
        </Link>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-black focus:outline-none"
        >
          <AlignJustify size={28} />
        </button>
      </div>

      
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed right-0 top-0 w-2/4 bg-white h-full p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-black mb-4 absolute top-4 right-4">
              <X size={24} />
            </button>
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className={`text-black font-primary font-bold hover:text-gray ${location.pathname === '/' ? 'text-red' : ''}`}>
                Inicio
              </Link>
              <Link to="/Productos" onClick={() => setIsMenuOpen(false)} className={`text-black font-primary font-bold hover:text-gray ${location.pathname === '/Productos' ? 'text-red' : ''}`}>
                Productos
              </Link>
              <Link to="/Contenido" onClick={() => setIsMenuOpen(false)} className={`text-black font-primary font-bold hover:text-gray ${location.pathname === '/Contenido' ? 'text-red' : ''}`}>
                Contenido
              </Link>
              <Link to="/Servicios" onClick={() => setIsMenuOpen(false)} className={`text-black font-primary font-bold hover:text-gray ${location.pathname === '/Servicios' ? 'text-red' : ''}`}>
                Servicios
              </Link>
              {isAdmin && (
                <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)} className={`text-black font-primary font-bold hover:text-gray ${location.pathname === '/admin-dashboard' ? 'text-red' : ''}`}>
                  Admin CRUD
                </Link>
              )}
              {isAdmin && (
                <Link to="/Dashboard" onClick={() => setIsMenuOpen(false)} className={`text-black font-primary font-bold hover:text-gray ${location.pathname === '/Dashboard' ? 'text-red' : ''}`}>
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:flex flex-grow justify-center xl:space-x-10 lg:space-x-10 md:space-x-4">
        <Link to="/" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/' ? 'text-red' : ''}`}>
          Inicio
        </Link>
        <Link to="/Productos" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Productos' ? 'text-red' : ''}`}>
          Productos
        </Link>
        <Link to="/Contenido" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Contenido' ? 'text-red' : ''}`}>
          Contenido
        </Link>
        <Link to="/Servicios" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Servicios' ? 'text-red' : ''}`}>
          Servicios
        </Link>
        {isAdmin && (
          <Link to="/admin-dashboard" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/admin-dashboard' ? 'text-red' : ''}`}>
            Admin CRUD
          </Link>
        )}
        {isAdmin && (
          <Link to="/Dashboard" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Dashboard' ? 'text-red' : ''}`}>
            Dashboard
          </Link>
        )}
      </div>

      <div className="flex lg:space-x-4 md:space-x-2 m-4 md:ml-4 relative">
        <Link to="/Carrito" className="relative flex items-center">
          <ShoppingCart className="lg:w-8 lg:h-8 md:w-7 md:h-7 transform transition-transform duration-300 hover:scale-110" />
          {cartCount > 0 && (
            <span className="lg:absolute lg:-top-2 lg:-right-2">
              <span className="bg-red text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            </span>
          )}
        </Link>
        {showMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 mb-12 bg-white text-black p-2 rounded shadow-lg text-xl z-50 transition-opacity duration-300">
            {message}
          </div>
        )}
        <div onClick={() => isAuthenticated ? setIsPerfilModalOpen(true) : setIsAuthModalOpen(true)} className="transform transition-transform duration-300 hover:scale-110 cursor-pointer">
          {isAuthenticated ? <UserCheck className='lg:w-8 lg:h-8 md:w-7 md:h-7 mt-1' /> : <UserRound className='w-8 h-8 md:w-7 md:h-7 mt-1' />}
        </div>
      </div>

      {isAuthModalOpen && <AuthForm isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />}
      {isPerfilModalOpen && <MenuPerfil isOpen={isPerfilModalOpen} onClose={() => setIsPerfilModalOpen(false)} />} 
    </nav>
  );
};

export default Navbar;
