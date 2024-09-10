import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CheckBoxMarca = ({ selectedCategory }) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});

  // Alternar la visibilidad de las marcas
  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  // Función para combinar marcas de las categorías seleccionadas
  const getFilteredBrands = () => {
    const brandsByCategory = {
      Bici: [
        { name: "Cannondale", label: "Cannondale" },
        { name: "SCOTT", label: "SCOTT" },
      ],
      Ropa: [
        { name: "Nike", label: "Nike" },
        { name: "Adidas", label: "Adidas" },
        { name: "Tommy", label: "TOMMY" },
      ],
      Repuesto: [
        { name: "TOTEM", label: "TOTEM" },
      ],
    };

    // Combinar todas las marcas de las categorías seleccionadas
    let combinedBrands = [];
    selectedCategory.forEach((category) => {
      if (brandsByCategory[category]) {
        combinedBrands = [...combinedBrands, ...brandsByCategory[category]];
      }
    });

    // Eliminar duplicados
    const uniqueBrands = Array.from(new Set(combinedBrands.map((brand) => brand.name)))
      .map((name) => combinedBrands.find((brand) => brand.name === name));

    return uniqueBrands;
  };

  // Mantener el estado de los checkboxes según las marcas filtradas
  useEffect(() => {
    const filteredBrands = getFilteredBrands();
    const newCheckboxState = filteredBrands.reduce(
      (acc, brand) => ({
        ...acc,
        [brand.name]: checkboxes[brand.name] || false, // Mantener el estado actual o inicializar en falso
      }),
      {}
    );
    setCheckboxes(newCheckboxState);
  }, [selectedCategory]);

  // Manejar el cambio de los checkboxes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="space-y-4">
     
      <div
        className="text-black w-full mb-4 font-secondary font-bold grid grid-cols-2 gap-52 bg-transparent border-b-2 border-gray p-2"
        onClick={toggleCheckboxes}
      >
        Marca
        <ChevronDown
          className={`transition-transform duration-300 ${showCheckboxes ? "rotate-180" : ""}`}
        />
      </div>

     
      {showCheckboxes && (
        <div className="space-y-2">
          {getFilteredBrands().map((brand) => (
            <div key={brand.name}>
              <input
                type="checkbox"
                name={brand.name}
                checked={checkboxes[brand.name] || false}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={brand.name} className="text-gray-700 ml-2">
                {brand.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckBoxMarca;
