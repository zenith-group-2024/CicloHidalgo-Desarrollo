import React, { useState } from 'react';
import Navbar from './Navbar';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el modal

  // Función para cerrar el modal al hacer clic fuera del contenido
  const handleCloseModal = (e) => {
    if (e.target.id === 'modal-overlay') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <Navbar />
      
      {/* Botón para abrir el modal */}
      <div className="text-center mt-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Abrir Autenticación
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          id="modal-overlay"
          onClick={handleCloseModal}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevenir el cierre cuando se hace clic dentro del modal
            className="bg-white h-auto w-11/12 sm:w-2/6 p-8 rounded-lg shadow-lg"
          >
            {/* Form Header */}
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: isLogin ? '#1D1D1D'  : '#1D1D1D' }}>
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </h2>

            {/* Form */}
            <form className="bg-white ">
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-black mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2  rounded-lg text-black  border"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-black mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border  rounded-lg text-black  "
                  placeholder="Ingresa tu correo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Contraseña</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg text-black   "
                  placeholder="Ingresa tu contraseña"
                />
              </div>
              <button
                type="submit"
                className={`w-2/4 py-2 rounded-lg text-white  mx-28 bg-red mt-5 ${
                  isLogin ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </form>

            {/* Toggle Button */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-700 hover:underline"
              >
                {isLogin ? '¿No tienes cuenta? Registrarse' : '¿Ya tienes cuenta? Inicia sesión'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
