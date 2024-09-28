import React, { useState } from 'react';
import { X } from 'lucide-react'; 

const FormProducto = ({ onClose }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    marca: '',
    especificacion: '',
    subcategoria: '',
    categoria: '',
    modelo: '',
    precio: '',
    imagen: null,
    cantidad: '',
    destacado: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProducto({
      ...producto,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del producto:', producto);
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="relative w-full max-w-4xl mx-4">
        
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </button>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg space-y-6">
          <h2 className="text-3xl font-semibold mb-6 text-center">Añadir Producto</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="mb-4">
              <label className="block text-gray-700">Nombre del Producto</label>
              <input
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Marca</label>
              <input
                type="text"
                name="marca"
                value={producto.marca}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700">Especificación</label>
              <textarea
                name="especificacion"
                value={producto.especificacion}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              ></textarea>
            </div>

           
            <div className="mb-4">
              <label className="block text-gray-700">Subcategoría</label>
              <input
                type="text"
                name="subcategoria"
                value={producto.subcategoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700">Categoría</label>
              <input
                type="text"
                name="categoria"
                value={producto.categoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700">Modelo</label>
              <input
                type="text"
                name="modelo"
                value={producto.modelo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700">Precio</label>
              <input
                type="number"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700">Imagen</label>
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

           
            <div className="mb-4">
              <label className="block text-gray-700">Cantidad</label>
              <input
                type="number"
                name="cantidad"
                value={producto.cantidad}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4 flex items-center md:col-span-2">
              <input
                type="checkbox"
                name="destacado"
                checked={producto.destacado}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">¿Es destacado?</label>
            </div>
          </div>

          <button type="submit" className="bg-blue text-white px-4 py-2 rounded-full hover:bg-red transition w-full">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormProducto;
