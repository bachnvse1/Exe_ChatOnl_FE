// src/components/ui/Checkbox.jsx
import React from 'react';

const Checkbox = ({ label, ...props }) => {
  return (
    <label className="flex items-center">
      <input type="checkbox" className="mr-2" {...props} />
      {label}
    </label>
  );
};

export default Checkbox;
