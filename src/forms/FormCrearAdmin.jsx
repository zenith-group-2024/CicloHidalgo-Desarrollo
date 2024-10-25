import React, { useState } from 'react';
import { useCrearAdmin } from '../../hooks/useCrearAdmin.js';

const FormCrearAdmin = ({ onClose }) => {
  const { crear, message } = useCrearAdmin();
  const [admin, setAdmin] = useState({
    nombre: '',
    email: '',
    password: '',
    contacto: '',
    direccion: '',
    cumpleanos: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    crear(admin.nombre, admin.email, admin.password, admin.contacto, admin.direccion, admin.cumpleanos);
    onClose();
  };

  return (
    <div className="min-h-screen flex justify-center py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Añadir Administrador</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={admin.nombre}
          onChange={handleChange}
          className="w-full mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={admin.email}
          onChange={handleChange}
          className="w-full mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={admin.password}
          onChange={handleChange}
          className="w-full mb-4"
        />
        <input
          type="text"
          name="contacto"
          placeholder="Contacto"
          value={admin.contacto}
          onChange={handleChange}
          className="w-full mb-4"
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={admin.direccion}
          onChange={handleChange}
          className="w-full mb-4"
        />
        <input
          type="date"
          name="cumpleanos"
          placeholder="Cumpleaños"
          value={admin.cumpleanos}
          onChange={handleChange}
          className="w-full mb-4"
        />
        <button type="submit" className="bg-blue text-white px-4 py-2 rounded">Crear</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default FormCrearAdmin;