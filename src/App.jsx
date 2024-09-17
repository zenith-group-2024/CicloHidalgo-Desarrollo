import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import Contenido from './pages/Contenido';
import Productos from './pages/Productos';
import AdminDashboard from './UI/DashboardAdmin'; 
import AdminCRUD from './UI/AdminCRUD'; 



function App() {
 

  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Contenido" element={<Contenido />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Contenido" element={<Contenido />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/crud/:resource" element={<AdminCRUD />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    
      
    </BrowserRouter>
  );
}

export default App;
