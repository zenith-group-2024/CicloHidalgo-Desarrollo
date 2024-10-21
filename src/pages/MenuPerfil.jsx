import React, { useContext } from 'react';
import { GlobalContext } from '../global/GlobalState';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';


const MenuPerfil = ({ isOpen, onClose }) => {
    const { state, logout } = useContext(GlobalContext);
    const { isAuthenticated } = state;
  
    const handleLogout = () => {
      logout();
      onClose();
    };
  
    return (
      <div className="bg-white h-screen w-64 shadow-lg fixed right-0 top-0 z-50">
        <button
          onClick={onClose} 
          className="absolute top-5 right-5 text-red hover:text-gray-600 focus:outline-none "
        >
          <X className="w-6 h-6" />
          <span className="sr-only">Cerrar</span>
        </button>
  
        <div className="p-4">
          <h1 className="text-2xl font-primary font-bold">Perfil</h1>
        </div>
        <div className="grid flex-row gap-10 m-4 md:ml-4 relative">
          {isAuthenticated && (
            <>
              <Link to="/PerfilCliente"className="bg-blue text-white p-1 rounded-2xl text-center font-secondary text-lg">
                Editar perfil
              </Link>
              <Link to="/ver-ordenes" className="bg-blue text-white p-1 rounded-2xl font-secondary text-center text-lg">
                Ver ordenes
              </Link>
              <button onClick={handleLogout} className="bg-red text-white p-1 rounded-2xl font-secondary text-lg">
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default MenuPerfil;
  