import React, { useState, useContext } from 'react';
import { useLogin } from '../../hooks/UseLogin.js';
import { X } from 'lucide-react';
import Registro from './Registro.jsx';
import { GlobalContext } from '../global/GlobalState.jsx'; 
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ isOpen, onClose }) => {
  const { login, isLoading, userId } = useLogin(); 
  const { state = {}, setToken, logout } = useContext(GlobalContext);
  const { isAuthenticated = false } = state; 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegistro, setShowRegistro] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(''); 
    try {
      const result = await login(email, password); 
      const { token, userId } = result; 
      console.log("Token:", token);
      console.log("ID:", userId);
  
      localStorage.setItem('authToken', token); 
      localStorage.setItem('userId', userId); 
      setToken(token, userId); 
      setEmail('');
      setPassword('');
      onClose();
      console.log("ID:", userId); 
    } catch (e) {
      setErrorMessage(e.message); 
      console.log(e.message); 
     
    }
  };

  const handleRegisterClick = () => {
    setShowRegistro(true);
  };

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId'); 
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Cerrar</span>
            </button>

            <h2 className="text-2xl font-bold text-center mb-8 text-black">Login</h2>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

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
                  {isLoading ? 'Cargando...' : 'Login'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <h3 className="mb-4">Estás autenticado</h3>
                <Link to="/PerfilCliente" className="text-black font-primary font-bold text-lg hover:text-gray transform transition-transform duration-300 hover:scale-110">Editar Perfil </Link> 
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
      {showRegistro && <Registro />}
    </>
  );
};

export default LoginForm;
