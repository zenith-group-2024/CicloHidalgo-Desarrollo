import React, { useState } from 'react';
import FormProducto from '../forms/AñadirProducto';
import FormEditarProducto from '../forms/EditarProducto';
import FormEliminarProducto from '../forms/EliminarProducto';
import CrudCard from '../UI/CRUDCard';
import Navbar from '../UI/Navbar';

const AdminDashboard = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeliting, setIsDeliting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formType, setFormType] = useState('');

  const handleAddProduct = () => {
    setIsAdding(true);
    setIsEditing(false);
    setIsDeliting(false);
    setSelectedProduct(null);
    setFormType('producto');
  };

  const handleEditProduct = (productData) => {
    setSelectedProduct(productData);
    setIsEditing(true);
    setIsDeliting(false);
    setIsAdding(false);
    setFormType('productoEdit');
  };

  const handleDeleteProduct = () => {
    setIsDeliting(true);
    setIsEditing(false);
    setIsAdding(false);
    setFormType('productoDelete');
  };

  const handleCloseForms = () => {
    setIsAdding(false);
    setIsEditing(false);
    setIsDeliting(false);
  };

  const handleAddUser = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedProduct(null);
    setFormType('usuario');
  };

  const handleEditUser = (userData) => {
    setSelectedProduct(userData);
    setIsEditing(true);
    setIsAdding(false);
    setFormType('usuario');
  };

  const handleDeleteUser = () => {
    console.log("Usuario eliminado");
  };

  // Simulando un producto para la edición
  const sampleProduct = {
    nombre: 'Producto Ejemplo',
    marca: 'Marca Ejemplo',
    especificacion: 'Especificación Ejemplo',
    subcategoria: 'Subcategoría Ejemplo',
    categoria: 'Categoría Ejemplo',
    modelo: 'Modelo Ejemplo',
    precio: 100,
    cantidad: 10,
    destacado: true,
  };

  
  const sampleUser = {
    nombre: 'Usuario Ejemplo',
    email: 'usuario@example.com',
    rol: 'Admin',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
       <Navbar />
      

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        <CrudCard
          title="Productos"
          onAdd={handleAddProduct}
          onEdit={() => handleEditProduct(sampleProduct)}
          onDelete={handleDeleteProduct}
        />
        <CrudCard
          title="Usuarios"
          onAdd={handleAddUser}
          onEdit={() => handleEditUser(sampleUser)}
          onDelete={handleDeleteUser}
        />
        <CrudCard
          title="Contenido"
          onAdd={() => console.log('Añadir Contenido')}
          onEdit={() => console.log('Editar Contenido')}
          onDelete={() => console.log('Eliminar Contenido')}
        />
        <CrudCard
          title="Servicios"
          onAdd={() => console.log('Añadir Servicio')}
          onEdit={() => console.log('Editar Servicio')}
          onDelete={() => console.log('Eliminar Servicio')}
        />
        <CrudCard
          title="Ofertas"
          onAdd={() => console.log('Añadir Oferta')}
          onEdit={() => console.log('Editar Oferta')}
          onDelete={() => console.log('Eliminar Oferta')}
        />
      </div>

      {isAdding && (formType === 'producto' ? <FormProducto onClose={handleCloseForms} /> : <FormEditarProducto productoData={selectedProduct} onClose={handleCloseForms} />)}
      {isEditing && (formType === 'productoEdit' ? <FormEditarProducto productoData={selectedProduct} onClose={handleCloseForms} /> : null)}
      {isDeliting && (formType === 'productoDelete' ? <FormEliminarProducto onClose={handleCloseForms} /> : null)}
    </div>
  );
};

export default AdminDashboard;