import React, { useState } from 'react';

const Autocomplete = ({ 
    suggestions,
    value,
    id,
    name,
    onChange,
    placeholder
 }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(e);
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleSelection = (suggestion) => {
    onChange({ target: {
      name,
      value: suggestion
    }});
    setFilteredSuggestions([]);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="autocomplete">
      <input
        id={id}
        className='input group input-bordered w-full'
        value={value}
        name={name}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {isFocused && filteredSuggestions.length > 0 && (
        <ul className='shadow rounded-b-lg shadow-gray-400 p-2'>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index} 
              onClick={() => handleSelection(suggestion)}
              className='my-1 px-2 hover:bg-gray-500 hover:rounded-md cursor-pointer' 
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
