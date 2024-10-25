import React from 'react';
import { useEliminarAdmin } from '../../hooks/useEliminarAdmin.js';

const FormEliminarAdmin = ({ adminData, onClose }) => {
  const { eliminar, message } = useEliminarAdmin();

  const handleDelete = () => {
    eliminar(adminData.id);
  };

  return (
    <div className="min-h-screen flex justify-center py-10">
      <div className="bg-white p-8 shadow-md rounded-lg text-center">
        <h2 className="text-3xl font-semibold mb-6">Eliminar Administrador</h2>
        <p>¿Estás seguro que deseas eliminar a <strong>{adminData.nombre}</strong>?</p>
        <div className="mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
          {message && <p>{message}</p>}
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 mt-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormEliminarAdmin;