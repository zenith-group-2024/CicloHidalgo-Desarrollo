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




const HomePage = () => {
    return (
        <div>
        <Navbar />
            <Hero />
            <ProductosDestacados />
            <Info />
            <RedesSociales />
            <Footer />
           {/* <Navbar />
            <Servicios />
            <Footer />*/}



        </div>
    );
};

export default HomePage;
