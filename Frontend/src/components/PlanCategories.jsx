import React from "react";
import "../styles/PlanCategories.css";

const PlanCategories = () => {
  const categories = ["Small", "Medium", "Royal"];

  return (
    <div className="categories">
      <h2>Wedding Plan Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCategories;
