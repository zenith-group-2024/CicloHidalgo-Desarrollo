import React, { useState } from 'react';
import { useLogin } from '../../hooks/UseLogin';
import { X } from 'lucide-react';
import Registro from '../UI/Registro'; // Asegúrate de que la ruta es correcta

const LoginForm = ({ onLogin }) => { // Asegúrate de recibir la prop onLogin
  const { login } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [showRegistro, setShowRegistro] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      setPassword('');
      setIsOpen(false); // Cerrar el modal después del login exitoso
      onLogin(); // Llama a onLogin para cambiar el estado de autenticación
    } catch (e) {
      console.log(e.message);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRegisterClick = () => {
    setShowRegistro(true);
  };

  return (
    <>
      {isOpen && !showRegistro && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
            {/* Botón de cerrar con icono de Lucide */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Cerrar</span>
            </button>

            <h2 className="text-2xl font-bold text-center mb-8 text-black">Login</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-red text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              No tienes una cuenta?{' '}
              <button onClick={handleRegisterClick} className="text-red underline">
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      )}
      {showRegistro && <Registro />} {/* Mostrar el componente Registro */}
    </>
  );
};

export default LoginForm;
