import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, UserCheck, UserRound, AlignJustify } from 'lucide-react';
import { GlobalContext } from '../global/GlobalState.jsx'; 
import AuthForm from '../forms/Login.jsx'; 
import logo from '../assets/images/logo.svg'; 
import PerfilCliente from '../pages/PerfilCliente.jsx'; 
import { CartContext } from '../UI/Prueba_Carrito.jsx';
const Navbar = () => {
  const { state, logout } = useContext(GlobalContext);
  const { isAuthenticated } = state;
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isPerfilModalOpen, setIsPerfilModalOpen] = React.useState(false); 
  const location = useLocation();
  const { cart, addToCart, message, showMessage } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
 logout();
    
  };

  return (
    <nav className="bg-white p-4 w-full flex flex-col md:flex-row justify-between items-center border-b-2 border-border-gray-opacity z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        <img src={logo} alt="logo" className="h-16 md:h-20 m-4" />
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

          <Link to="/admin-dashboard" className={`text-black font-primary font-bold text-lg hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/admin-dashboard' ? 'text-red' : ''}`}>
            Dashboard
          </Link>

      </div>

      <div className="flex space-x-4 m-4 md:ml-4 relative">
      <Link to="/Carrito" className="relative flex items-center">
  <ShoppingCart size={28} className="transform transition-transform duration-300 hover:scale-110" />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2">
      <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
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
  {isAuthenticated ? <UserCheck size={28} /> : <UserRound size={28} />}
</div>

        {isAuthenticated && (
          <button onClick={handleLogout} className="text-red-600">Cerrar sesión</button>
        )}
      </div>

      {isAuthModalOpen && <AuthForm isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />}
      {isPerfilModalOpen && <PerfilCliente isOpen={isPerfilModalOpen} onClose={() => setIsPerfilModalOpen(false)} />} 
    </nav>
  );
};

export default Navbar;

