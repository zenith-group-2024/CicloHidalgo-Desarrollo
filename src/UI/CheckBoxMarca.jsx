import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CheckBoxMarca = ({ selectedCategory }) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});

 
  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

 
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

    let combinedBrands = [];
    selectedCategory.forEach((category) => {
      if (brandsByCategory[category]) {
        combinedBrands = [...combinedBrands, ...brandsByCategory[category]];
      }
    });

    const uniqueBrands = Array.from(new Set(combinedBrands.map((brand) => brand.name)))
      .map((name) => combinedBrands.find((brand) => brand.name === name));

    return uniqueBrands;
  };

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
        className="text-black w-full mb-4 font-secondary font-bold grid grid-cols-2 gap-56 bg-transparent border-b-2 border-gray p-2"
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
                checked={checkboxes[brand.name]}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue"
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
