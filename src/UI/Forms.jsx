import React, { useState } from 'react';

const AuthForm = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleCloseModal = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    isOpen && (
      <div
        id="modal-overlay"
        onClick={handleCloseModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()} 
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-6 lg:mx-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>

          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-black mb-2">Nombre Completo</label>
                <input type="text" className="w-full px-3 py-2 rounded-lg text-black border" placeholder="Ingresa tu nombre" />
              </div>
            )}
            <div>
              <label className="block text-black mb-2">Correo Electrónico</label>
              <input type="email" className="w-full px-3 py-2 border rounded-lg text-black" placeholder="Ingresa tu correo" />
            </div>
            <div>
              <label className="block text-black mb-2">Contraseña</label>
              <input type="password" className="w-full px-3 py-2 border rounded-lg text-black" placeholder="Ingresa tu contraseña" />
            </div>
            <button type="submit" className={`w-full py-2 rounded-lg text-white mt-5 ${isLogin ? 'bg-red hover:bg-red' : 'bg-red hover:bg-red'}`}>
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-gray hover:underline">
              {isLogin ? '¿No tienes cuenta? Registrarse' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AuthForm;
