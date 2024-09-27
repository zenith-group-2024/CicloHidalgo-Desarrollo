import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Registro = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ name, contact, address, email, birthday, password, newsletter });
    setName('');
    setContact('');
    setAddress('');
    setEmail('');
    setBirthday('');
    setPassword('');
    setNewsletter(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
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
                <label htmlFor="name" className="block text-sm font-medium text-gray">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray rounded-md shadow-sm focus:ring-blue focus:border-blue"
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray">
                  Contacto
                </label>
                <input
                  type="text"
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="mt-2 block w-full p-3 border border-gray rounded-md shadow-sm focus:ring-blue focus:border-blue"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                <label htmlFor="birthday" className="block text-sm font-medium text-gray">
                  Cumpleaños
                </label>
                <input
                  type="date"
                  id="birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
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
                  id="newsletter"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="h-4 w-4 text-blue focus:ring-blue border-gray rounded"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray">
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
