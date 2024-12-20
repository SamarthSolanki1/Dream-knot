import React from "react";
import "../styles/Searchbar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search Wedding Plans..." />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
