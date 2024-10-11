import React, { useState } from 'react';
import { X } from 'lucide-react'; 
import { useUpdateContenido } from '../../hooks/UseUpdateContenido.js';
import { useFetchContenidos } from '../../hooks/FetchContenidos.js';

const FormEditarContenido = ({ onClose }) => {
  const { update } = useUpdateContenido();
  const { Contenidos } = useFetchContenidos();

  const [contenido, setContenido] = useState({
    id: '',
    titulo: '',
    descripcion: '',
    video_incrustado: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setContenido({
      ...contenido,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(
      contenido.id,
      contenido.titulo,
      contenido.descripcion,
      contenido.video_incrustado,
    );

    setContenido({
      id: '',
      titulo: '',
      descripcion: '',
      video_incrustado: '',
    });
    
    onClose(); 
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedContenido = Contenidos.find(item => item.id === selectedId);
    setContenido(selectedContenido || {
      id: selectedId,
      titulo: '',
      descripcion: '',
      video_incrustado: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="relative w-full max-w-4xl mx-4">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </button>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg space-y-6">
          <h2 className="text-3xl font-semibold mb-6 text-center">Editar Contenido</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contenido">Seleccione el contenido a editar</label>
              <select name="id" id="contenidos" onChange={handleSelectChange} value={contenido.id}>
                <option value="">Seleccione un contenido</option>
                {Contenidos.map((item) => (
                  <option key={item.id} value={item.id}>{item.titulo}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Título del Contenido</label>
              <input
                type="text"
                name="titulo"
                value={contenido.titulo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700">Descripción</label>
              <textarea
                name="descripcion"
                value={contenido.descripcion}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Video Incrustado</label>
              <input
                type="text"
                name="video_incrustado"
                value={contenido.video_incrustado}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition w-full">
            Editar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEditarContenido; 
