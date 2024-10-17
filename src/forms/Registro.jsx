import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useRegistro } from '../../hooks/UseRegistro';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [dirrecion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [cumpleanos, setCumpleanos] = useState('');
  const [password, setPassword] = useState('');
  const [boletin, setBoletin] = useState(false);
  const [isOpen, setIsOpen] = useState(true); 
  const navigate = useNavigate();
  const { register } = useRegistro(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await register(email, password, nombre, dirrecion, cumpleanos, contacto, boletin);

    setNombre('');
    setContacto('');
    setDireccion('');
    setEmail('');
    setCumpleanos('');
    setPassword('');
    setBoletin(false);

    
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray focus:outline-none"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Cerrar</span>
            </button>

            <h2 className="text-2xl font-bold text-center mb-8 text-black">Registro</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray rounded-md shadow-sm focus:ring-blue focus:border-blue"
                />
              </div>

              <div>
                <label htmlFor="contacto" className="block text-sm font-medium text-gray">
                  Contacto
                </label>
                <input
                  type="text"
                  id="contacto"
                  value={contacto}
                  onChange={(e) => setContacto(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray rounded-md shadow-sm focus:ring-blue focus:border-blue"
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  value={dirrecion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray rounded-md shadow-sm focus:ring-blue focus:border-blue"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray rounded-md shadow-sm focus:ring-blue focus:border-blue"
                />
              </div>

              <div>
                <label htmlFor="cumpleanos" className="block text-sm font-medium text-gray">
                  Cumpleaños
                </label>
                <input
                  type="date"
                  id="cumpleanos"
                  value={cumpleanos}
                  onChange={(e) => setCumpleanos(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray rounded-md shadow-sm focus:ring-blue focus:border-blue"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray rounded-md shadow-sm focus:ring-blue focus:border-blue"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="boletin"
                  checked={boletin}
                  onChange={(e) => setBoletin(e.target.checked)}
                  className="h-4 w-4 text-blue focus:ring-blue border-gray rounded"
                />
                <label htmlFor="boletin" className="ml-2 block text-sm text-gray">
                  Deseo recibir ofertas especiales
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-red text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Registro;
