import React, { useContext } from 'react';
import { GlobalContext } from '../global/GlobalState';
import { Link } from 'react-router-dom';
import { X, User, List } from 'lucide-react';
import { motion } from 'framer-motion';

const MenuPerfil = ({ onClose }) => {
  const { state, logout } = useContext(GlobalContext);
  const { isAuthenticated } = state;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const menuVariants = {
    hidden: { x: '100%' }, 
    visible: { x: 0 },     
    exit: { x: '100%' }  
  };

  return (
    <motion.div
      className="bg-white h-screen w-64 shadow-lg fixed right-0 top-0 z-50 flex flex-col rounded-l-3xl"
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      variants={menuVariants}
    >
 
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-600 hover:text-red-600 focus:outline-none"
      >
        <X className="w-6 h-6" />
        <span className="sr-only">Cerrar</span>
      </button>

      <div className="p-6 border-b border-gray-200  ">
        <h1 className="text-2xl font-primary font-bold text-black">Perfil</h1>
      </div>

      <div className="flex-grow p-6">
        {isAuthenticated && (
          <div className="grid gap-6">
         
            <Link
              to="/PerfilCliente"
              className="flex items-center bg-blue text-white p-3 rounded-2xl text-center font-secondary text-lg transform transition-transform duration-300 hover:scale-105 shadow-md"
            >
              <User className="w-6 h-6 mr-3" />
              Editar perfil
            </Link>

            <Link
              to="/ver-ordenes"
              className="flex items-center bg-blue text-white p-3 rounded-2xl text-center font-secondary text-lg transform transition-transform duration-300 hover:scale-105 shadow-md"
            >
              <List className="w-6 h-6 mr-3" />
              Ver órdenes
            </Link>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="bg-old text-white p-3 rounded-2xl font-secondary text-lg w-full transform transition-transform duration-300 hover:scale-105 shadow-lg"
        >
          Cerrar sesión
        </button>
      </div>
    </motion.div>
  );
};

export default MenuPerfil;
