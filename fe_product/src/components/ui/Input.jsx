// src/components/ui/Input.jsx
import React from 'react';

const Input = ({ type = 'text', placeholder, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      {...props}
    />
  );
};

export default Input;
