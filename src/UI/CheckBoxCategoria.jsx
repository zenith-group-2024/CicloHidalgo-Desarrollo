import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const CheckBoxCategoria = ({ onCategoryChange, onBrandChange, onSubCategoryChange }) => {
    const [showCategories, setShowCategories] = useState(false);
    const [showSubCategories, setShowSubCategories] = useState(false);
    const [showBrands, setShowBrands] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedSubCategories, setSelectedSubCategories] = useState({});
    const [selectedBrands, setSelectedBrands] = useState({});

    const categories = {
        Bici: { label: "Bici", subcategories: ["Bici de Montaña", "Bici de Niño"], brands: ["Cannondale", "SCOTT"] },
        Ropa: { label: "Ropa", subcategories: ["Guantes", "Camisas", "Pantalonetas"], brands: ["Nike", "Adidas", "Tommy"] },
        Repuesto: { label: "Repuesto", subcategories: ["TOTEM"], brands: ["TOTEM"] }
    };

    const toggleCheckboxes = (type) => {
        if (type === "category") setShowCategories(!showCategories);
        if (type === "subCategory") setShowSubCategories(!showSubCategories);
        if (type === "brand") setShowBrands(!showBrands);
    };

    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCategories(prev => ({
            ...prev,
            [name]: checked
        }));

        const updatedCategories = Object.keys(selectedCategories).filter(key => selectedCategories[key]);
        onCategoryChange(updatedCategories);
    };

    const handleSubCategoryChange = (event) => {
        const { name, checked } = event.target;
        setSelectedSubCategories(prev => ({
            ...prev,
            [name]: checked
        }));

        const updatedSubCategories = Object.keys(selectedSubCategories).filter(key => selectedSubCategories[key]);
        onSubCategoryChange(updatedSubCategories);
    };

    const handleBrandChange = (event) => {
        const { name, checked } = event.target;
        setSelectedBrands(prev => ({
            ...prev,
            [name]: checked
        }));

        const updatedBrands = Object.keys(selectedBrands).filter(key => selectedBrands[key]);
        onBrandChange(updatedBrands);
    };

    const getSubCategoriesForSelected = () => {
        let combinedSubCategories = [];
        Object.keys(selectedCategories).forEach(category => {
            if (selectedCategories[category] && categories[category]) {
                combinedSubCategories = [...combinedSubCategories, ...categories[category].subcategories];
            }
        });
        return Array.from(new Set(combinedSubCategories));
    };

    const getBrandsForSelected = () => {
        let combinedBrands = [];
        Object.keys(selectedCategories).forEach(category => {
            if (selectedCategories[category] && categories[category]) {
                combinedBrands = [...combinedBrands, ...categories[category].brands];
            }
        });
        return Array.from(new Set(combinedBrands));
    };

    return (
        <div className="space-y-4">
            {/* Categorías */}
            <div className="text-black w-full mb-4 font-secondary font-bold flex items-center gap-48 bg-transparent border-b-2 border-gray p-2" onClick={() => toggleCheckboxes("category")}>
                Categoría
                <ChevronDown className={`transition-transform duration-300 ${showCategories ? "rotate-180" : ""}`} />
            </div>
            {showCategories && (
                <div className="space-y-2">
                    {Object.keys(categories).map((category) => (
                        <div key={category}>
                            <input
                                type="checkbox"
                                name={category}
                                checked={selectedCategories[category] || false}
                                onChange={handleCategoryChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={category} className="text-gray-700 ml-2">
                                {categories[category].label}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Subcategorías */}
            <div className="text-black w-full mb-4 font-secondary font-bold flex items-center gap-48 bg-transparent border-b-2 border-gray p-2" onClick={() => toggleCheckboxes("subCategory")}>
                Subcategoría
                <ChevronDown className={`transition-transform duration-300 ${showSubCategories ? "rotate-180" : ""}`} />
            </div>
            {showSubCategories && (
                <div className="space-y-2">
                    {getSubCategoriesForSelected().map((subCategory) => (
                        <div key={subCategory}>
                            <input
                                type="checkbox"
                                name={subCategory}
                                checked={selectedSubCategories[subCategory] || false}
                                onChange={handleSubCategoryChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={subCategory} className="text-gray-700 ml-2">
                                {subCategory}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Marcas */}
            <div className="text-black w-full mb-4 font-secondary font-bold flex items-center gap-48 bg-transparent border-b-2 border-gray p-2" onClick={() => toggleCheckboxes("brand")}>
                Marca
                <ChevronDown className={`transition-transform duration-300 ${showBrands ? "rotate-180" : ""}`} />
            </div>
            {showBrands && (
                <div className="space-y-2">
                    {getBrandsForSelected().map((brand) => (
                        <div key={brand}>
                            <input
                                type="checkbox"
                                name={brand}
                                checked={selectedBrands[brand] || false}
                                onChange={handleBrandChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={brand} className="text-gray-700 ml-2">
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CheckBoxCategoria;
