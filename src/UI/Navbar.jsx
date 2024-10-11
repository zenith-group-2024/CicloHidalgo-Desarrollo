import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, UserCheck, UserRound, AlignJustify } from 'lucide-react';
import { GlobalContext } from '../global/GlobalState.jsx'; 
import AuthForm from '../forms/Login.jsx'; // Asegúrate de que la ruta sea correcta
import logo from '../assets/images/logo.svg'; 

const Navbar = () => {
  const { state } = useContext(GlobalContext);
  const { isAuthenticated } = state; // Para saber si el usuario está autenticado
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const cartCount = 0; // Cambia esto según tu lógica para obtener el conteo del carrito
  const location = useLocation(); // Obtener la ubicación actual

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <nav className="bg-white p-4 w-full flex flex-col md:flex-row justify-between items-center border-b-2 border-border-gray-opacity z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        <img src={logo} alt="logo" className="h-16 md:h-20 m-4" />
        <button
          onClick={() => setIsOpen(!isOpen)} // Asegúrate de definir `isOpen` si es necesario
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

          <Link to="/admin-dashboard" className={`text-black font-primary font-bold text-lg hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/admin-dashboard' ? 'text-red' : ''}`}>
            Dashboard
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
            <UserCheck size={28} /> 
          ) : (
            <UserRound size={28} /> 
          )}
        </div>
      </div>

      {isAuthModalOpen && <AuthForm isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />}
    </nav>
  );
};

export default Navbar;
