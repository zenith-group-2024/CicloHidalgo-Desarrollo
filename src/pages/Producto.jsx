import React from 'react';

const ProductoIndividual = ({ product, addToCart }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg">
        <img 
          src={product.img} 
          alt={product.title} 
          className="w-full md:w-1/2 h-64 object-cover rounded-l-lg"
        />
        <div className="p-4 md:p-8 flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-black">{product.title}</h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-4">Precio: ₡{product.precio}</p>
          <p className="text-sm text-gray-500">Código ID: {product.id}</p>
          <button
            onClick={() => addToCart(product)} 
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-200"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoIndividual;
