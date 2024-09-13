import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
const SelectWithCheckboxes = ({checkboxOptions, selectLabel }) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false); 
  const [checkboxes, setCheckboxes] = useState(
    checkboxOptions.reduce((acc, option) => ({ ...acc, [option.name]: false }), {})
  );

  const handleCheckboxChange = (event) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes); 
  };

  return (
    <div className="space-y-4">
     
      <div 
        className=" text-black w-full mb-4 font-secondary font-bold grid grid-cols-2 gap-48 bg-transparent border-b-2  border-gray p-2"
        onClick={toggleCheckboxes}
        
      >
           {selectLabel} 
         <ChevronDown className={`transition-transform duration-300 ${showCheckboxes ? 'rotate-180' : ''}`} />
     
      </div>

    
      {showCheckboxes && (
        <div className="space-y-2">
          {checkboxOptions.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={option.name}
                checked={checkboxes[option.name]}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={option.name} className="text-gray-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectWithCheckboxes;
