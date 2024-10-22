import React from 'react';
import Navbar from '../UI/Navbar';
import Hero from '../UI/Hero';
import ProductosDestacados from '../UI/ProductosDestacados';
import Info from '../UI/Info';
import RedesSociales from '../UI/RedesSociales';
import Footer from '../UI/Footer';
import Dashboard from '../UI/Dashboard';
import Orden from '../UI/Orden';




const HomePage = () => {
    return (
        <div>
            
            <Navbar />
            <Hero />
            <ProductosDestacados />
            <Info />
            <RedesSociales />
            <Footer />
           

           
            

        </div>
    );
};

export default HomePage;
