import React, { useState, useEffect, useContext } from 'react';
import { useLogin } from '../../hooks/UseLogin';
import { X } from 'lucide-react';
import Registro from '../UI/Registro';
import { GlobalContext } from '../GlobalState.jsx'; 
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { login } = useLogin();
  const { isAuthenticated, setIsAuthenticated, logout } = useContext(GlobalContext); // Usa el contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [showRegistro, setShowRegistro] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      setEmail(''); 
      setPassword('');
      setIsOpen(false); 
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

  const handleLogout = () => {
    logout(); // Llama a la función logout del contexto
  };

  return (
    <>
      {isOpen && !showRegistro && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Cerrar</span>
            </button>

            <h2 className="text-2xl font-bold text-center mb-8 text-black">Login</h2>

            {/* Mostrar el formulario de login si no está autenticado */}
            {!isAuthenticated ? (
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
            ) : (
              <div className="text-center">
                <h3 className="mb-4">Estás autenticado</h3>
                <Link to="/PerfilCliente" className="text-black font-primary font-bold text-lg hover:text-gray transform transition-transform duration-300 hover:scale-110">Editar Perfil</Link> 
                <button
                  onClick={handleLogout}
                  className="w-full py-3 px-4 bg-red text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cerrar sesión
                
                </button>
              </div>
            )}

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
