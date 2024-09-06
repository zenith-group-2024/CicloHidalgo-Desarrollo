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
      <section className="bg-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between p-4 md:p-8">
          <div className="w-full md:w-2/3 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold font-primary mb-2">
              <span className="block">{brands[currentIndex].title}</span>
              <span className="block text-xl md:text-3xl">{brands[currentIndex].subtitle}</span>
            </h1>
            <p className="text-base md:text-lg mb-6 font-secondary">
              {brands[currentIndex].description}
            </p>
            <div>
              <button className="bg-blue text-white py-2 px-4 rounded mr-2 md:mr-4 font-primary hover:bg-red hover:font-bold">Comprar</button>
              <button className="bg-blue text-white py-2 px-4 rounded font-primary hover:bg-red hover:font-bold">Ver más</button>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <img 
              src={brands[currentIndex].hero} 
              alt="imagen-bicicleta" 
              key={currentIndex} 
              className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-100" 
            />
          </div>
        </div>
      </section>

      <section className="bg-gray p-4 md:p-8">
        <div className="relative overflow-hidden">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 cursor-pointer border-2 border-transparent transition-all duration-300 ease-in-out transform hover:scale-110 hover:border-blue-500" 
                onClick={() => handleLogoClick(index)}
              >
                <img
                  src={brand.logo}
                  alt={`Logo ${index}`}
                  className="w-full h-full object-contain transition-transform duration-300 hover:opacity-80"
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
