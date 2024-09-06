import React from 'react';
import Navbar from '../UI/Navbar'; 
import Hero from '../UI/Hero'; 
import ProductosDestacados from '../UI/ProductosDestacados'; 
import SobreNosotros from '../UI/SobreNosotros';
const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <ProductosDestacados />
            <SobreNosotros />

        </div>
    );
};

export default HomePage;
