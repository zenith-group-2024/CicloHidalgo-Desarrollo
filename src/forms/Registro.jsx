import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRegistro } from '../../hooks/hooksUsuario/UseRegistro';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Registro = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState(''); 
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [cumpleanos, setCumpleanos] = useState('');
  const [password, setPassword] = useState('');
  const [boletin, setBoletin] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const { register, error, isLoading } = useRegistro(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const isRegistered = await register(email, password, nombre, direccion, cumpleanos, contacto, boletin);

    if (isRegistered) {
      setNombre('');
      setContacto('');
      setDireccion('');
      setEmail('');
      setCumpleanos('');
      setPassword('');
      setBoletin(false);
      setErrorMessage(''); // Limpiar el mensaje de error si el registro es exitoso
    } else {
      setErrorMessage(error); // Actualizar el mensaje de error si el registro falla
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    if (onClose) onClose(); 
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md h-fit mx-4 my-8">
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Cerrar</span>
            </button>

            {/* Mensaje de error en la parte superior del modal */}
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 text-center rounded-md">
                {errorMessage}
              </div>
            )}

            <h2 className="text-2xl font-bold text-center mb-2 text-black">Registro</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="contacto" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <PhoneInput
                  country={'cr'}
                  value={contacto}
                  onChange={setContacto}
                  inputClass="w-full p-2 border border-gray-300 rounded-md"
                  containerClass="w-full"
                  specialLabel="" 
                  inputStyle={{ width: "100%" }}
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

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
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="cumpleanos" className="block text-sm font-medium text-gray-700">
                  Cumpleaños
                </label>
                <input
                  type="date"
                  id="cumpleanos"
                  value={cumpleanos}
                  onChange={(e) => setCumpleanos(e.target.value)}
                  required
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="boletin"
                  checked={boletin}
                  onChange={(e) => setBoletin(e.target.checked)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="boletin" className="ml-2 block text-sm text-gray-700">
                  Deseo recibir ofertas especiales
                </label>
              </div>

              <button
                type="submit"
              
                className={`w-full py-3 px-4 bg-blue text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Registrando...' : 'Registrarse'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Registro;
