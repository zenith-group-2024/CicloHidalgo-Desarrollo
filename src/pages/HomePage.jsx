import React from 'react';
import Navbar from '../UI/Navbar'; 
import Hero from '../UI/Hero'; 
import ProductosDestacados from '../UI/ProductosDestacados'; 
import Info from '../UI/Info';
import RedesSociales from '../UI/RedesSociales';
import Footer from '../UI/Footer';
import DasboardAdmin from '../UI/DashboardAdmin';
import Producto from '../pages/Producto';
import Servicios from './Servicios';
import PerfilCliente from '../pages/PerfilCliente';




const HomePage = () => {
    return (
        <div>
        <Navbar />
            <Hero />
            <ProductosDestacados />
            <Info />
            <RedesSociales />
            <Footer />
            
           {/* <Servicios />
            <Footer />
             <DasboardAdmin />*/}



        </div>
    );
};

export default HomePage;
