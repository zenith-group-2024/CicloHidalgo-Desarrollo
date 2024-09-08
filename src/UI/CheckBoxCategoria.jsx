import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Para la flecha de selección

const CheckBoxCategoria = ({ onCategoryChange }) => {
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [checkboxes, setCheckboxes] = useState({
        Bici: false,
        Ropa: false,
        Repuesto: false
    });

    const toggleCheckboxes = () => {
        setShowCheckboxes(!showCheckboxes);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes((prev) => ({
            ...prev,
            [name]: checked
        }));
    };

    useEffect(() => {
        const selectedCategories = Object.keys(checkboxes).filter(
            (key) => checkboxes[key]
        );
        onCategoryChange(selectedCategories);
    }, [checkboxes, onCategoryChange]);

    return (
        <div className="space-y-4">
            {/* Texto de selección con toggle */}
            <div
                className="text-black w-full mb-4 font-secondary font-bold grid grid-cols-2 gap-52 bg-transparent border-b-2 border-gray p-2"
                onClick={toggleCheckboxes}
            >
                Categoría
                <ChevronDown
                    className={`transition-transform duration-300 ${showCheckboxes ? "rotate-180" : ""}`}
                />
            </div>

            {showCheckboxes && (
                <div className="space-y-2">
                    <div>
                        <input
                            type="checkbox"
                            name="Bici"
                            checked={checkboxes.Bici}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="Bici" className="text-gray-700 ml-2">
                            Bici
                        </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="Ropa"
                            checked={checkboxes.Ropa}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="Ropa" className="text-gray-700 ml-2">
                            Ropa
                        </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="Repuesto"
                            checked={checkboxes.Repuesto}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="Repuesto" className="text-gray-700 ml-2">
                            Repuesto
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckBoxCategoria;
