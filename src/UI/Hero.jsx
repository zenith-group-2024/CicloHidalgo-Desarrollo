import React, { useState, useEffect } from 'react';
import xrace from '../assets/images/xrace.svg';
import totem from '../assets/images/totem.svg';
import scott from '../assets/images/scott.svg';
import cannodale from '../assets/images/cannodale.svg';
import biciSupersix from '../assets/images/biciSupersix.svg';

const brands = [
  {
    logo: cannodale,
    hero: biciSupersix,
    title: "Supersix EVO",
    subtitle: "Carbon Disc 105",
    description: "Diseñadas para conquistar cualquier terreno.",
  },
  {
    logo: scott,
    hero: biciSupersix,
    title: "Addict RC",
    subtitle: "TC 15",
    description: "Ligera y aerodinámica para rendimiento superior.",
  },
  {
    logo: totem,
    hero: biciSupersix,
    title: "Speedster 10",
    subtitle: "Gravel 30 EQ",
    description: "Alta velocidad y eficiencia en cada recorrido.",
  },
  {
    logo: xrace,
    hero: biciSupersix, 
    title: "X-Race Pro",
    subtitle: "TC 15",
    description: "Diseñada para los ciclistas más exigentes.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
    }, 4000); 
    return () => clearInterval(interval); 
  }, []);

  const handleLogoClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <section className="bg-white p-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-8">
        
          <div className="w-2/3">
            <h1 className="mb-2">
              <span className="font-bold block font-primary animate-textColor text-6xl">
                {brands[currentIndex].title}
              </span>
              <span className="text-6xl block font-primary">
                {brands[currentIndex].subtitle}
              </span>
            </h1>
            <p className="text-lg mb-6 font-secondary">
              {brands[currentIndex].description}
            </p>
            <div>
              <button className="bg-blue text-white py-2 px-4 rounded mr-4 font-primary hover:bg-red hover:font-bold">Comprar</button>
              <button className="bg-blue text-white py-2 px-4 rounded font-primary hover:bg-red hover:font-bold">Ver más</button>
            </div>
          </div>

          <div className="w-1/3">
            <img 
              src={brands[currentIndex].hero} 
              alt="imagen-bicicleta" 
              key={currentIndex} 
              className="h-280 object-cover transform transition-transform duration-300 hover:scale-110" 
            />
          </div>
        </div>
      </section>

      
      <section className="bg-gray p-8">
        
        <div className="relative overflow-hidden">
          <div className="flex flex-wrap justify-center gap-20">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-48 cursor-pointer" 
                onClick={() => handleLogoClick(index)} 
              >
                <img
                  src={brand.logo}
                  alt={`Logo ${index}`}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

