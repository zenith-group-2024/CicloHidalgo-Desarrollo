import React, { useState } from 'react';

const SelectWithCheckboxes = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="space-y-4">
      {/* Dropdown select */}
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select an option</option>
        <option value="showCheckboxes">Show checkboxes</option>
      </select>

      {/* Conditionally render checkboxes if option is selected */}
      {selectedOption === 'showCheckboxes' && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="option1"
              checked={checkboxes.option1}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="option1" className="text-gray-700">
              Option 1
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="option2"
              checked={checkboxes.option2}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="option2" className="text-gray-700">
              Option 2
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="option3"
              checked={checkboxes.option3}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="option3" className="text-gray-700">
              Option 3
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectWithCheckboxes;
