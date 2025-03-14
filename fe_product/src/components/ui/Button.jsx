import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

