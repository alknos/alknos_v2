import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div
      className={`relative flex items-center justify-center w-full max-w-md h-12 bg-gray-100 rounded-md focus-within:bg-gray-200 transition-all duration-300 ease-in-out ${isFocused ? 'ring-2 ring-blue-500' : ''
        }`}
    >
      <input
        type="text"
        className={`w-full h-full px-4 text-gray-800 bg-transparent border-0 outline-none appearance-none ${isFocused ? 'cursor-text' : 'cursor-pointer'
          }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={searchText}
      />
      <MagnifyingGlassIcon
        className={`w-6 h-6 p-1 text-gray-600 transition-all duration-300 ease-in-out 
        }`}
      />
      <label
        className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 ease-in-out ${isFocused || searchText ? 'text-sm -top-6' : ''
          }`}
      >
        Compuesto
      </label>
    </div>
  );
};

export default SearchBar;
