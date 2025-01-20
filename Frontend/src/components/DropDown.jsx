import React from 'react';
import '../styles/Dropdown.css';

const Dropdown = () => {
  return (
    <div className="dropdown-container">
      <h2>Wedding Plan Categories</h2>
      <select>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="royal">Royal</option>
      </select>
    </div>
  );
};

export default Dropdown;
