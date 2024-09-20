import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import Contenido from './pages/Contenido';
import Productos from './pages/Productos';
import AdminDashboard from './UI/DashboardAdmin'; 
import AdminCRUD from './UI/AdminCRUD'; 
import { Carrito } from './pages/Carrito';
import { CartProvider } from './UI/Prueba_Carrito';

function App() {
 

  return (
    <BrowserRouter>
          <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Contenido" element={<Contenido />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Carrito" element={<Carrito />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Contenido" element={<Contenido />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/crud/:resource" element={<AdminCRUD />} />
        <Route path="*" element={<Navigate to="/" />} />
      
      </Routes>
      </CartProvider>
    
      
    </BrowserRouter>
  );
}

export default App;
