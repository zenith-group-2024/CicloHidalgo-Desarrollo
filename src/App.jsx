import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import Contenido from './pages/Contenido';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios'; 
import AdminDashboard from './UI/DashboardAdmin'; 
import AdminCRUD from './UI/AdminCRUD'; 
import { Carrito } from './pages/Carrito';
import { CartProvider } from './UI/Prueba_Carrito';
import DetalleProducto from './UI/DetalleProducto';
import PerfilCliente from './pages/PerfilCliente.jsx';
import { GlobalProvider } from '../src/global/GlobalState.jsx'; 

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider> 
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Contenido" element={<Contenido />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Servicios" element={<Servicios />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/crud/:resource" element={<AdminCRUD />} /> 
            <Route path="/PerfilCliente" element={<PerfilCliente />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CartProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
