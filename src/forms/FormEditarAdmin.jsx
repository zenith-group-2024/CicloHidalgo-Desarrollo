import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEditarAdmin } from '../../hooks/useEditarAdmin.js';

const FormEditarAdmin = ({ onClose }) => {
  const { id } = useParams();
  const { editar, message } = useEditarAdmin();
  const [admin, setAdmin] = useState({
    id: '',
    nombre: '',
    email: '',
    contacto: '',
    direccion: '',
    cumpleanos: '',
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/admin/${id}`)
      .then((response) => response.json())
      .then((data) => setAdmin(data))
      .catch((error) => console.error('Error al cargar los datos del administrador', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editar(admin.id, admin.nombre, admin.email, admin.contacto, admin.direccion, admin.cumpleanos);
  };

  return (
    <div className="min-h-screen flex justify-center py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Editar Administrador</h2>
        <input type="text" name="nombre" placeholder="Nombre" value={admin.nombre} onChange={handleChange} className="w-full mb-4" />
        <input type="email" name="email" placeholder="Correo" value={admin.email} onChange={handleChange} className="w-full mb-4" />
        <input type="text" name="contacto" placeholder="Contacto" value={admin.contacto} onChange={handleChange} className="w-full mb-4" />
        <input type="text" name="direccion" placeholder="Dirección" value={admin.direccion} onChange={handleChange} className="w-full mb-4" />
        <input type="date" name="cumpleanos" value={admin.cumpleanos} onChange={handleChange} className="w-full mb-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar Cambios</button>
        {message && <p>{message}</p>}
        <button type="button" className="bg-gray-500 text-white px-4 py-2 mt-4 rounded" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default FormEditarAdmin;